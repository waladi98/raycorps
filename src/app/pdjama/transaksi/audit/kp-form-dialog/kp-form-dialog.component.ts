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
import { finalize, map, takeUntil } from "rxjs/operators";
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
import { StorageService } from "../../../../core/services/storage.service";
declare const require: any;

declare const $: any;

interface stat_aktif {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-kp-form-dialog",
  templateUrl: "kp-form-dialog.component.html",
  styleUrls: ["./kp-form-dialog.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FormDialogKPComponent implements OnInit {
  formGroup: FormGroup;
  asalSekolahList;
  isAsalSekolahSearch: boolean = false;
  listDataJenisMgm = [];
  listDataJenisSekolah = [];
  wilayahList;
  isParentSearchWilayah: boolean = false;
  date: any;
  spinnerStatus = "Mohon Tunggu sedang memuat data..";
  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  dataParam = {
    type: null,
  };
  kode = "4";
  status_aktif: stat_aktif[] = [
    { value: "T", viewValue: "Tidak Aktif" },
    { value: "Y", viewValue: "Aktif" },
  ];

  dataKomponen: any;
  constructor(
    private _storageService: StorageService,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogKPComponent>,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dataParam = this.data;
    this.breakpointObserver;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      kode_daftar_periksa_audit: ["", Validators.required],
      kode: ["", Validators.required],
      nama_kriteria: ["", Validators.required],
      aspek_penilaian: ["", Validators.required],
      id_aktif: ["", Validators.required],
    });
    // console.log("KP-form", this.dataParam.toString());
    // console.log("KP-form 2", this.dataParam.type[0].kode);
    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.showSpinner();
      // const request = [];

      // const [] = await Promise.all(request);

      // this.listDataJenisMgm = listDataJenisMgm.result;
      // this.dataMaster =
      //   dataMaster.result.length > 0 ? dataMaster.result[0] : null;

      console.log("Referral", this.dataParam.type.kode);

      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
    }
  }
  showSpinner(): void {
    this.isLoading = true;
    this.spinner.show(this.spinnerName);
  }

  hideSpinner(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.spinner.hide(this.spinnerName);
    }, 2000);
  }

  onSubmitData() {
    swal
      .fire({
        title: "Tambah Data",
        text: "Apakah Yakin Akan Menyimpan Data Ini?",
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
          this.showSpinner();
          this.submitRequest();
        }
      });
  }

  submitRequest(): void {
    // console.log(this.dataParam.type[0].kode);
    this.showSpinner();
    const value = cloneDeep(this.formGroup.value);
    this.date = new Date();
    const payload = {
      kode_daftar_periksa_audit: this._storageService.get(
        "kode_daftar_periksa_audit"
      ),
      inisial: value.kode,
      nama_kriteria: value.nama_kriteria,
      aspek_penilaian: value.aspek_penilaian,
      id_aktif: value.id_aktif,
    };

    let endpoint = "/pdjama/master/kriteriaPenilaian/create";

    // if (this.undur) {
    //   payload.id = this.dataPesertaUndurDiri.id;
    //   endpoint = "/pmb/pesertaUndurDiri/modify";
    // }

    this.dataService.getPostRequest<FormResponse>(endpoint, payload).subscribe(
      (success) => {
        if (success.code == "404") {
          swal.fire({
            title: "Tambah Data",
            text: "Data Gagal di Simpan.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        } else if (
          success.message.match(/Duplicate entry.*/) ||
          success.code == "500"
        ) {
          swal.fire({
            title: "Gagal Menambahkan Data Baru",
            text: "Data yang anda masukan sudah ada sebelumnya.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        } else {
          swal
            .fire({
              title: "Tambah Data",
              text: "Data Berhasil di Simpan.",
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
                this.loadInitialData();
                //this.manageData(success.result);
                //this.hideSpinner();
              }
            });
        }
      },
      (error) => {
        swal.fire({
          title: "Tambah Data",
          text: "Data Gagal di Simpan.",
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
