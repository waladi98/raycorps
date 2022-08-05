import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";

import { DataService } from "../../../../core/services/data.service";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

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
import { FileUploaderService } from "../../../../shared/file-uploader/file-uploader.service";
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
  isLoadingTable = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  params: any;
  dataPendaftaranPmb: any;
  dataPeserta: any;
  date: any;
  file_name: any;
  file_name2: any;
  formGroup: FormGroup;
  listDataPilihanProdi = [];
  listDataPersyaratan = [];
  listDataStatusDokumen = [];
  listDataSpikologi = {
    persyaratan: null,
    diubah_oleh: null,
    peserta_id: null,
    formulir_id: null,
    id: null,
    id_status_dokumen: null,
    kode_persyaratan: null,
    path_dokumenid: null,
    path_to_dokumen: null,
    persyaratanid: null,
    requiredid: null,
    status_dokumen: null,
  };
  listDataPsikotes = {
    persyaratan: null,
    diubah_oleh: null,
    id: null,
    id_status_dokumen: null,
    kode_persyaratan: null,
    path_dokumen: null,
    path_to_dokumen: null,
    persyaratanid: null,
    requiredid: null,
    status_dokumen: null,
  };
  fileDokumen = [];
  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  spinnerStatus = "Mohon Tunggu...";
  selectedValue: string;
  user = this._storageService.get("username");
  isDisabled = true;
  // time = Date.now();
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private _storageService: StorageService,
    private fileUploaderService: FileUploaderService
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
      status_dokumen: [{ value: "", disabled: true }],
      keterangan: [""],
      catatan: [""],
      test_kesehatan: [""],
      test_psikologi: [""],
      path_to_dokumen: [""],
      path_to_dokumen_2: [""],
      prodi_pilihan: new FormArray([]),
    });
    this.loadInitialDataPersyaratan();
  }

  get prodi_pilihan(): FormArray {
    return this.formGroup.get("prodi_pilihan") as FormArray;
  }
  async loadInitialDataPersyaratan(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();
      const request = [this.loadDataPesertaPersyaratanTesPsikologi()];

      const [listDataSpikologi] = await Promise.all(request);
      this.listDataSpikologi = listDataSpikologi.result[0];
      if (this.listDataSpikologi) {
        this.inisialisasiDataFormPeserta(this.listDataSpikologi);
      }

      this.hideSpinner();
    } catch (error) {
      console.log(error);
      //this.showSpinner();
    }
  }
  // async loadInitialData(): Promise<any> {
  //   try {
  //     this.isPreparingForm = true;
  //     this.spinnerStatus = "Mohon Tunggu...";
  //     this.showSpinner();
  //     const request = [
  //       this.loadDataPeserta(),
  //     ];

  //     const [
  //       dataPeserta,
  //     ] = await Promise.all(request);

  //     this.dataPeserta =
  //       dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;

  //     if (this.dataPeserta) {
  //       this.inisialisasiDataFormPeserta(this.dataPeserta);
  //     }
  //     console.log("TES", this.listDataPersyaratan);
  //     this.hideSpinner();
  //   } catch (error) {
  //     console.log(error);
  //     //this.showSpinner();
  //   }
  // }
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

  loadDataPeserta(peserta_id): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/peserta", {
        where: "formulir_id='" + peserta_id + "'",
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
      .getRequest<any>("/pmb/pesertaPersyaratanProdi", {
        where:
          "formulir_id='" +
          this.params.formulir_id +
          "'  AND (kode_persyaratan = '28' OR  kode_persyaratan = '29')",
        order: " required DESC",
      })
      .toPromise();
  }
  loadDataPesertaPersyaratanTesPsikologi(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaPersyaratanProdi", {
        where: "id='" + this.params.formulir_id + "'",
      })
      .toPromise();
  }
  loadDataPesertaPersyaratanSpikotes(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaPersyaratanProdi", {
        where:
          "formulir_id='" +
          this.params.formulir_id +
          "'  AND kode_persyaratan = '28' ",
      })
      .toPromise();
  }

  loadDataStatusDokumen(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/statusDokumen", {
        where: "id_aktif='Y'",
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
    this.formGroup
      .get("formulir_id")
      .setValue(data.formulir_id + "/ " + data.peserta_id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("status_dokumen").setValue(data.status_dokumen);
    this.formGroup.get("keterangan").setValue(data.syarat);
    this.formGroup.get("catatan").setValue(data.catatan);

    const request = [this.loadDataPeserta(data.formulir_id)];

    const [dataPeserta] = await Promise.all(request);

    this.dataPeserta =
      dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;

    if (this.dataPeserta) {
      this.inisialisasiDataPeserta(this.dataPeserta);
    }
  }
  async inisialisasiDataPeserta(data) {
    this.formGroup
      .get("handphone")
      .setValue(data.handphone + " / " + data.email);
  }

  onSubmit() {
    swal
      .fire({
        title: "Unggah Dokumen",
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
          this.submitRequest();
        }
      });
  }
  submitRequest(): void {
    this.showSpinner();
    this.date = new Date();
    const value = cloneDeep(this.formGroup.value);
    this.date = new Date();
    const payload = {
      id: this.params.formulir_id,
      path_to_dokumen: value.path_to_dokumen,
      diubah_oleh: this.user,
      waktu_ubah: this.formatDate(this.date, "datetime"),
    };

    let endpoint = "/pmb/pesertaPersyaratan/modify";

    this.dataService.getPostRequest<FormResponse>(endpoint, payload).subscribe(
      (success) => {
        if (success.code == "404") {
          swal.fire({
            title: "Unggah Dokumen",
            text: "Data Gagal di Simpan, mohon ulang kembali.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
          this.hideSpinner();
        } else if (success.code == "500") {
          swal.fire({
            title: "Unggah Dokumen",
            text: "Data Gagal di Simpan, sepertinya terjadi sesuatu pada server atau koneksi internet anda, mohon refres ulang browser anda dan coba kembali.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
          this.hideSpinner();
        } else {
          this.hideSpinner();
          swal
            .fire({
              title: "Unggah Dokumen",
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
              this.hideSpinner();
              this.router.navigate([
                "/pmb/transaksi/unggah-sertifikat-psikotes",
              ]);
              this._storageService.set(
                "proses_persyaratan",
                this.listDataSpikologi.formulir_id
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
  submitVerifikasi(): void {
    this.spinnerStatus = "Sedang Diproses...";
    this.showSpinner();
    this.date = new Date();
    const value = cloneDeep(this.formGroup.value);

    const payload = [];

    let i = 0;
    this.fileDokumen = [value.path_to_dokumen, value.path_to_dokumen_2];
    console.log("Ok", this.fileDokumen);
    for (let j = 0; j < this.listDataPersyaratan.length; j++) {
      payload.push({
        id: this.listDataPersyaratan[j].id,
        path_to_dokumen: this.fileDokumen[j],
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
              if (success.code == "404") {
                swal.fire({
                  title: "Verifikasi Persyaratan",
                  text: "Data Gagal di Simpan, mohon ulang kembali.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else if (success.code == "500") {
                swal.fire({
                  title: "Verifikasi Persyaratan",
                  text: "Data Gagal di Simpan, sepertinya terjadi sesuatu pada server atau koneksi internet anda, mohon refres ulang browser anda dan coba kembali.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else {
                swal
                  .fire({
                    title: "Verifikasi Persyaratan",
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
                      "/pmb/transaksi/unggah-sertifikat-psikotes",
                    ]);
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

  // toRoute(data) {
  //   if (data) {
  //     const payload = {
  //       id: this.dataPeserta.id,
  //       syarat: this.formGroup.get("keterangan").value,
  //       catatan: this.formGroup.get("catatan").value,
  //     };

  //     this.dataService
  //       .getPostRequest<FormResponse>("/pmb/peserta/modify", payload)
  //       .subscribe(
  //         (success) => {
  //           if (success.code == "404") {
  //             swal.fire({
  //               title: "Verifikasi Persyaratan",
  //               text: "Data Gagal di Simpan, mohon ulang kembali.",
  //               icon: "error",
  //               customClass: {
  //                 confirmButton: "btn btn-error",
  //               },
  //               buttonsStyling: false,
  //             });
  //           } else if (success.code == "500") {
  //             swal.fire({
  //               title: "Verifikasi Persyaratan",
  //               text: "Data Gagal di Simpan, sepertinya terjadi sesuatu pada server atau koneksi, mohon refres ulang browser anda dan coba kembali.",
  //               icon: "error",
  //               customClass: {
  //                 confirmButton: "btn btn-error",
  //               },
  //               buttonsStyling: false,
  //             });
  //           } else {
  //             swal
  //               .fire({
  //                 title: "Verifikasi Persyaratan",
  //                 //text: "Verifikasi Kelulusan Berhasil di Simpan.",
  //                 icon: "success",
  //                 html:
  //                   "Data Berhasil di Simpan. " +
  //                   "<p>Perubahan data <b>akan terproses setelah 10 detik</b>, mohon ditunggu.</p> ",
  //                 customClass: {
  //                   confirmButton: "btn btn-success",
  //                 },
  //                 buttonsStyling: false,
  //                 showCancelButton: false,
  //                 confirmButtonText: "Ok",
  //               })
  //               .then((result) => {
  //                 this.router.navigate([
  //                   "/pmb/transaksi/unggah-sertifikat-psikotes",
  //                 ]);
  //                 this._storageService.set(
  //                   "proses_persyaratan",
  //                   this.dataPeserta.formulir_id
  //                 );
  //               });
  //           }
  //         },
  //         (error) => {
  //           swal.fire({
  //             icon: "error",
  //             title: "koneksi internetmu tergangung!",
  //             text: "Yuk, pastikan internetmu lancar dengan cek ulang paket data, WIFI, atau jaringan di tempatmu",
  //             customClass: {
  //               confirmButton: "btn btn-error",
  //             },
  //             buttonsStyling: false,
  //           });
  //         }
  //       );
  //   }
  // }

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

  openFileUploaderDok1(): void {
    this.fileUploaderService
      .open({
        title: "Unggah Dokumen",
        templateUrl: "",
        templateParams: {
          action: "",
        },
        uploadUrl: "/file/uploadFile",
        uploadParams: {
          path: "persyaratan/" + this.listDataSpikologi.peserta_id,
        },
        downlodButtonText: "Download Template",
        uploadButtonText: "Upload",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result.data) {
          this.file_name = result.data.result.filename;
          this.formGroup
            .get("path_to_dokumen")
            .setValue(result.data.result.newfilename);
        }
      });
  }
  // openFileUploaderDok2(): void {
  //   this.fileUploaderService
  //     .open({
  //       title: "Unggah Dokumen",
  //       templateUrl: "",
  //       templateParams: {
  //         action: "",
  //       },
  //       uploadUrl: "/file/uploadFile",
  //       uploadParams: {
  //         path: "persyaratan/" + this.dataPeserta.id,
  //       },
  //       downlodButtonText: "Download Template",
  //       uploadButtonText: "Upload",
  //     })
  //     .afterClosed()
  //     .subscribe((result) => {
  //       if (result.data) {
  //         this.file_name2 = result.data.result.filename;
  //         this.formGroup
  //           .get("path_to_dokumen_2")
  //           .setValue(result.data.result.newfilename);
  //       }
  //     });
  // }
  cancelUpload() {
    this.listDataSpikologi.path_to_dokumen = null;
    this.formGroup.get("path_to_dokumen").setValue(null);
  }
  // cancelUpload2() {
  //   this.listDataPsikotes.path_to_dokumen = null;
  //   this.formGroup.get("path_to_dokumen_2").setValue(null);
  // }
}
