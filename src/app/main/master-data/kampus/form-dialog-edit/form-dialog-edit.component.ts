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
  dataMaster: any;
  listDataJenisMgm = [];
  listDataInstitusi = [];
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
      kode: ["", Validators.required],
      kode_institusi: ["", Validators.required],
      nama: ["", Validators.required],
      telepon: ["", Validators.required],
      fax: ["", Validators.required],
      alamat_jalan: ["", Validators.required],
      alamat_rt: ["", Validators.required],
      alamat_rw: ["", Validators.required],
      nama_dusun: ["", Validators.required],
      kode_wilayah: ["", Validators.required],
      wilayah: ["", Validators.required],
      id_aktif: [""],
    });
    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.showSpinner();
      const request = [this.loadDataMaster(), this.loadDataJenisMgm()];

      const [dataMaster, listDataJenisMgm] = await Promise.all(request);
      this.listDataInstitusi = [
        {
          kode: "demo",
          name: "demo - Universitas Yarsi",
        },
      ];
      this.listDataJenisMgm = listDataJenisMgm.result;
      this.dataMaster =
        dataMaster.result.length > 0 ? dataMaster.result[0] : null;

      //console.log("Referral", this.dataMaster);

      this.initialData(this.dataMaster);
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
    }
  }

  initialData(data): void {
    this.formGroup.get("kode").setValue(data.kode);
    this.formGroup.get("kode_institusi").setValue(data.kode_institusi);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("telepon").setValue(data.telepon);
    this.formGroup.get("fax").setValue(data.fax);
    this.formGroup.get("alamat_jalan").setValue(data.alamat_jalan);
    this.formGroup.get("alamat_rt").setValue(data.alamat_rt);
    this.formGroup.get("alamat_rw").setValue(data.alamat_rw);
    this.formGroup.get("nama_dusun").setValue(data.nama_dusun);
    this.formGroup.get("kode_wilayah").setValue(data.kode_wilayah);
    this.formGroup.get("id_aktif").setValue(data.id_aktif);
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
  // onTabChanged(e) {
  //   if (e.index == 0 || e.index == 1) {
  //   } else if (e.index == 2) {
  //     this.loadInitialDataTabPilihanProdi();
  //   } else if (e.index == 3) {
  //     this.loadInitialDataTabRapor();
  //   } else if (e.index == 4) {
  //     this.loadInitialDataTabOrangTua();
  //   } else if (e.index == 5) {
  //     this.loadInitialDataTabAsalSekolah();
  //   } else if (e.index == 6) {
  //     this.loadInitialDataTabAsalPerguruanTinggi();
  //   }
  // }
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
  loadDataMaster(): Promise<any> {
    return this.dataService
      .getRequest<any>("/master/kampus", {
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
