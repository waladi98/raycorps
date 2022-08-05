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
import { StorageService } from "../../../../core/services/storage.service";

declare const require: any;
declare const $: any;

@Component({
  selector: "app-verifikasi-kelulusan-peserta",
  templateUrl: "verifikasi-kelulusan-peserta.component.html",
  styleUrls: ["./verifikasi-kelulusan-peserta.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class VerifikasiKelulusanPesertaComponent implements OnInit {
  listData = {
    header: [],
    field: [],
    action: [],
    data: [],
  };

  verifikasi = [
    { value: "1", viewValue: "Belum diverifikasi" },
    { value: "2", viewValue: "Dalam Proses" },
    { value: "3", viewValue: "Lulus Verifikasi" },
    { value: "4", viewValue: "Data Tidak Lengkap" },
    { value: "5", viewValue: "Data Salah Input" },
  ];

  tes_kesehatan = [
    { value: "1", viewValue: "Belum diproses" },
    { value: "2", viewValue: "Direkomendasikan" },
    { value: "3", viewValue: "Tidak Direkomendasikan" },
    { value: "4", viewValue: "Tes Menyusul" },
  ];

  tes_psikologi = [
    { value: "1", viewValue: "Belum tes" },
    { value: "2", viewValue: "Dalam Proses Verifikasi" },
    { value: "3", viewValue: "Memenuhi Syarat" },
    { value: "4", viewValue: "Tidak Memenuhi Syarat" },
  ];

  status_lulus = [
    { value: "1", viewValue: "Belum diproses" },
    { value: "2", viewValue: "Lulus" },
    { value: "3", viewValue: "Tidak Lulus" },
    { value: "4", viewValue: "Cadangan" },
    { value: "5", viewValue: "Data Tidak Lengkap" },
  ];

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
  listDataPilihanProdi = [];
  listDataPersyaratan = [];
  listDataStatus = [];
  listDataTahunPeriode = [];
  dataPesertaNilai: any;
  user = this._storageService.get("kode_pengguna");
  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  spinnerStatus = "Mohon Tunggu...";
  selectedValue: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
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
      catatan: [{ value: "", disabled: true }],
      catatan_hasil_seleksi: [{ value: "" }],
      catatan_kelulusan: [{ value: "" }],
      kode_tahun_periode: [{ value: "" }, Validators.required],
      status_seleksi: [{ value: "" }],
      prodi_pilihan: new FormArray([]),
    });

    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();
      const request = [
        this.loadDataPendaftaranPmb(),
        this.loadDataPeserta(),
        this.loadDataPesertaPersyaratan(),
        this.loadDataStatus(),
        this.loadDataTahunPeriode(),
      ];

      const [
        dataPendaftaran,
        dataPeserta,
        listDataPersyaratan,
        listDataStatus,
        listDataTahunPeriode,
      ] = await Promise.all(request);

      this.dataPendaftaranPmb = dataPendaftaran.result[0];

      this.dataPeserta =
        dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;

      if (this.dataPeserta) {
        this.inisialisasiDataFormPeserta(this.dataPeserta);
      }

      this.listDataPersyaratan = listDataPersyaratan.result;
      this.listDataStatus = listDataStatus.result;
      this.listDataTahunPeriode = listDataTahunPeriode.result;
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
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
    }, 5000);
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

  loadDataPesertaPersyaratan(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaPersyaratan", {
        where: "formulir_id='" + this.params.formulir_id + "'",
        order: " required DESC",
      })
      .toPromise();
  }

  loadDataStatus(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/statusSeleksi", {
        where:
          "id_aktif='Y' AND not exists(select 0 FROM pmb_ref_pengaturan where opsi_pilihan_2 = id) AND not exists(select 0 FROM pmb_ref_pengaturan where opsi_pilihan_3 = id)",
      })
      .toPromise();
  }
  loadDataTahunPeriode(): Promise<any> {
    return this.dataService
      .getRequest<any>("/master/tahunPeriode", {
        where: "id_aktif='Y'",
      })
      .toPromise();
  }

  inisialisasiDataFormPilihanProdi(data, jml_data) {
    this.listDataPilihanProdi = [];

    for (let i = 0; i < jml_data; i++) {
      this.listDataPilihanProdi.push({
        value: data[i].prodi,
        disabled: true,
        status_seleksi: data[i].status_seleksi,
        id_status_seleksi: data[i].id_status_seleksi,
      });
    }
  }

  async inisialisasiDataFormPeserta(data) {
    this.formGroup
      .get("formulir_id")
      .setValue(data.formulir_id + "/ " + data.id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("catatan").setValue(data.catatan);
    this.formGroup
      .get("catatan_hasil_seleksi")
      .setValue(data.catatan_hasil_seleksi);
    this.formGroup.get("catatan_kelulusan").setValue(data.catatan_kelulusan);
    this.formGroup.get("kode_tahun_periode").setValue(data.kode_tahun_periode);
    this.formGroup.get("status_seleksi").setValue(data.id_status_seleksi);
    const request = [this.loadDataPesertaPilihanProdi(data.id)];

    const [listDataPesertaPilihanProdi] = await Promise.all(request);

    this.inisialisasiDataFormPilihanProdi(
      listDataPesertaPilihanProdi.result,
      data.jumlah_pilihan
    );

    this.loadInitialDataTabRapor();
  }

  async loadInitialDataTabRapor(): Promise<any> {
    try {
      const request = [this.loadDataPesertaNilai(this.dataPeserta.id)];

      const [dataPesertaNilai] = await Promise.all(request);

      this.dataPesertaNilai = [];

      let dataNilai = dataPesertaNilai.result;

      for (let i = 0; i < dataNilai.length; i++) {
        dataNilai[i].semester = dataNilai[i].komponen.charAt(
          dataNilai[i].komponen.length - 1
        );
        dataNilai[i].name = dataNilai[i].komponen
          .replace("Smst.", "")
          .replace(dataNilai[i].semester, "")
          .replace(/  +/g, "");
      }

      var semester = dataNilai
        .map((item) => item.semester)
        .filter((value, index, self) => self.indexOf(value) === index);

      for (let i = 0; i < semester.length; i++) {
        var matkul = [];

        for (let j = 0; j < dataNilai.length; j++) {
          if (dataNilai[j].semester == semester[i]) {
            matkul.push(dataNilai[j]);
          }
        }
        this.dataPesertaNilai.push({
          semester: semester[i],
          matkul: matkul,
        });
      }

      //console.log(this.dataPesertaNilai);
    } catch (error) {
      console.log(error);
      //this.showSpinner();
    }
  }

  loadDataPesertaNilai(peserta_id): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaNilai", {
        where: "peserta_id = '" + peserta_id + "'",
      })
      .toPromise();
  }

  getDataPesertaPilihanProdi(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaPilihanProdi", {
        where:
          "peserta_id = '" +
          this.dataPeserta.id +
          "' AND pilihan ='" +
          this.dataPeserta.pilihan_ke +
          "'",
      })
      .toPromise();
  }

  onSubmit() {
    swal
      .fire({
        title: "Verifikasi Kelulusan",
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
          //this.getDataPesertaProdi();
        }
      });
  }

  // async getDataPesertaProdi() {
  //   this.showSpinner();
  //   const value = cloneDeep(this.formGroup.value);

  //   try {
  //     const request = [this.loadDataPeserta()];

  //     const [dataPeserta] = await Promise.all(request);

  //     this.dataPeserta =
  //       dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;

  //     //this.submitVerifikasi();
  //   } catch (error) {
  //     console.log(error);
  //     //this.showSpinner();
  //   }
  // }

  async submitVerifikasi() {
    this.spinnerStatus = "Sedang Diproses...";
    this.showSpinner();
    this.date = new Date();
    const value = cloneDeep(this.formGroup.value);

    try {
      const request = [this.getDataPesertaPilihanProdi()];

      const [dataPesertaPilihanProdi] = await Promise.all(request);

      let dataPesertaPilihanProdiResult =
        dataPesertaPilihanProdi.result.length > 0
          ? dataPesertaPilihanProdi.result[0]
          : false;

      if (dataPesertaPilihanProdiResult) {
        const payload = {
          id: dataPesertaPilihanProdiResult.id,
          id_status_seleksi: this.formGroup.get("status_seleksi").value,
          diubah_oleh: this.user,
          waktu_ubah: this.formatDate(this.date, "datetime"),
        };
        this.dataService
          .getPostRequest<FormResponse>(
            "/pmb/pesertaPilihanProdi/modify",
            payload
          )
          .pipe(finalize(() => this.hideSpinner()))
          .subscribe(
            (success) => {
              //console.log("Tes wal", success);
              if (success.code == "404") {
                swal.fire({
                  title: "Verifikasi Kelulusan",
                  text: "Data Gagal di Simpan, mohon ulang kembali.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else if (success.code == "500") {
                swal.fire({
                  title: "Verifikasi Kelulusan",
                  text: "Data Gagal di Simpan, sepertinya terjadi sesuatu pada server atau koneksi internet anda, mohon refres ulang browser anda dan coba kembali.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else {
                this.toRoute(success.result);
                // swal
                //   .fire({
                //     title: "Verifikasi Kelulusan",
                //     text: "Verifikasi Kelulusan Berhasil di Simpan.",
                //     icon: "success",
                //     customClass: {
                //       confirmButton: "btn btn-success",
                //     },
                //     buttonsStyling: false,
                //     showCancelButton: false,
                //     confirmButtonText: "Ok",
                //   })
                //   .then((result) => {
                //     this.toRoute(success.result);
                //   });
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
    } catch (error) {
      this.hideSpinner();
      console.log(error);
    }
  }

  toRoute(data) {
    if (data) {
      const payload = {
        id: this.dataPeserta.id,
        catatan_hasil_seleksi: this.formGroup.get("catatan_hasil_seleksi")
          .value,
        catatan_kelulusan: this.formGroup.get("catatan_kelulusan").value,
        kode_tahun_periode: this.formGroup.get("kode_tahun_periode").value,
      };

      this.dataService
        .getPostRequest<FormResponse>("/pmb/peserta/modify", payload)
        .subscribe(
          (success) => {
            if (success.code == "404") {
              swal.fire({
                title: "Verifikasi Kelulusan",
                text: "Data Gagal di Simpan, mohon ulang kembali.",
                icon: "error",
                customClass: {
                  confirmButton: "btn btn-error",
                },
                buttonsStyling: false,
              });
            } else if (success.code == "500") {
              swal.fire({
                title: "Verifikasi Kelulusan",
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
                  title: "Verifikasi Kelulusan",
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
                  this.router.navigate([
                    "/pmb/transaksi/proses-kelulusan/daftar-peserta-pmb",
                  ]);
                  this._storageService.set(
                    "proses_kelulusan",
                    this.dataPeserta.formulir_id
                  );
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
  toRouteBatal(data) {
    if (data) {
      this.router.navigate([
        "/pmb/transaksi/proses-kelulusan/daftar-peserta-pmb",
      ]);
    }
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
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
