import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Inject,
  ViewEncapsulation,
} from "@angular/core";
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl,
} from "@angular/platform-browser";
import { Router, Route, ActivatedRoute } from "@angular/router";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { PageEvent } from "@angular/material/paginator";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../../../../core/services/data.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import swal from "sweetalert2";
import { cloneDeep } from "lodash";
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../../../shared/types/common";
declare const require: any;

declare const $: any;

interface stat_aktif {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-form-dialog-delete",
  templateUrl: "form-dialog-delete.component.html",
  styleUrls: ["./form-dialog-delete.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FormDialogKPDeleteComponent implements OnInit {
  formGroup: FormGroup;
  dataMaster: any;
  listDataJenisSekolah = [];
  date: any;
  spinnerStatus = "Mohon Tunggu sedang memuat data..";
  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  dataParam = {
    type: null,
  };

  dataKomponen: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogKPDeleteComponent>,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dataParam = this.data;
    this.breakpointObserver;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      kode_daftar_periksa_audit: [{ value: "", disabled: true }],
      kode: [{ value: "", disabled: true }],
      nama_kriteria: [{ value: "", disabled: true }],
      aspek_penilaian: [{ value: "", disabled: true }],
      id_aktif: [{ value: "", disabled: true }],
    });
    this.loadInitialData();
  }

  status_aktif: stat_aktif[] = [
    { value: "T", viewValue: "Tidak Aktif" },
    { value: "Y", viewValue: "Aktif" },
  ];

  async loadInitialData(): Promise<any> {
    try {
      this.showSpinner();
      const request = [this.loadDataMaster()];

      const [dataMaster] = await Promise.all(request);
      this.listDataJenisSekolah = [
        {
          kode: "NEGERI",
          name: "NEGERI",
        },
        {
          kode: "SWASTA",
          name: "SWASTA",
        },
      ];
      this.dataMaster =
        dataMaster.result.length > 0 ? dataMaster.result[0] : null;

      this.initialData(this.dataMaster);
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
    }
  }

  initialData(data): void {
    this.formGroup.get("kode").setValue(data.inisial);
    this.formGroup.get("nama_kriteria").setValue(data.nama_kriteria);
    this.formGroup.get("aspek_penilaian").setValue(data.aspek_penilaian);
    this.formGroup.get("id_aktif").setValue(data.id_aktif);
  }
  showSpinner(): void {
    this.isLoading = true;
    this.spinner.show(this.spinnerName);
  }

  hideSpinner(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.spinner.hide(this.spinnerName);
    }, 1500);
  }
  loadDataMaster(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pdjama/master/kriteriaPenilaian", {
        where: "kode = '" + this.dataParam.type.kode + "'",
      })
      .toPromise();
  }
  onSubmitData() {
    swal
      .fire({
        title: "Hapus Data",
        text: "Apakah Yakin Akan Menghapus Data Ini?",
        icon: "warning",
        showCancelButton: true,
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        buttonsStyling: false,
      })
      .then((result) => {
        if (result.value) {
          this.submitRequestMgm();
        }
      });
  }

  submitRequestMgm(): void {
    //this.showSpinner();
    const value = cloneDeep(this.formGroup.value);
    this.date = new Date();
    const payload = {
      kode: this.dataParam.type.kode,
    };

    let endpoint = "/pdjama/master/kriteriaPenilaian/remove";

    // if (this.undur) {
    //   payload.id = this.dataPesertaUndurDiri.id;
    //   endpoint = "/pmb/pesertaUndurDiri/modify";
    // }

    this.dataService.getPostRequest<FormResponse>(endpoint, payload).subscribe(
      (success) => {
        if (success.code == "404" || success.code == "500") {
          swal.fire({
            title: "Hapus Data",
            text: "Data Gagal DiHapus.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        } else if (success.message.match(/Cannot delete.*/)) {
          swal.fire({
            title: "Data Gagal di Hapus",
            text: "Data tersebut sedang digunakan di menu lain, jika tidak akan digunakan bisa dinonaktifkan.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        } else {
          swal
            .fire({
              title: "Hapus Data",
              text: "Data Berhasil di Hapus.",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-success",
              },
              buttonsStyling: false,
              showCancelButton: false,
              confirmButtonText: "Ok",
            })
            .then((result) => {
              if (result.value) {
                this.showSpinner();
                this.ngOnInit();
                //this.manageData(success.result);
                this.hideSpinner();
              }
            });
        }
      },
      (error) => {
        swal.fire({
          title: "Hapus Data",
          text: "Data Gagal di Hapus.",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-error",
          },
          buttonsStyling: false,
        });
      }
    );
  }
}
