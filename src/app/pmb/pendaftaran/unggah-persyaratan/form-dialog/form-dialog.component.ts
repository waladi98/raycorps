import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Inject,
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

declare const require: any;

declare const $: any;

@Component({
  selector: "app-form-dialog",
  templateUrl: "form-dialog.component.html",
  styleUrls: ["./form-dialog.component.scss"],
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
  dokumen_persyaratan = null;

  dataPeserta = {
    id: null,
    path_dokumen: null,
    path_to_dokumen: null,
    path_to_dokumen_core: null,
    peserta_id: null,
    formulir_id: null,
    nama: null,
    persyaratan: null,
    id_status_dokumen: null,
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

  program = [
    { value: "KER", viewValue: "Kerjasama" },
    { value: "NON", viewValue: "Regular Sore" },
    { value: "REG", viewValue: "Regular Pagi" },
    { value: "TES", viewValue: "Program Tes" },
  ];
  periodeMasuk = [
    { value: "20222", viewValue: "20222 (Genap 2022 - 2023)" },
    { value: "20221", viewValue: "20221 (Gasal 2022 - 2023)" },
    { value: "20212", viewValue: "20212 (Genap 2021 - 2022)" },
    { value: "20211", viewValue: "20211 (Gasal 2021 - 2022)" },
  ];
  statusAwal = [
    { value: "B", viewValue: "Baru" },
    { value: "C", viewValue: "Pindahan Luar Yarsi" },
    { value: "D", viewValue: "Pindahan Fakultas Yarsi" },
    { value: "E", viewValue: "Pindahan Prodi Yarsi" },
    { value: "Z", viewValue: "Bidik Misi / KIP" },
    { value: "I", viewValue: "Internal" },
  ];
  statusBayar = [
    { value: "Y", viewValue: "Sudah Membayar" },
    { value: "S", viewValue: "Dibayar Sebagian" },
    { value: "D", viewValue: "Pindahan Fakultas Yarsi" },
    { value: "E", viewValue: "Pindahan Prodi Yarsi" },
    { value: "Z", viewValue: "Bidik Misi / KIP" },
    { value: "I", viewValue: "Internal" },
  ];

  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private fileUploaderService: FileUploaderService,
    private router: Router,
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
      persyaratan: [{ value: "", disabled: true }],
      path_dokumen: ["", Validators.required],
      id_status_dokumen: [{ value: "", disabled: true }],
    });

    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();
      const request = [this.loadDataPeserta(), this.loadPeriodeMasuk()];

      const [dataPeserta] = await Promise.all(request);

      this.dataPeserta =
        dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;
      console.log(this.dataPeserta);
      if (this.dataPeserta) {
        this.inisialisasiDataFormCamaba(this.dataPeserta);
      }
      // this.listDataProgram = listDataProgram.result;
      // this.listDataPeriodeMasuk = listDataPeriodeMasuk.result;
      //this.listDataStatusAwal = listDataStatusAwal.result;
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
      .getRequest<any>("/pmb/pesertaPersyaratanProdi", {
        where: "id='" + this.dataParam.type.id + "'",
      })
      .toPromise();
  }
  loadDataPesertaPilihanProdi(id): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaPilihanProdi", {
        where: "peserta_id = '" + id + "'",
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

  async inisialisasiDataFormCamaba(data) {
    this.formGroup.get("peserta_id").setValue(data.peserta_id);
    this.formGroup.get("formulir_id").setValue(data.formulir_id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("persyaratan").setValue(data.persyaratan);
    this.formGroup.get("path_dokumen").setValue(data.path_dokumen);
    this.dokumen_persyaratan = this.formGroup
      .get("persyaratan")
      .setValue(data.persyaratan);
  }

  onSubmit() {
    swal
      .fire({
        html:
          "<h5> <b> Dokumen " +
          this.dataPeserta.persyaratan +
          "</b></h5><b>Apakah Anda Yakin Akan mengunggah Data Ini?</b>",
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
    //this.showSpinner();
    const value = cloneDeep(this.formGroup.value);
    this.date = new Date();
    // if (value.path_to_dokumen == null) {
    //   this.payload = {
    //     id: this.dataPeserta.id,
    //     path_to_dokumen : value.path_to_dokumen,
    //     id_status_dokumen: 0
    //   };
    // } else {
    //   this.payload = {
    //     id: this.dataPeserta.id,
    //     path_to_dokumen : value.path_to_dokumen,
    //   };
    // }
    this.payload = {
      id: this.dataPeserta.id,
      path_to_dokumen: value.path_dokumen,
      diubah_oleh: this.dataPeserta.formulir_id,
      waktu_ubah: this.formatDate(this.date, "datetime"),
    };

    console.log("result", this.payload);
    let endpoint = "/pmb/pesertaPersyaratan/modify";

    this.dataService
      .getPostRequest<FormResponse>(endpoint, this.payload)
      .subscribe(
        (success) => {
          if (value.path_to_dokumen == "") {
            swal.fire({
              title: "Dokumen",
              text: "Dokumen berhasil dihapus!",
              icon: "info",
              customClass: {
                confirmButton: "btn btn-error",
              },
              buttonsStyling: false,
            });
          } else if (success.message === "tidak ada data yang diperbaharui.") {
            swal.fire({
              title: "Unggah Dokumen",
              text: "Tidak ada data yang diperbarui",
              icon: "info",
              customClass: {
                confirmButton: "btn btn-error",
              },
              buttonsStyling: false,
            });
          } else {
            swal
              .fire({
                html:
                  "<h5> <b> Dokumen " +
                  this.dataPeserta.persyaratan +
                  "</b></h5><b>Berhasil Diunggah</b>",
                icon: "success",
                customClass: {
                  confirmButton: "btn btn-success",
                },
                buttonsStyling: false,
                showCancelButton: false,
                confirmButtonText: "Ok",
              })
              .then((result) => {
                //window.location.reload();
                this.manageData(result);
              });
          }
        },
        (error) => {
          swal.fire({
            title: "Upload Bukti Pembayaran",
            text: "Upload Bukti Pembayaran Gagal di Simpan.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        }
      );
  }
  manageData(data) {
    if (data) {
      this.router.navigate(["/pmb/pendaftaran/unggah-persyaratan"]);
    }
  }
  openFileUploader(): void {
    this.fileUploaderService
      .open({
        title: "Unggah Persyaratan",
        templateUrl: "",
        templateParams: {
          action: "",
        },
        uploadUrl: "/file/uploadFile",
        uploadParams: {
          path: "persyaratan/" + this.dataPeserta.peserta_id,
        },
        downlodButtonText: "Download Template",
        uploadButtonText: "Upload",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result.data) {
          this.file_name = result.data.result.filename;
          this.formGroup
            .get("path_dokumen")
            .setValue(result.data.result.newfilename);
        }
      });
  }

  cancelUpload() {
    this.dataPeserta.path_to_dokumen_core = null;
    this.formGroup.get("path_dokumen").setValue(null);
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
