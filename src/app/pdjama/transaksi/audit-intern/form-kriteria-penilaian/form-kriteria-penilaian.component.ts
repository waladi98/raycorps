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
  selector: "app-form-dialog",
  templateUrl: "form-kriteria-penilaian.component.html",
  styleUrls: ["./form-kriteria-penilaian.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FormKriteriaPenilaianComponent implements OnInit {
  formGroup: FormGroup;
  asalSekolahList;
  isAsalSekolahSearch: boolean = false;

  auditorList;
  isAuditor1Search: boolean = false;
  isAuditor2Search: boolean = false;
  isAuditor3Search: boolean = false;

  listDataJenisMgm = [];
  listDataJenisSekolah = [];
  wilayahList;
  listDataInstitusi = [];
  listDataTahunPeriode = [];
  listDataAuditor = [];

  listDataTahunInstitusi = [];
  listDataBidangAuditi = [];
  listDataAuditi = [];

  isParentSearchWilayah: boolean = false;
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

  user = this._storageService.get("username");

  dataKomponen: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormKriteriaPenilaianComponent>,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private _storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dataParam = this.data;
    this.breakpointObserver;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      kode_tahun_periode: ["", Validators.required],
      nama_audit: ["", Validators.required],
      kode_bidang: ["", Validators.required],
      nama_bidang: ["", Validators.required],
      tanggal_audit: ["", Validators.required],
      kode_auditor_1: ["", Validators.required],
      nama_auditor_1: ["", Validators.required],
      kode_auditor_2: ["", Validators.required],
      nama_auditor_2: ["", Validators.required],
      kode_auditor_3: ["", Validators.required],
      nama_auditor_3: ["", Validators.required],
    });
    this.loadInitialData();
  }

  loadDataTahunPeriode(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pdjama/master/tahunPeriode", {
        where: "id_aktif = 'Y'",
      })
      .toPromise();
  }

  loadDataBidang(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pdjama/master/bidang", {})
      .toPromise();
  }

  loadDataAuditor(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pdjama/master/auditor", {})
      .toPromise();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.showSpinner();

      const request = [];

      const [] = await Promise.all(request);

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

  submitActionSelected(): void {
    //console.log("data selected", this.data.type.length);
    let data = this.data.type;
    const value = cloneDeep(this.formGroup.value);
    for (let i = 0; i < this.data.length; i++) {
      let payload = {
        id_aktif: value.id_aktif,
        kode: data[i].kode,
      };
      let endpoint = "pdjama/kriteriaAudit/createx";

      this.dataService
        .getPostRequestLocal<FormResponse>(endpoint, payload)
        .subscribe(
          (success) => {
            if (i == data.length - 1) {
              if (success.message == "Invalid Parameter") {
                swal.fire({
                  title: "",
                  text: "action_selected.label" + " Gagal di Proses.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else {
                swal
                  .fire({
                    title: "action_selected.label",
                    text: " Berhasil di Simpan.",
                    icon: "success",
                    customClass: {
                      confirmButton: "btn btn-success",
                    },
                    buttonsStyling: false,
                    showCancelButton: false,
                    confirmButtonText: "Ok",
                  })
                  .then((result) => {
                    this.ngOnInit();
                  });
              }
            }
          },
          (error) => {
            if (i == data.length - 1) {
              swal.fire({
                icon: "error",
                customClass: {
                  confirmButton: "btn btn-error",
                },
                buttonsStyling: false,
              });
            }
          }
        );
    }
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
  audit_internal_id = this._storageService.get("audit_internal_id");
  submitRequest(): void {
    this.showSpinner();
    let result = this.data;
    console.log("kode_kriteria_penilaian =", result.type[0].kode);
    console.log("audit_internal_id =", this.audit_internal_id);
    const value = cloneDeep(this.formGroup.value);
    this.date = new Date();
    for (let i = 0; i < result.type.length; i++) {
      let payload = {
        kode_kriteria_penilaian: result.type[i].kode,
        audit_internal_id: this.audit_internal_id,
        dibuat_oleh: this.user,
      };

      let endpoint = "/pdjama/kriteriaAudit/create";

      this.dataService
        .getPostRequest<FormResponse>(endpoint, payload)
        .subscribe(
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

  selectAsalSekolah(data) {
    this.formGroup.get("kode_bidang").setValue(data.kode);
    this.formGroup.get("nama_bidang").setValue(data.nama_bidang);
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
      "nama_bidang LIKE  '%" +
      search +
      "%' or singkatan LIKE  '%" +
      search +
      "%'";
    this[nameLoader] = true;
    return this.dataService
      .getRequest<any>("/pdjama/master/bidang", {
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

  selectAuditor1(data) {
    this.formGroup.get("kode_auditor_1").setValue(data.kode);
    this.formGroup.get("nama_auditor_1").setValue(data.nama_auditor);
  }

  doFilterAuditor1(searchValue: string) {
    if (searchValue.length > 2) {
      this.auditorList = this.getDataAuditor(
        searchValue,
        "isAuditor1Search"
      ).pipe(map((res) => res));
    }
  }

  selectAuditor2(data) {
    this.formGroup.get("kode_auditor_2").setValue(data.kode);
    this.formGroup.get("nama_auditor_2").setValue(data.nama_auditor);
  }

  doFilterAuditor2(searchValue: string) {
    if (searchValue.length > 2) {
      this.auditorList = this.getDataAuditor(
        searchValue,
        "isAuditor2Search"
      ).pipe(map((res) => res));
    }
  }

  selectAuditor3(data) {
    this.formGroup.get("kode_auditor_3").setValue(data.kode);
    this.formGroup.get("nama_auditor_3").setValue(data.nama_auditor);
  }

  doFilterAuditor3(searchValue: string) {
    if (searchValue.length > 2) {
      this.auditorList = this.getDataAuditor(
        searchValue,
        "isAuditor3Search"
      ).pipe(map((res) => res));
    }
  }

  getDataAuditor(search, nameLoader) {
    let where = "nama_auditor LIKE  '%" + search + "%' ";
    this[nameLoader] = true;
    return this.dataService
      .getRequest<any>("/pdjama/master/auditor", {
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

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
}
