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
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DataService } from "../../../../core/services/data.service";
import { NgxSpinnerService } from "ngx-spinner";
import { FileUploaderService } from "../../../../shared/file-uploader/file-uploader.service";
import { Subject, Subscription, Observable } from "rxjs";
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

@Component({
  selector: "app-form-dialog",
  templateUrl: "form-dialog.component.html",
  styleUrls: ["./form-dialog.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FormDialogComponent implements OnInit {
  formGroup: FormGroup;

  dataParam = {
    type: null,
  };

  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  spinnerStatus = "Mohon Tunggu...";
  file_name: any;
  dokumen_kelengkapan = null;

  dataPeserta = {
    id: null,
    path_dokumen: null,
    path_to_dokumen: null,
    peserta_id: null,
    formulir_id: null,
    nama: null,
    kelengkapan: null,
    id_status_dokumen: null,
    path_to_bukti_transfer: null,
    jumlah_pengembalian: null,
  };
  date: any;
  payload = {};
  listDataPilihanProdi = [];
  listDataPersyaratan = [];
  listDataStatusDokumen = [];
  dataPendaftaranPmb: any;
  listDataProgram = [];
  listDataPeriodeMasuk = [];
  listDataStatusAwal = [];
  listDataMasterRekening = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private fileUploaderService: FileUploaderService,
    private router: Router,
    private _storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dataParam = this.data;
    this.breakpointObserver;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      peserta_id: [{ value: "", disabled: true }],
      formulir_id: [{ value: "", disabled: true }],
      nama: [{ value: "", disabled: true }],
      handphone: [{ value: "", disabled: true }],
      email: [{ value: "", disabled: true }],
      path_to_dokumen: [{ value: "", disabled: true }],
      path_to_bukti_transfer: [{ value: "", disabled: false }],
      keterangan_undur_diri: [{ value: "", disabled: true }],
      nomor_rekening: [{ value: "", disabled: true }],
      jumlah_pengembalian: [
        "",
        [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)],
      ],
      alasan_pengunduran_diri: [{ value: "", disabled: true }],
      id_status_dokumen: [{ value: "", disabled: true }],
      kode_rekening: [{ value: "", disabled: false }],
    });

    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();
      const request = [
        this.loadDataPeserta(),
        this.loadDataStatusDokumen(),
        this.loadMasterRekening(),
      ];

      const [dataPeserta, listDataStatusDokumen, listDataMasterRekening] =
        await Promise.all(request);

      this.dataPeserta =
        dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;
      console.log(this.dataPeserta);
      if (this.dataPeserta) {
        this.inisialisasiDataFormCamaba(this.dataPeserta);
      }
      this.listDataStatusDokumen = listDataStatusDokumen.result;
      this.listDataMasterRekening = listDataMasterRekening.result;
      this.hideSpinner();
    } catch (error) {
      this.hideSpinner();
      console.log(error);
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
    }, 500);
  }
  loadDataPeserta(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaUndurDiri", {
        where: "id='" + this.dataParam.type.id + "'",
      })
      .toPromise();
  }
  loadDataStatusDokumen(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/statusDokumen", {
        where: "id_aktif='Y' AND id > 0",
      })
      .toPromise();
  }
  loadPeriodeMasuk(): Promise<any> {
    return this.dataService
      .getRequest<any>("/master/tahunPeriode", {})
      .toPromise();
  }
  loadStatusAwal(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/statusAwal", {})
      .toPromise();
  }
  loadMasterRekening(): Promise<any> {
    return this.dataService
      .getRequest<any>("/keuangan/master/rekening", {})
      .toPromise();
  }

  async inisialisasiDataFormCamaba(data) {
    this.formGroup
      .get("peserta_id")
      .setValue(data.peserta_id + " / " + data.formulir_id);
    this.formGroup.get("formulir_id").setValue(data.formulir_id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("handphone").setValue(data.handphone);
    this.formGroup.get("email").setValue(data.email);
    this.formGroup.get("id_status_dokumen").setValue(data.id_status_dokumen);
    this.formGroup
      .get("keterangan_undur_diri")
      .setValue(data.keterangan_undur_diri);
    this.formGroup
      .get("alasan_pengunduran_diri")
      .setValue(data.alasan_pengunduran_diri);
    this.formGroup.get("nomor_rekening").setValue(data.nomor_rekening);
    this.formGroup.get("kode_rekening").setValue(data.kode_rekening);
    this.formGroup
      .get("jumlah_pengembalian")
      .setValue(data.jumlah_pengembalian);
  }

  onSubmit() {
    swal
      .fire({
        html:
          "<h5> <b> Pengajuan Undur Diri " +
          "</b></h5><b>Apakah Anda Yakin Akan menyimpan perubahan ini?</b>",
        icon: "info",
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
          this.submitRequest();
        }
      });
  }
  submitRequest(): void {
    this.showSpinner();
    const value = cloneDeep(this.formGroup.value);
    this.date = new Date();
    this.payload = {
      id: this.dataPeserta.id,
      path_to_bukti_transfer: value.path_to_bukti_transfer,
      jumlah_pengembalian: value.jumlah_pengembalian,
      kode_rekening: value.kode_rekening,
      diubah_oleh: this._storageService.get("username"),
      waktu_ubah: this.formatDate(this.date, "datetime"),
    };

    //console.log("result",this.payload);
    let endpoint = "/pmb/pesertaUndurDiri/modify";

    this.dataService
      .getPostRequest<FormResponse>(endpoint, this.payload)
      .subscribe((success) => {
        if (success.message == "Invalid Parameter") {
          swal.fire({
            title: "Proses Undur diri",
            text: "Data Gagal di Simpan.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        } else {
          this.hideSpinner();
          swal
            .fire({
              title: "Proses Undur Diri",
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
                // this.showSpinner();
                //this.loadInitialData();
                this.hideSpinner();
              }
            });
        }
      });
  }
  manageData(data) {
    if (data) {
      this.router.navigate(["/pmb/transaksi/proses-pengunduran-diri"]);
    }
  }
  openFileUploader(): void {
    this.fileUploaderService
      .open({
        title: "Unggah Bukti Transfer",
        templateUrl: "",
        templateParams: {
          action: "",
        },
        uploadUrl: "/file/uploadFile",
        uploadParams: {
          path: "undur-diri/" + this.dataPeserta.peserta_id,
        },
        downlodButtonText: "Download Template",
        uploadButtonText: "Upload",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result.data) {
          this.file_name = result.data.result.filename;
          this.formGroup
            .get("path_to_bukti_transfer")
            .setValue(result.data.result.newfilename);
        }
      });
  }

  cancelUpload() {
    this.dataPeserta.path_to_bukti_transfer = null;
    this.formGroup.get("path_to_bukti_transfer").setValue(null);
  }
  formatDate(date, type) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours().toString(),
      minute = d.getMinutes().toString(),
      second = d.getSeconds().toString();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (hour.toString().length < 2) hour = "0" + hour;
    if (minute.toString().length < 2) minute = "0" + minute;
    if (second.toString().length < 2) second = "0" + second;

    let datestring = [year, month, day].join("-");

    if (type == "datetime") {
      datestring =
        [year, month, day].join("-") + " " + [hour, minute, second].join(":");
    }

    if (type == "setValue") {
      datestring =
        [year, month, day].join("-") + "T" + [hour, minute, second].join(":");
    }

    return datestring;
  }
}
