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
import { finalize, map, takeUntil } from "rxjs/operators";
import { FileUploaderService } from "../../../../shared/file-uploader/file-uploader.service";
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
export class FormDialogDeleteComponent implements OnInit {
  formGroup: FormGroup;
  asalSekolahList;
  asalPenggunaKelompokList;
  isAsalSekolahSearch: boolean = false;
  isPenggunaKelompokSearch: boolean = false;
  listDataJenisMgm = [];
  listDataJenisSekolah = [];
  wilayahList;
  listDataInstitusi = [];
  listDataRole = [];
  listDataAktif = [];
  isParentSearchWilayah: boolean = false;
  date: any;
  dataPesertaAsalSekolah: any;
  dataPeserta: any;
  file_name: any;
  dataMaster: any;
  dataPenggunaKelompok: any;
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
    private dialogRef: MatDialogRef<FormDialogDeleteComponent>,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private fileUploaderService: FileUploaderService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dataParam = this.data;
    this.breakpointObserver;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      kode_institusi: [{ value: "", disabled: true }],
      kode_pegawai: [{ value: "", disabled: true }],
      kode_pengguna: [{ value: "", disabled: true }],
      nama_pengguna: [{ value: "", disabled: true }],
      nama_bidang: [{ value: "", disabled: true }],
      singkatan: [{ value: "", disabled: true }],
      path_to_tanda_tangan: [{ value: "", disabled: true }],
      wilayah: [{ value: "", disabled: true }],
      id_aktif: [{ value: "", disabled: true }],
      id_kelompok: [{ value: "", disabled: true }],
      id: [""],
      kode_referral: [""],
      nama_pegawai: [{ value: "", disabled: true }],
      nik_pegawai: [{ value: "", disabled: true }],
      //handphone: [{ value: "", disabled: true }],
      nipy_pegawai: [{ value: "", disabled: true }],
    });
    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.showSpinner();
      const request = [this.loadDataMaster()];

      const [dataMaster] = await Promise.all(request);
      this.listDataInstitusi = [
        {
          kode: "demo",
          name: "Universitas Yarsi",
        },
      ];
      this.listDataRole = [
        {
          kode: 950,
          name: "PDJAMA - Pengelola Utama",
        },
        {
          kode: 951,
          name: "PDJAMA - Auditor",
        },
        {
          kode: 952,
          name: "PDJAMA - Auditi",
        },
        {
          kode: 953,
          name: "PDJAMA - Dosen",
        },
        {
          kode: 954,
          name: "PDJAMA - Mahasiswa",
        },
        {
          kode: "950,951",
          name: "PDJAMA - Mahasiswa",
        },
      ];
      this.listDataAktif = [
        {
          kode: "Y",
          name: "YA",
        },
        {
          kode: "T",
          name: "Tidak",
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
    this.formGroup.get("kode_institusi").setValue(data.kode_institusi);
    this.formGroup.get("kode_pegawai").setValue(data.kode_pegawai);
    this.formGroup.get("nama_bidang").setValue(data.nama_bidang);
    this.formGroup.get("singkatan").setValue(data.singkatan);
    this.formGroup.get("nama_pegawai").setValue(data.nama_pegawai);
    this.formGroup.get("kode_pengguna").setValue(data.kode_pengguna);
    this.formGroup.get("nama_pegawai").setValue(data.nama_auditor);
    this.formGroup.get("id_aktif").setValue(data.id_aktif);
    // this.formGroup
    //   .get("id_kelompok")
    //   .setValue(this.dataPesertaAsalSekolah.id_kelompok);
    this.formGroup
      .get("path_to_tanda_tangan")
      .setValue(data.path_to_tanda_tangan);
    this.loadInitialDataTabAsalSekolah();
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
      .getRequest<any>("/pdjama/master/auditor", {
        where: "kode = '" + this.dataParam.type.kode + "'",
      })
      .toPromise();
  }
  loadDataPesertaAsalSekolah(kode_pengguna): Promise<any> {
    return this.dataService
      .getRequest<any>("/pengguna/kelompok", {
        where: "kode_pengguna = '" + kode_pengguna + "'",
      })
      .toPromise();
  }
  async loadInitialDataTabAsalSekolah(): Promise<any> {
    try {
      const request = [
        this.loadDataPesertaAsalSekolah(this.dataMaster.kode_pengguna),
      ];

      const [dataPesertaAsalSekolah] = await Promise.all(request);

      this.dataPesertaAsalSekolah =
        dataPesertaAsalSekolah.result.length > 0
          ? dataPesertaAsalSekolah.result[0]
          : null;

      //console.log("kode_pengguna", this.dataPesertaAsalSekolah.id_kelompok);

      if (this.dataPesertaAsalSekolah) {
        //this.mgm = true;
        this.formGroup
          .get("id_kelompok")
          .setValue(this.dataPesertaAsalSekolah.id_kelompok);
        // this.formGroup
        //   .get("nama_pegawai")
        //   .setValue(this.dataPesertaAsalSekolah.nama_pegawai);
        // this.formGroup
        //   .get("nik_pegawai")
        //   .setValue(this.dataPesertaAsalSekolah.nik_pegawai);
        // this.formGroup
        //   .get("nipy_pegawai")
        //   .setValue(this.dataPesertaAsalSekolah.nipy_pegawai);
      }
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
    }
  }
  selectAsalSekolah(data) {
    this.formGroup.get("kode_pegawai").setValue(data.kode);
    this.formGroup.get("nama_pegawai").setValue(data.nama);
    this.formGroup.get("nik_pegawai").setValue(data.nik);
    this.formGroup.get("nipy_pegawai").setValue(data.nama);
    //this.formGroup.get("handphone").setValue(data.handphone);
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
  selectPenggunaKelompok(data) {
    this.formGroup.get("kode_pengguna").setValue(data.kode);
    this.formGroup.get("nama_pengguna").setValue(data.nama);
    // this.formGroup.get("nik_pegawai").setValue(data.nik);
    // this.formGroup.get("nipy_pegawai").setValue(data.nama);
    //this.formGroup.get("handphone").setValue(data.handphone);
  }
  doFilterPenggunaKelompok(searchValue: string) {
    if (searchValue.length > 2) {
      this.asalPenggunaKelompokList = this.getDataPenggunaKelompok(
        searchValue,
        "isPenggunaKelompokSearch"
      ).pipe(map((res) => res));
    }
  }
  getDataPenggunaKelompok(search, nameLoader) {
    let where = "kode LIKE  '%" + search + "%'";
    this[nameLoader] = true;
    return this.dataService
      .getRequest<any>("/pengguna", {
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
          this.showSpinner();
          this.submitRequest();
        }
      });
  }

  submitRequest(): void {
    this.showSpinner();
    const value = cloneDeep(this.formGroup.value);
    this.date = new Date();
    const payload = {
      kode: this.dataParam.type.kode,
    };

    let endpoint = "/pdjama/master/auditor/remove";

    // if (this.undur) {
    //   payload.id = this.dataPesertaUndurDiri.id;
    //   endpoint = "/pmb/pesertaUndurDiri/modify";
    // }

    this.dataService.getPostRequest<FormResponse>(endpoint, payload).subscribe(
      (success) => {
        if (success.code == "404") {
          swal.fire({
            title: "Hapus Data",
            text: "Data Gagal di Hapus.",
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
            title: "Hapus Data",
            text: "Data yang anda masukan sudah ada sebelumnya.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        } else if (success.code == "204") {
          swal.fire({
            title: "Hapus Data",
            text: "Invalid Parameter",
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
          //this.toRoute(success.result);
          swal
            .fire({
              title: "Hapus Data",
              //text: "Verifikasi Kelulusan Berhasil di Simpan.",
              icon: "success",
              html: "Berhasil di Hapus. ",
              customClass: {
                confirmButton: "btn btn-success",
              },
              buttonsStyling: false,
              showCancelButton: false,
              confirmButtonText: "Ok",
            })
            .then((result) => {
              this.showSpinner();
              this.loadInitialData();
              //this.manageData(success.result);
              //this.hideSpinner();
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
  toRoute(data) {
    if (data) {
      const value = cloneDeep(this.formGroup.value);
      const payload = {
        kode: this.dataPesertaAsalSekolah.kode,
        id_kelompok: value.id_kelompok,
      };

      this.dataService
        .getPostRequest<FormResponse>("/pengguna/kelompok/modify", payload)
        .subscribe(
          (success) => {
            if (success.code == "404") {
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
                  //text: "Verifikasi Kelulusan Berhasil di Simpan.",
                  icon: "success",
                  html: "Data Berhasil di Simpan. ",
                  customClass: {
                    confirmButton: "btn btn-success",
                  },
                  buttonsStyling: false,
                  showCancelButton: false,
                  confirmButtonText: "Ok",
                })
                .then((result) => {
                  this.showSpinner();
                  this.loadInitialData();
                  //this.manageData(success.result);
                  //this.hideSpinner();
                });
            }
          },
          (error) => {
            swal.fire({
              icon: "error",
              title: "koneksi internetmu tergangung!",
              text: "Yuk, pastikan internetmu lancar dengan cek ulang paket data, WIFI, atau jaringan di tempatmu",
              customClass: {
                confirmButton: "btn btn-error",
              },
              buttonsStyling: false,
            });
          }
        );
    }
  }
  openFileUploader(): void {
    this.fileUploaderService
      .open({
        title: "Unggah Tanda Tangan",
        templateUrl: "",
        templateParams: {
          action: "",
        },
        uploadUrl: "/file/uploadFile",
        uploadParams: {
          path: "pdjama",
        },
        downlodButtonText: "Download Template",
        uploadButtonText: "Upload",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result.data) {
          this.file_name = result.data.result.filename;
          this.formGroup
            .get("path_to_tanda_tangan")
            .setValue(result.data.result.newfilename);
        }
      });
  }

  cancelUpload() {
    this.dataMaster.path_to_tanda_tangan = null;
    this.formGroup.get("path_to_tanda_tangan").setValue(null);
  }
}
