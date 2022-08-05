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
  selector: "app-form-dialog",
  templateUrl: "form-dialog.component.html",
  styleUrls: ["./form-dialog.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FormDialogComponent implements OnInit {
  formGroup: FormGroup;
  asalSekolahList;
  isAsalSekolahSearch: boolean = false;
  listDataJenisMgm = [];
  date: any;
  spinnerStatus = "Mohon Tunggu sedang memuat data..";
  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  dataParam = {
    type: null,
  };

  status_aktif: stat_aktif[] = [
    { value: "T", viewValue: "Tidak Aktif" },
    { value: "Y", viewValue: "Aktif" },
  ];

  dataKomponen: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dataParam = this.data;
    this.breakpointObserver;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      kode: [""],
      kode_institusi: [""],
      nama: [{ value: "", disabled: true }],
      nik: [""],
      nipy: ["", Validators.required],
      handphone: ["", Validators.required],
      id_jenis_mgm: ["0", Validators.required],
    });
    this.loadInitialData();
    // if(this.dataParam.id){

    // }
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
  async loadInitialData(): Promise<any> {
    try {
      // this.isPreparingForm = true;
      // this.spinnerStatus = "Mohon Tunggu...";
      // this.showSpinner();
      const request = [this.loadDataJenisMgm()];

      const [listDataJenisMgm] = await Promise.all(request);

      this.listDataJenisMgm = listDataJenisMgm.result;

      // this.formGroup.get("kode").setValue(this.dataKomponen.kode);
      // this.formGroup.get("kode_institusi").setValue(this.dataKomponen.kode_institusi);
      // this.formGroup.get("nama").setValue(this.dataKomponen.nama);
      // this.formGroup.get("id_jenis_komponen").setValue(this.dataKomponen.id_jenis_komponen);
      // this.formGroup.get("keterangan").setValue(this.dataKomponen.keterangan);
      // this.formGroup.get("id_aktif").setValue(this.dataKomponen.id_aktif);
      // this.hideSpinner();
    } catch (error) {
      console.log(error);
      //this.showSpinner();
    }
  }

  loadDataJenisMgm(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/jenisMgm", {
        where: "id_aktif= 'Y'",
      })
      .toPromise();
  }
  // loadDataPesertaAsalSekolah(peserta_id): Promise<any> {
  //   return this.dataService
  //     .getRequest<any>("/pmb/pesertaMgm", {
  //       where: "peserta_id = '" + peserta_id + "'",
  //     })
  //     .toPromise();
  // }
  // async loadInitialDataTabAsalSekolah(): Promise<any> {
  //   try {
  //     const request = [this.loadDataPesertaAsalSekolah(this.dataPeserta.id)];

  //     const [dataPesertaAsalSekolah] = await Promise.all(request);

  //     this.dataPesertaAsalSekolah =
  //       dataPesertaAsalSekolah.result.length > 0
  //         ? dataPesertaAsalSekolah.result[0]
  //         : null;

  //     console.log("Referral", this.dataPesertaAsalSekolah);

  //     if (this.dataPesertaAsalSekolah) {
  //       this.formGroup.get("id").setValue(this.dataPesertaAsalSekolah.id);
  //       this.formGroup
  //         .get("nama_pegawai")
  //         .setValue(this.dataPesertaAsalSekolah.nama_pegawai);
  //       this.formGroup
  //         .get("nik_pegawai")
  //         .setValue(this.dataPesertaAsalSekolah.nik_pegawai);
  //       this.formGroup
  //         .get("nipy")
  //         .setValue(this.dataPesertaAsalSekolah.nipy_pegawai);
  //         this.formGroup
  //         .get("handphone")
  //         .setValue(this.dataPesertaAsalSekolah.handphone_pegawai);
  //     }
  //     this.hideSpinner();
  //   } catch (error) {
  //     console.log(error);
  //     this.hideSpinner();
  //   }
  // }
  selectAsalSekolah(data) {
    this.formGroup.get("kode").setValue(data.kode);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("nik").setValue(data.nik);
    this.formGroup.get("nipy").setValue(data.nipy);
    this.formGroup.get("handphone").setValue(data.handphone);
  }
  doFilterAsalSekolah(searchValue: string) {
    if (searchValue.length > 2) {
      this.asalSekolahList = this.getDataSekolah(
        searchValue,
        "isAsalSekolahSearch"
      ).pipe(map((res) => res));
    }
  }
  getDataSekolah(search, nameLoader) {
    let where =
      "nama LIKE  '%" +
      search +
      "%' or nik LIKE  '%" +
      search +
      "%' or nipy LIKE  '%" +
      search +
      "%' ";
    this[nameLoader] = true;
    return this.dataService
      .getRequest<any>("/sdm/master/xpegawai", {
        where: where,
        limit: 25,
      })
      .pipe(
        map((data) => {
          this[nameLoader] = false;
          return data.result;
        })
      );
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
          this.submitRequestMgm();
        }
      });
  }

  submitRequestMgm(): void {
    this.showSpinner();
    const value = cloneDeep(this.formGroup.value);
    this.date = new Date();
    const payload = {
      code: value.kode,
      kode: value.kode,
      id_jenis_mgm: value.id_jenis_mgm,
      handphone: value.handphone,
    };

    let endpoint = "/pmb/master/referral/create";

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
                this.hideSpinner();
              }
            });
        }
      },
      (error) => {
        swal.fire({
          title: "Tambah Dat",
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
