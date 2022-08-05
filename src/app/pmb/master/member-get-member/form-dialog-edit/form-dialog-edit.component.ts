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
import { Subject, Subscription, Observable } from "rxjs";
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
  selector: "app-form-dialog-edit",
  templateUrl: "form-dialog-edit.component.html",
  styleUrls: ["./form-dialog-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FormDialogEditComponent implements OnInit {
  formGroup: FormGroup;
  dataMasterMgm: any;
  listDataJenisMgm = [];
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
    private dialogRef: MatDialogRef<FormDialogEditComponent>,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dataParam = this.data;
    this.breakpointObserver;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      kode: [{ value: "", disabled: true }],
      nama: [{ value: "", disabled: true }],
      nik: [""],
      nipy: [{ value: "", disabled: true }],
      handphone: [""],
      id_jenis_mgm: [""],
    });
    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.showSpinner();
      const request = [this.loadDataMasterReferral(), this.loadDataJenisMgm()];

      const [dataMasterMgm, listDataJenisMgm] = await Promise.all(request);
      this.listDataJenisMgm = listDataJenisMgm.result;
      this.dataMasterMgm =
        dataMasterMgm.result.length > 0 ? dataMasterMgm.result[0] : null;

      console.log("Referral", this.dataMasterMgm);

      if (this.dataMasterMgm) {
        this.formGroup.get("kode").setValue(this.dataMasterMgm.kode);
        this.formGroup.get("nama").setValue(this.dataMasterMgm.nama_pegawai);
        this.formGroup.get("nik").setValue(this.dataMasterMgm.nik_pegawai);
        this.formGroup.get("nipy").setValue(this.dataMasterMgm.nipy);
        this.formGroup.get("handphone").setValue(this.dataMasterMgm.handphone);
        this.formGroup
          .get("id_jenis_mgm")
          .setValue(this.dataMasterMgm.id_jenis_mgm);
      }
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
    }, 1500);
  }
  loadDataMasterReferral(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/master/referral", {
        where: "kode = '" + this.dataParam.type.kode + "'",
      })
      .toPromise();
  }
  loadDataJenisMgm(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/jenisMgm", {
        where: "id_aktif= 'Y' and id > '0'",
      })
      .toPromise();
  }
  onSubmitData() {
    swal
      .fire({
        title: "Ubah Data",
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
          this.submitRequestMgm();
        }
      });
  }

  submitRequestMgm(): void {
    //this.showSpinner();
    const value = cloneDeep(this.formGroup.value);
    this.date = new Date();
    const payload = {
      code: this.dataParam.type.kode,
      kode: this.dataParam.type.kode,
      id_jenis_mgm: value.id_jenis_mgm,
      handphone: value.handphone,
    };

    let endpoint = "/pmb/master/referral/modify";

    // if (this.undur) {
    //   payload.id = this.dataPesertaUndurDiri.id;
    //   endpoint = "/pmb/pesertaUndurDiri/modify";
    // }

    this.dataService.getPostRequest<FormResponse>(endpoint, payload).subscribe(
      (success) => {
        if (success.code == "404" || success.code == "500") {
          swal.fire({
            title: "Ubah Data",
            text: "Data Gagal di Simpan.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        } else {
          swal
            .fire({
              title: "Ubah Data",
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
                this.hideSpinner();
              }
            });
        }
      },
      (error) => {
        swal.fire({
          title: "Ubah Data",
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
