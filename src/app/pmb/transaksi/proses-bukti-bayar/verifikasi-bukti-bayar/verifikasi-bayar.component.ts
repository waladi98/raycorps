import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
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
import { DataService } from "../../../../core/services/data.service";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormControl,
} from "@angular/forms";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { cloneDeep } from "lodash";
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../../../shared/types/common";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize, takeUntil } from "rxjs/operators";
import { StorageService } from '../../../../core/services/storage.service';

declare const require: any;
declare const $: any;

@Component({
  selector: "app-verifikasi-bayar",
  templateUrl: "verifikasi-bayar.component.html",
  styleUrls: ["./verifikasi-bayar.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class VerifikasiBayarComponent implements OnInit {
  listData = {
    header: [],
    field: [],
    action: [],
    data: [],
  };

  isLoadingTable = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  params: any;
  dataPendaftaranPmb: any;
  dataPeserta: any;

  formGroup: FormGroup;
  listDataStatus = [];
  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  spinnerStatus = "Mohon Tunggu...";
  selectedValue: string;
  user = this._storageService.get("username");
  // time = Date.now();
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private _storageService: StorageService
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenSmall = true;
          console.log("Matches small viewport or handset in portrait mode");
        } else {
          this.isScreenSmall = false;
        }
      });
    this._activatedRoute.params.subscribe(
      (params: any) => (this.params = params)
    );
  }
  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      gelombang: [{ value: "", disabled: true }],
      id: [{ value: "", disabled: true }],
      nama: [{ value: "", disabled: true }],
      prodi_pilihan_1: [{ value: "", disabled: true }],
      handphone: [{ value: "", disabled: true }],
      email: [{ value: "", disabled: true }],
      status_bayar: [{ value: "" }],
      // prodi_pilihan: new FormArray([]),
    });

    this.loadInitialData();
  }

  get prodi_pilihan(): FormArray {
    return this.formGroup.get("prodi_pilihan") as FormArray;
  }

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();
      const request = [this.loadDataPendaftaranPmb(), this.loadDataStatus()];

      const [dataPendaftaran, listDataStatus] = await Promise.all(request);

      this.dataPendaftaranPmb = dataPendaftaran.result[0];
      this.inisialisasiDataFormPeserta(this.dataPendaftaranPmb);
      this.listDataStatus = listDataStatus.result;
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      //this.showSpinner();
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
  loadDataPendaftaranPmb(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/formulirOnline", {
        where: "id='" + this.params.id + "'",
      })
      .toPromise();
  }

  loadDataStatus(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/statusBayar", {})
      .toPromise();
  }
  async inisialisasiDataFormPeserta(data) {
    this.formGroup.get("gelombang").setValue(data.gelombang);
    this.formGroup.get("id").setValue(data.id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("prodi_pilihan_1").setValue(data.prodi_pilihan_1);
    this.formGroup.get("handphone").setValue(data.handphone);
    this.formGroup.get("email").setValue(data.email);
    this.formGroup.get("status_bayar").setValue(data.id_status_bayar);
  }

  onSubmit() {
    swal
      .fire({
        title: "Verifikasi Pembayaran",
        text: "Apakah Yakin Akan Submit Data Ini?",
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
          this.submitVerifikasi();
        }
      });
  }
  submitVerifikasi(): void {
    this.spinnerStatus = "Perubahan Sedang Diproses...";
    this.showSpinner();
    const value = cloneDeep(this.formGroup.value);
    const payload = {
      id: this.dataPendaftaranPmb.id,
      id_status_bayar: this.formGroup.get("status_bayar").value,
    };

    this.dataService
      .getPostRequest<FormResponse>("/pmb/formulirOnline/modify", payload)
      .pipe(finalize(() => this.hideSpinner()))
      .subscribe(
        (success) => {
          if (success.message == "Invalid Parameter") {
            swal.fire({
              title: "Daftar PMB",
              text: "Data PMB Gagal di Daftarkan.",
              icon: "error",
              customClass: {
                confirmButton: "btn btn-error",
              },
              buttonsStyling: false,
            });
          } else {
            swal
              .fire({
                title: "Verifikasi Pembayaran",
                text: "Perubahan status pembayaran berhasil disimpan",
                icon: "success",
                customClass: {
                  confirmButton: "btn btn-success",
                },
                buttonsStyling: false,
                showCancelButton: false,
                confirmButtonText: "Ok",
              })
              .then((result) => {
                this.toRoute(success.result);
              });
          }
        },
        (error) => {
          swal.fire({
            title: "Daftar PMB",
            text: "Data PMB Gagal di Daftarkan.",
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
      this.router.navigate(["/pmb/transaksi/proses-bukti-bayar"]);
    }
  }
  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }
}
