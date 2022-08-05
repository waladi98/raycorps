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
import { NgxSpinnerService } from "ngx-spinner";
import { finalize, takeUntil } from "rxjs/operators";
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../../../shared/types/common";
import { StorageService } from "../../../../core/services/storage.service";

declare const require: any;
declare const $: any;

@Component({
  selector: "app-verifikasi-peserta",
  templateUrl: "verifikasi-peserta.component.html",
  styleUrls: ["./verifikasi-peserta.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class VerifikasiPesertaComponent implements OnInit {
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
  date: any;

  formGroup: FormGroup;
  formGroupPersyaratan: FormGroup;
  listDataPilihanProdi = [];
  listDataKelengkapan = [];
  listDataStatusDokumen = [];
  listDataPersyaratan = [];
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
      formulir_id: [{ value: "", disabled: true }],
      nama: [{ value: "", disabled: true }],
      handphone: [{ value: "", disabled: true }],
      keterangan: [""],
      catatan: [""],
      test_kesehatan: [""],
      test_psikologi: [""],
      prodi_pilihan: new FormArray([]),
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
      const request = [
        this.loadDataPendaftaranPmb(),
        this.loadDataPeserta(),
        this.loadDataPesertaKelengkapan(),
        this.loadDataStatusDokumen(),
        this.loadDataPesertaPersyaratan(),
      ];

      const [
        dataPendaftaran,
        dataPeserta,
        listDataKelengkapan,
        listDataStatusDokumen,
        listDataPersyaratan,
      ] = await Promise.all(request);

      this.dataPendaftaranPmb = dataPendaftaran.result[0];

      this.dataPeserta =
        dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;

      if (this.dataPeserta) {
        this.inisialisasiDataFormPeserta(this.dataPeserta);
      }

      this.listDataKelengkapan = listDataKelengkapan.result;
      this.listDataPersyaratan = listDataPersyaratan.result;
      this.listDataStatusDokumen = listDataStatusDokumen.result;
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
        where: "id='" + this.params.formulir_id + "'",
      })
      .toPromise();
  }

  loadDataPeserta(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/peserta", {
        where: "formulir_id='" + this.params.formulir_id + "'",
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

  loadDataPesertaKelengkapan(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaKelengkapanProdi", {
        where:
          "formulir_id='" +
          this.params.formulir_id +
          "' AND required = 'Y'  AND id_status_dokumen > 0",
        order: " required DESC",
      })
      .toPromise();
  }
  loadDataPesertaPersyaratan(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaPersyaratanProdi", {
        where:
          "formulir_id='" +
          this.params.formulir_id +
          "' AND  id_status_dokumen > 0",
        order: " required DESC",
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

  inisialisasiDataFormPilihanProdi(data, jml_data) {
    // let i = 0;
    this.listDataPilihanProdi = [];

    for (let i = 0; i < jml_data; i++) {
      this.listDataPilihanProdi.push({ value: data[i].prodi, disabled: true });
    }

    // for (let i = 0; i < jml_data; i++) {
    //   this.prodi_pilihan.push(
    //     this.formBuilder.group({
    //       prodi: [{ value: data[i].prodi, disabled: true }, Validators.required]
    //     })
    //   );
    // }

    // console.log(this.prodi_pilihan);

    // this.prodi_pilihan.controls.forEach((c) => {
    //   c.setValue({
    //     prodi: data[i].prodi,
    //     id: data[i].id,
    //   });
    //   console.log(c.value);
    //   i++;
    // });
  }

  async inisialisasiDataFormPeserta(data) {
    this._storageService.set(
      "proses_kelengkapan",
      this.dataPeserta.formulir_id
    );
    this.formGroup
      .get("formulir_id")
      .setValue(data.formulir_id + "/ " + data.id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup
      .get("handphone")
      .setValue(data.handphone + " / " + data.email);
    // this.formGroup.get("catatan").setValue(data.catatan);

    const request = [this.loadDataPesertaPilihanProdi(data.id)];

    const [listDataPesertaPilihanProdi] = await Promise.all(request);

    this.inisialisasiDataFormPilihanProdi(
      listDataPesertaPilihanProdi.result,
      data.jumlah_pilihan
    );
  }

  onSubmit() {
    swal
      .fire({
        title: "Verifikasi Kelengkapan",
        text: "Apakah Anda Yakin Akan menyimpan perubahan ini?",
        icon: "warning",
        width: 600,
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
    this.spinnerStatus = "Sedang Diproses...";
    this.showSpinner();
    this.date = new Date();
    const value = cloneDeep(this.formGroup.value);

    const payload = [];

    let i = 0;

    for (let j = 0; j < this.listDataKelengkapan.length; j++) {
      payload.push({
        id: this.listDataKelengkapan[j].id,
        id_status_dokumen: this.listDataKelengkapan[j].id_status_dokumen,
        diubah_oleh: this.user,
        waktu_ubah: this.formatDate(this.date, "datetime"),
      });
    }

    for (let i = 0; i < payload.length; i++) {
      this.dataService
        .getPostRequest<FormResponse>(
          "/pmb/pesertaKelengkapan/modify",
          payload[i]
        )
        .pipe(finalize(() => this.hideSpinner()))
        .subscribe(
          (success) => {
            if (i == payload.length - 1) {
              if (success.code == "404") {
                swal.fire({
                  title: "Verifikasi Kelengkapan",
                  text: "Data Gagal di Simpan, mohon coba kembali.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else if (success.code == "500") {
                swal.fire({
                  title: "Verifikasi Kelengkapan",
                  text: "Data Gagal di Simpan, sepertinya terjadi sesuatu pada server atau koneksi, mohon refres ulang browser anda dan coba kembali.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else {
                swal
                  .fire({
                    title: "Verifikasi Kelengkapan",
                    //text: "Verifikasi Kelulusan Berhasil di Simpan.",
                    icon: "success",
                    html:
                      "Data Berhasil di Simpan. " +
                      "<p>Perubahan data <b>akan terproses setelah 10 detik</b>, mohon ditunggu.</p> ",
                    customClass: {
                      confirmButton: "btn btn-success",
                    },
                    buttonsStyling: false,
                    showCancelButton: false,
                    confirmButtonText: "Ok",
                  })
                  .then((result) => {
                    this.router.navigate(["/pmb/transaksi/proses-kelengkapan"]);
                    this._storageService.set(
                      "proses_kelengkapan",
                      this.dataPeserta.formulir_id
                    );
                  });
              }
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

  toRoute(data) {
    // if (data) {
    //   const payload = {
    //     id: this.dataPeserta.id,
    //     syarat: this.formGroup.get("keterangan").value,
    //     catatan: this.formGroup.get("catatan").value,
    //   };
    //   this.dataService
    //     .getPostRequest<FormResponse>("/pmb/peserta/modify", payload)
    //     .subscribe(
    //       (success) => {
    //         if (success.message == "Invalid Parameter") {
    //         } else {
    //           this.router.navigate(["/pmb/transaksi/proses-kelengkapan"]);
    //         }
    //       },
    //       (error) => {}
    //     );
    // }
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: "#",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-20",
          field: "no",
        },
        {
          label: "No. PMB",
          class: "text-sm text-left border border-black-300 bg-gray-400 w-30",
          field: "kode",
        },
        {
          label: "Nama",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: "nama",
        },
        {
          label: "Verifikasi Dokumen",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: "kode_prodi",
        },
        {
          label: "Tes Kesehatan",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: "status",
        },
        {
          label: "Tes Psikologi",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: "status",
        },
        {
          label: "AKSI",
          class:
            "text-sm disabled-sorting text-center w-20 border border-black-300 bg-gray-400",
          field: "action",
        },
      ],
      field: [
        {
          class: "text-center border border-black-300",
          field: "#",
        },
        {
          class: "text-left border border-black-300",
          field: "nopmb",
        },
        {
          class: "text-left border border-black-300",
          field: "nama",
        },
        {
          class: "text-left border border-black-300",
          field: "verifikasi-dokumen",
        },
        {
          class: "text-left border border-black-300",
          field: "tes-kesehatan",
        },
        {
          class: "text-left border border-black-300",
          field: "tes-psikologi",
        },
        {
          class: "text-center border border-black-300",
          field: "action",
        },
      ],
      action: [
        {
          action_name: "toRoute",
          icon: "fa fa-edit",
        },
      ],
      data: [],
    };
  }

  loadDataPilihanProdi(jenis_formulir, i): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/master/jenisFormulirPilihan", {
        where:
          "kode_jenis_formulir = '" +
          jenis_formulir +
          "' AND pilihan = '" +
          (i + 1) +
          "'",
      })
      .toPromise();
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

  onTabChanged(e) {
    if (e.index == 2) {
      //this.loadInitialDataTabPilihanProdi();
    } else if (e.index == 3) {
      //this.loadInitialDataTabRapor();
    } else if (e.index == 4) {
      //this.loadInitialDataTabOrangTua();
    }
  }

  onSubmitDataPersyaratan() {
    swal
      .fire({
        title: "Dokumen Persyaratan",
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
          this.submitPersyaratan();
        }
      });
  }
  submitPersyaratan(): void {
    this.spinnerStatus = "Sedang Diproses...";
    this.showSpinner();
    this.date = new Date();
    const value = cloneDeep(this.formGroup.value);

    const payload = [];

    let i = 0;

    for (let j = 0; j < this.listDataPersyaratan.length; j++) {
      payload.push({
        id: this.listDataPersyaratan[j].id,
        id_status_dokumen: this.listDataPersyaratan[j].id_status_dokumen,
        diubah_oleh: this.user,
        waktu_ubah: this.formatDate(this.date, "datetime"),
      });
    }

    for (let i = 0; i < payload.length; i++) {
      this.dataService
        .getPostRequest<FormResponse>(
          "/pmb/pesertaPersyaratan/modify",
          payload[i]
        )
        .pipe(finalize(() => this.hideSpinner()))
        .subscribe(
          (success) => {
            if (i == payload.length - 1) {
              if (success.code == "404" || success.code == "500") {
                swal.fire({
                  title: "Verifikasi Peryaratan",
                  text: "Verifikasi Peserta Gagal di Simpan.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else {
                swal
                  .fire({
                    title: "Verifikasi Peryaratan",
                    text: "Verifikasi Peryaratan Berhasil di Simpan.",
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
            }
          },
          (error) => {
            swal.fire({
              title: "Verifikasi Peryaratan",
              text: "Verifikasi Peryaratan Gagal di Simpan.",
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
  toRouteBatal(data) {
    if (data) {
      this.router.navigate(["/pmb/transaksi/proses-kelengkapan"]);
    }
  }
}
