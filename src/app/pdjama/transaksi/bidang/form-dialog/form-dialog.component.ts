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
import { FileUploaderService } from "../../../../shared/file-uploader/file-uploader.service";
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
  listDataJenisSekolah = [];
  wilayahList;
  listDataInstitusi = [];
  isParentSearchWilayah: boolean = false;
  date: any;
  dataPesertaAsalSekolah: any;
  dataPeserta: any;
  file_name: any;
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
    private fileUploaderService: FileUploaderService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dataParam = this.data;
    this.breakpointObserver;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      kode_institusi: ["", Validators.required],
      kode_pegawai: ["", Validators.required],
      nama_bidang: ["", Validators.required],
      path_to_tanda_tangan: ["", Validators.required],
      wilayah: ["", Validators.required],
      id_aktif: ["", Validators.required],
      id: [""],
      kode_referral: [""],
      nama_pegawai: ["", Validators.required],
      nik_pegawai: [{ value: "", disabled: true }],
      //handphone: [{ value: "", disabled: true }],
      nipy_pegawai: [{ value: "", disabled: false }],
    });
    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.showSpinner();
      // const request = [];

      // const [] = await Promise.all(request);
      this.listDataInstitusi = [
        {
          kode: "demo",
          name: "Universitas Yarsi",
        },
      ];
      // this.listDataJenisMgm = listDataJenisMgm.result;
      // this.dataMaster =
      //   dataMaster.result.length > 0 ? dataMaster.result[0] : null;

      //console.log("Referral", this.dataMaster);

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
  //       //this.mgm = true;
  //       this.formGroup.get("id").setValue(this.dataPesertaAsalSekolah.id);
  //       this.formGroup
  //         .get("nama_pegawai")
  //         .setValue(this.dataPesertaAsalSekolah.nama_pegawai);
  //       this.formGroup
  //         .get("nik_pegawai")
  //         .setValue(this.dataPesertaAsalSekolah.nik_pegawai);
  //       this.formGroup
  //         .get("nipy_pegawai")
  //         .setValue(this.dataPesertaAsalSekolah.nipy_pegawai);
  //       // this.formDataMgm
  //       //   .get("handphone")
  //       //   .setValue(this.dataPesertaAsalSekolah.handphone_pegawai);
  //     }
  //     this.hideSpinner();
  //   } catch (error) {
  //     console.log(error);
  //     this.hideSpinner();
  //   }
  // }
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
    this.showSpinner();
    const value = cloneDeep(this.formGroup.value);
    this.date = new Date();
    const payload = {
      kode_institusi: value.kode_institusi,
      kode_pegawai: value.kode_pegawai,
      path_to_tanda_tangan: value.path_to_tanda_tangan,
      nama_bidang: value.nama_bidang,
    };

    let endpoint = "/pdjama/master/bidang/create";

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
    //this.dataPendaftaranPmb.bukti_setoran=null;
    this.formGroup.get("path_to_tanda_tangan").setValue(null);
  }
}
