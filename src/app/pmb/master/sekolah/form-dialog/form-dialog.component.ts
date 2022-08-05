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
      kode: ["", Validators.required],
      nama: ["", Validators.required],
      alamat_1: ["", Validators.required],
      kode_pos: ["", Validators.required],
      alamat_2: ["", Validators.required],
      kota: ["", Validators.required],
      Propinsi: ["", Validators.required],
      JenisSekolaID: ["", Validators.required],
    });
    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.showSpinner();
      // const request = [];

      // const [] = await Promise.all(request);
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

  doFilterWilayah(searchValue: string) {
    if (searchValue.length > 2) {
      this.wilayahList = this.getDataWilayah(
        0,
        searchValue,
        "isParentSearchWilayah"
      ).pipe(map((res) => res));
    }
  }
  getDataWilayah(tingkat, search, nameLoader) {
    let where =
      "tingkat = '" + tingkat + "' AND nama_wilayah LIKE  '%" + search + "%'";
    if (tingkat == 0) {
      where = "nama_wilayah LIKE  '%" + search + "%'";
    }
    this["nameLoader"] = true;
    return this.dataService
      .getRequest<any>("/master/wilayah", {
        where: where,
        limit: 25,
      })
      .pipe(
        map((data) => {
          this["nameLoader"] = false;
          return data.result;
        })
      );
  }
  selectWilayah(data) {
    this.formGroup.get("kode_wilayah").setValue(data.kode);
    this.formGroup.get("wilayah").setValue(data.nama_wilayah);
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
      kode: value.kode,
      nama: value.nama,
      alamat_1: value.alamat_1,
      kode_pos: value.kode_pos,
      alamat_2: value.alamat_2,
      kota: value.kota,
      Propinsi: value.Propinsi,
      JenisSekolaID: value.JenisSekolaID,
    };

    let endpoint = "/master/sekolah/create";

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
