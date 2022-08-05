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
declare const require: any;

declare const $: any;

interface stat_aktif {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-butir-audit-internal",
  templateUrl: "butir-audit-internal.component.html",
  styleUrls: ["./butir-audit-internal.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ButirAuditInternalComponent implements OnInit {
  formGroup: FormGroup;
  asalSekolahList;
  isAsalSekolahSearch: boolean = false;
  listDataJenisMgm = [];
  listDataJenisSekolah = [];
  wilayahList;
  listDataInstitusi = [];
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

  dataKomponen: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ButirAuditInternalComponent>,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dataParam = this.data;
    this.breakpointObserver;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      kode: ["", Validators.required],
      nama_daftar_periksa: ["", Validators.required],
      deskripsi: ["", Validators.required],
      id_aktif: ["", Validators.required],
    });
    this.loadInitialData();
  }

  loadDataTahunPeriode(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pdjama/master/tahunPeriode", {})
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

      this.listDataTahunInstitusi = [
        {
          kode: "demo",
          name: "2021",
        },
        {
          kode: "demo",
          name: "2022",
        },
      ];

      this.listDataBidangAuditi = [
        {
          kode: "demo",
          name: "bidang",
        },
        {
          kode: "demo",
          name: "auditi",
        },
      ];

      this.listDataAuditi = [
        {
          kode: "demo",
          name: "nama audit 1",
        },
        {
          kode: "demo",
          name: "nama audit 2",
        },
        {
          kode: "demo",
          name: "nama audit 3",
        },
      ];
      // const request = [];

      // const [] = await Promise.all(request);
      
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
      inisial: value.kode,
      nama_daftar_periksa: value.nama_daftar_periksa,
      deskripsi: value.deskripsi,
      id_aktif: value.id_aktif
    };

    let endpoint = "/pdjama/master/daftarPeriksaAudit/create";

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
