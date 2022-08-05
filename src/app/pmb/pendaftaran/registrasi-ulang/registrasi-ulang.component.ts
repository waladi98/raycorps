import { Router } from "@angular/router";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl,
} from "@angular/platform-browser";
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
import { NgxSpinnerService } from "ngx-spinner";
import { cloneDeep } from "lodash";
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../../shared/types/common";
import { DataService } from "../../../../app/core/services/data.service";
import { finalize, map, takeUntil } from "rxjs/operators";
import { StorageService } from "../../../core/services/storage.service";
import { FileUploaderService } from "../../../shared/file-uploader/file-uploader.service";

declare const require: any;

declare const $: any;

@Component({
  selector: "app-registrasi-ulang",
  templateUrl: "registrasi-ulang.component.html",
  styleUrls: ["./registrasi-ulang.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class RegistrasiUlangComponent implements OnInit {
  formGroup: FormGroup;
  formDataMgm: FormGroup;
  formProdiPilihan: FormGroup;
  formUndurDiri: FormGroup;

  simpleSlider = 40;
  doubleSlider = [20, 60];

  regularItems = ["Pizza", "Pasta", "Parmesan"];
  touch: boolean;

  selectedValue: string;
  currentCity: string[];

  selectTheme = "primary";
  alasan_undur_diri = [
    { value: "0", viewValue: "Belum Diisi" },
    { value: "1", viewValue: "Diterima Diperguruan Tinggi lain" },
    { value: "2", viewValue: "Pindah Ke Prodi Lain" },
    { value: "3", viewValue: "Lain - lain" },
  ];

  srcdoc = null;
  listDataProgram = [];
  listDataStatusAwal = [];
  listDataJurusanSekolah = [];
  listDataAgama = [];
  listDataStatusSipil = [];
  listDataJenisKelamin = [];
  listDataPilihanProdi = [];
  isDoneMakeForm = false;
  listDataPilihanProdi3 = [];
  listDataWilayah = [];
  listDataJenjang = [];
  listDataJasAlmamater = [];
  listDataPesertaUndurDiri = [];
  listDataAlasanUndurDiri = [];
  listDataReferral = [];
  dataPesertaAsalSekolah: any;
  register = false;
  undur = false;
  mgm = false;
  menu = true;
  sudah_bayar = false;
  kode_tempat_lahir: any;
  tempatLahirList;
  wilayahList;
  asalSekolahList;
  isParentSearch: boolean = false;
  isParentSearchWilayah: boolean = false;
  isAsalSekolahSearch: boolean = false;
  dataPesertaKeluarga: any;

  spinnerStatus = "Mohon Tunggu sedang memuat data..";
  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";

  @ViewChild("iframe") iframe: ElementRef;

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _storageService: StorageService,
    private fileUploaderService: FileUploaderService
  ) {}
  ngOnInit() {
    this.loadInitialData();

    this.formGroup = this.formBuilder.group({
      periode: [{ value: "", disabled: true }, Validators.required],
      no_pendaftaran: [{ value: "", disabled: true }, Validators.required],
      no_test: [{ value: "", disabled: true }],
      prodi: [{ value: "", disabled: true }],
      nama: [{ value: "", disabled: true }, Validators.required],
      jenis_formulir: [{ value: "", disabled: true }, Validators.required],
      prodi_1: [{ value: "", disabled: true }, Validators.required],
      kode_program: [{ value: "", disabled: true }, Validators.required],
      id_jas_almamater: [{ value: "" }, Validators.required],
      status_awal: ["B", Validators.required],
      jurusan_sekolah: ["", Validators.required],
    });

    this.formDataMgm = this.formBuilder.group({
      id: [""],
      kode_referral: [""],
      nama_pegawai: [{ value: "", disabled: true }, Validators.required],
      nama_referral: [""],
      //handphone: [{ value: "", disabled: true }],
      nipy_pegawai: [{ value: "", disabled: false }],
    });

    this.formUndurDiri = this.formBuilder.group({
      no_test: [{ value: "", disabled: true }],
      id_alasan_pengunduran_diri: ["1", Validators.required],
      keterangan_undur_diri: ["", Validators.required],
      path_to_dokumen: [""],
      id_status_dokumen: [""],
      nomor_rekening: ["", Validators.required],
      nama_bank: ["", Validators.required],
      jumlah_pengembalian: [{ value: "", disabled: true }],
      status_dokumen: [{ value: "", disabled: true }],
      path_to_bukti_transfer: [""],
    });

    this.formProdiPilihan = this.formBuilder.group({
      id: ["", Validators.required],
      prodi_pilihan: new FormArray([]),
    });

    // console.log("testing");
    // var user_token = this._storageService.get("user_token");

    // if (user_token) {
    //   this.srcdoc = this.sanitizer.bypassSecurityTrustResourceUrl(
    //     "https://pmb.yarsi.ac.id/prototipe/pmb/frame_modul.php?user_token=" +
    //       user_token +
    //       "&modul=q_peserta"
    //   );
    // } else {
    //   console.log("user_token");
    // }
  }
  myFunc(val: any) {
    // code here
  }
  user = this._storageService.get("username");
  dataPendaftaranPmb: any;
  dataPeserta: any;
  dataPesertaUndurDiri = {
    peserta_id: null,
    id_alasan_pengunduran_diri: null,
    path_to_dokumen: null,
    keterangan_undur_diri: null,
    id: null,
    diubah_oleh: null,
    waktu_ubah: null,
    id_status_dokumen: null,
    path_to_bukti_transfer: null,
    jumlah_pengembalian: null,
    status_dokumen: null,
  };
  dataPesertaMgm = {
    id: null,
    peserta_id: null,
    kode_referral: null,
    nik_pegawai: null,
    nama_pegawai_referral: null,
    handphone_pegawai_refferal: null,
    id_jenis_mgm: null,
    jenis_mgm: null,
    diubah_oleh: null,
    waktu_ubah: null,
  };
  file_name: any;
  date: any;

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu sedang memuat data..";

      this.showSpinner();
      const request = [
        this.loadDataPendaftaranPmb(),
        this.loadDataPeserta(),
        this.loadDataProgram(),
        this.loadDataJasAlmamater(),
        this.loadDataPesertaUndurDiri(),
        this.loadDataAlasanUndurDiri(),
      ];

      const [
        dataPendaftaran,
        dataPeserta,
        listDataProgram,
        listDataJasAlmamater,
        dataPesertaUndurDiri,
        listDataAlasanUndurDiri,
      ] = await Promise.all(request);
      this.dataPendaftaranPmb = dataPendaftaran.result[0];

      this.inisialisasiDataForm(this.dataPendaftaranPmb);

      this.dataPeserta =
        dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;

      if (this.dataPeserta) {
        this.register = true;
        if (this.dataPeserta.sudah_bayar == "T") {
          this.sudah_bayar = true;
        }
        this.inisialisasiDataFormPeserta(this.dataPeserta);
      }
      this.dataPesertaUndurDiri =
        dataPesertaUndurDiri.result.length > 0
          ? dataPesertaUndurDiri.result[0]
          : false;
      if (this.dataPesertaUndurDiri) {
        this.undur = true;
        this.inisialisasiDataFormUndurDiri(this.dataPesertaUndurDiri);
      }

      this.listDataProgram = listDataProgram.result;
      this.listDataJasAlmamater = listDataJasAlmamater.result;
      this.listDataAlasanUndurDiri = listDataAlasanUndurDiri.result;

      this.isDoneMakeForm = true;
      this.loadInitialDataTabAsalSekolah();
      this.hideSpinner();
      this.helloShow();
    } catch (error) {
      this.hideSpinner();
      console.log(error);
    }
  }

  inisialisasiDataForm(data) {
    this.formGroup.get("no_pendaftaran").setValue(data.id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("jenis_formulir").setValue(data.jenis_formulir);
    this.formGroup.get("prodi_1").setValue(data.prodi_pilihan_1);

    //this.formDataMgm.get("nama").setValue(data.nama);
  }

  // get prodi_pilihan(): FormArray {
  //   return this.formProdiPilihan.get("prodi_pilihan") as FormArray;
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
  helloShow() {
    var welcome = this._storageService.get("welcome");
    if (welcome == "1") {
      return false;
    } else {
      this._storageService.set("welcome", "1");
    }
    swal
      .fire({
        title: "Hallo Selamat Datang",
        text: "Silahkan isi Kelengkapan data anda.",
        icon: "success",
        customClass: {
          confirmButton: "btn btn-success",
        },
        buttonsStyling: false,
        showCancelButton: false,
        confirmButtonText: "Ok",
      })
      .then((result) => {
        // this.router.navigate(["/pmb/dashboarda"]);
        //this.ngAfterViewInit();
      });
  }
  //start
  async inisialisasiDataFormPeserta(data) {
    this.formProdiPilihan.get("id").setValue(data.id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("no_test").setValue(data.formulir_id + " / " + data.id);
    this.formGroup.get("kode_program").setValue(data.kode_program);
    this.formGroup.get("prodi").setValue(data.prodi);
    this.formGroup.get("id_jas_almamater").setValue(data.id_jas_almamater);
    this.formGroup.get("jurusan_sekolah").setValue(data.id_jurusan_sekolah);
    //this.formDataMgm.get("nama").setValue(data.nama);

    //undurDiri formUndurDiri
    this.formUndurDiri
      .get("no_test")
      .setValue(data.formulir_id + " / " + data.id);

    // for (let i = 0; i < data.jumlah_pilihan; i++) {
    //   this.prodi_pilihan.push(
    //     this.formBuilder.group({
    //       prodi: ["", Validators.required],
    //       id: ["", Validators.required],
    //     })
    //   );
    //   this.listDataPilihanProdi.push(null);
    // }

    // let i = 0;
    // for (const list of this.listDataPilihanProdi) {
    //   let request = [
    //     this.loadDataPilihanProdi(
    //       this.dataPendaftaranPmb.kode_jenis_formulir,
    //       i
    //     ),
    //   ];

    //   let [listDataPilihanProdi] = await Promise.all(request);

    //   this.listDataPilihanProdi[i] = listDataPilihanProdi.result;

    //   i++;
    // }
  }
  async inisialisasiDataFormUndurDiri(data) {
    this.formUndurDiri
      .get("no_test")
      .setValue(this.dataPeserta.formulir_id + " / " + this.dataPeserta.id);
    this.formUndurDiri
      .get("id_alasan_pengunduran_diri")
      .setValue(data.id_alasan_pengunduran_diri);
    this.formUndurDiri
      .get("keterangan_undur_diri")
      .setValue(data.keterangan_undur_diri);
    this.formUndurDiri.get("nomor_rekening").setValue(data.nomor_rekening);
    this.formUndurDiri.get("nama_bank").setValue(data.nama_bank);
    this.formUndurDiri.get("status_dokumen").setValue(data.status_dokumen);
    this.formUndurDiri
      .get("jumlah_pengembalian")
      .setValue(data.jumlah_pengembalian);
    this.formUndurDiri
      .get("path_to_bukti_transfer")
      .setValue(data.path_to_bukti_transfer);
  }

  loadDataPendaftaranPmb(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/formulirOnline", {
        where: "id='" + this._storageService.get("username") + "'",
      })
      .toPromise();
  }
  loadDataPesertaUndurDiri(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaUndurDiri", {
        where: "formulir_id='" + this._storageService.get("username") + "'",
      })
      .toPromise();
  }
  loadDataPeserta(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/peserta", {
        where: "formulir_id='" + this._storageService.get("username") + "'",
      })
      .toPromise();
  }

  loadStatusAwal(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/statusAwal", {})
      .toPromise();
  }

  loadDataProgram(): Promise<any> {
    return this.dataService
      .getRequest<any>("/master/program", {
        where: "id_aktif='Y' ",
      })
      .toPromise();
  }

  loadDataAlasanUndurDiri(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/alasanPengunduranDiri", {
        where: "id > 1",
      })
      .toPromise();
  }

  loadDataAgama(): Promise<any> {
    return this.dataService
      .getRequest<any>("/feeder/referensi/agama", {})
      .toPromise();
  }

  loadDataStatusSipil(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/statusSipil", {})
      .toPromise();
  }

  loadDataJenisKelamin(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/kelamin", {})
      .toPromise();
  }

  loadDataJenjang(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/jenjang", {})
      .toPromise();
  }
  loadDataJasAlmamater(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/jasAlmamater", {
        where: "id_aktif = 'Y'",
      })
      .toPromise();
  }

  // loadDataReferral(peserta_id): Promise<any> {
  //   return this.dataService
  //     .getRequest<any>("/pmb/master/referral", {
  //       where: "id_aktif = 'Y'",
  //     })
  //     .toPromise();
  // }
  loadDataPesertaAsalSekolah(peserta_id): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaMgm", {
        where: "peserta_id = '" + peserta_id + "'",
      })
      .toPromise();
  }
  async loadInitialDataTabAsalSekolah(): Promise<any> {
    try {
      const request = [this.loadDataPesertaAsalSekolah(this.dataPeserta.id)];

      const [dataPesertaAsalSekolah] = await Promise.all(request);

      this.dataPesertaAsalSekolah =
        dataPesertaAsalSekolah.result.length > 0
          ? dataPesertaAsalSekolah.result[0]
          : null;

      console.log("Referral", this.dataPesertaAsalSekolah);

      if (this.dataPesertaAsalSekolah) {
        this.mgm = true;
        this.formDataMgm.get("id").setValue(this.dataPesertaAsalSekolah.id);
        this.formDataMgm
          .get("nama_referral")
          .setValue(this.dataPesertaAsalSekolah.nama_referral);
        this.formDataMgm
          .get("kode_referral")
          .setValue(this.dataPesertaAsalSekolah.kode_referral);
        // this.formDataMgm
        //   .get("nipy_pegawai")
        //   .setValue(this.dataPesertaAsalSekolah.nipy_pegawai);
        // this.formDataMgm
        //   .get("handphone")
        //   .setValue(this.dataPesertaAsalSekolah.handphone_pegawai);
      }
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
    }
  }
  selectAsalSekolah(data) {
    console.log("kode_refferal", data);
    this.formDataMgm.get("kode_referral").setValue(data.kode);
    this.formDataMgm.get("nama_referral").setValue(data.nama);
    // this.formDataMgm.get("nik_pegawai").setValue(data.nik);
    // this.formDataMgm.get("nipy_pegawai").setValue(data.nipy);
    //this.formDataMgm.get("handphone").setValue(data.handphone);
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
      "nama LIKE  '%" + search + "%' or kode LIKE  '%" + search + "%'";
    this[nameLoader] = true;
    return this.dataService
      .getRequest<any>("/pmb/master/memberGetMember", {
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
  onSubmitDataMgm() {
    swal
      .fire({
        title: "Member Get Member",
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
          this.submitRequestMgm();
        }
      });
  }
  submitRequestMgm(): void {
    //this.showSpinner();
    const value = cloneDeep(this.formDataMgm.value);
    this.date = new Date();
    // const kode = value.kode_referral;
    // if (kode == null) {
    //   this.onSubmitDataTidakAda();
    // } else {}
    const payload = {
      peserta_id: this.dataPeserta.id,
      kode_referral: value.kode_referral,
      id: null,
      diubah_oleh: this.dataPeserta.formulir_id,
      waktu_ubah: this.formatDate(this.date, "datetime"),
    };

    let endpoint = "/pmb/pesertaMgm/create";

    if (this.mgm) {
      payload.id = this.dataPesertaAsalSekolah.id;
      endpoint = "/pmb/pesertaMgm/modify";
    }

    this.dataService.getPostRequest<FormResponse>(endpoint, payload).subscribe(
      (success) => {
        if (success.code == "404") {
          swal.fire({
            title: "Data Member Get Member",
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
        } else if (success.code == "204") {
          swal.fire({
            title: "Gagal Menyimpan Data",
            text: "Sepertinya NIK atau nama Civitas yang anda cari tidak ditemukan, silahkan cari ulang",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        } else {
          swal
            .fire({
              title: "Data Member Get Member",
              text: "Berhasil di Simpan.",
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
          title: "Data Member Get Member",
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
  onSubmitDataTidakAda() {
    swal
      .fire({
        title: "Member Get Member",
        text: "Sepertinya NIK atau nama Civitas yang anda cari tidak ditemukan, silahkan cari ulang",
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
          // this.submitRequestMgm();
        }
      });
  }
  onSubmit() {
    swal
      .fire({
        title: "Informasi Dasar",
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
          this.submitRequest();
        }
      });
  }

  submitRequest(): void {
    //this.showSpinner();
    const value = cloneDeep(this.formGroup.value);
    const payload = {
      formulir_id: this.dataPendaftaranPmb.id,
      warga_negara: value.warga_negara,
      id_jenis_formulir: this.dataPendaftaranPmb.kode_jenis_formulir,
      kode_program: value.kode_program,
      kode_prodi: this.dataPendaftaranPmb.kode_prodi_pilihan_1,
      nama: value.nama,
      id_status_awal: value.status_awal,
      kode_keuangan: null,
      id_mahasiswa_pindahan: null,
      id_jurusan_sekolah: value.jurusan_sekolah,
      id: null,
    };

    let endpoint = "/pmb/peserta/create";

    if (this.register) {
      payload.id = this.dataPeserta.id;
      endpoint = "/pmb/peserta/modify";
    }

    this.dataService.getPostRequest<FormResponse>(endpoint, payload).subscribe(
      (success) => {
        if (success.message == "Invalid Parameter") {
          swal.fire({
            title: "Informasi Dasar",
            text: "Informasi Dasar Gagal di Simpan.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        } else {
          swal
            .fire({
              title: "Informasi Dasar",
              text: "Informasi Dasar Berhasil di Simpan.",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-success",
              },
              buttonsStyling: false,
              showCancelButton: false,
              confirmButtonText: "Ok",
            })
            .then((result) => {
              this.manageData(success.result);
            });
        }
      },
      (error) => {
        swal.fire({
          title: "Informasi Dasar",
          text: "Informasi Dasar Gagal di Simpan.",
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
      this.router.navigate(["/pmb/pendaftaran/registrasi-ulang"]);
    }
  }

  onTabChanged(e) {
    if (e.index == 2) {
      this.loadInitialDataTabPilihanProdi();
    } else if (e.index == 3) {
      this.loadInitialDataTabAsalSekolah();
    } else if (e.index == 4) {
      this.loadInitialDataTabOrangTua();
    }
  }

  async loadInitialDataTabPilihanProdi(): Promise<any> {
    try {
      const request = [this.loadDataPesertaPilihanProdi(this.dataPeserta.id)];

      const [listDataPesertaPilihanProdi] = await Promise.all(request);

      // this.inisialisasiDataFormPilihanProdi(listDataPesertaPilihanProdi.result);
    } catch (error) {
      console.log(error);
      //this.showSpinner();
    }
  }

  loadDataPesertaPilihanProdi(id): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaPilihanProdi", {
        where: "peserta_id = '" + id + "'",
      })
      .toPromise();
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

  // inisialisasiDataFormPilihanProdi(data) {
  //   let i = 0;

  //   this.prodi_pilihan.controls.forEach((c) => {
  //     c.setValue({
  //       prodi: data[i].kode_prodi_program,
  //       id: data[i].id,
  //     });
  //     console.log(c.value);
  //     i++;
  //   });
  // }

  onSubmitDataPribadi() {
    swal
      .fire({
        title: "Kelengkapan Data",
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
          this.submitKelengkapanData();
        }
      });
  }
  submitKelengkapanData(): void {
    const value = cloneDeep(this.formGroup.value);

    console.log(value);

    const payload = {
      id: this.dataPeserta.id,
      id_jas_almamater: value.id_jas_almamater,
    };

    this.dataService
      .getPostRequest<FormResponse>("/pmb/peserta/modify", payload)
      .subscribe(
        (success) => {
          if (success.message == "Invalid Parameter") {
            swal.fire({
              title: "kelengkapan Data",
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
                title: "kelengkapan Data",
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
                this.showSpinner();

                this.manageData(success.result);
                this.hideSpinner();
              });
          }
        },
        (error) => {
          swal.fire({
            title: "Data Pribadi",
            text: "Data Pribadi Gagal di Simpan.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        }
      );
  }
  toHome() {
    var home = this._storageService.get("home");
    if (home) {
      this.router.navigate([home]);
    }
  }
  submitDataPribadi(): void {
    const value = cloneDeep(this.formDataMgm.value);

    console.log(value);

    const payload = {
      id: this.dataPeserta.id,
      id_jas_almamater: value.id_jas_almamater,
    };

    this.dataService
      .getPostRequest<FormResponse>("/penduduk/create", payload)
      .subscribe(
        (success) => {
          if (success.message == "Invalid Parameter") {
            swal.fire({
              title: "Data Pribadi",
              text: "Data Pribadi Gagal di Simpan.",
              icon: "error",
              customClass: {
                confirmButton: "btn btn-error",
              },
              buttonsStyling: false,
            });
          } else {
            swal
              .fire({
                title: "Data Pribadi",
                text: "Data Pribadi Berhasil di Simpan.",
                icon: "success",
                customClass: {
                  confirmButton: "btn btn-success",
                },
                buttonsStyling: false,
                showCancelButton: false,
                confirmButtonText: "Ok",
              })
              .then((result) => {
                this.showSpinner();
                this.manageData(success.result);
              });
          }
        },
        (error) => {
          swal.fire({
            title: "Data Pribadi",
            text: "Data Pribadi Gagal di Simpan.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        }
      );

    const peserta = {
      id: this.dataPeserta.id,
      nik: value.nik,
    };

    this.dataService
      .getPostRequest<FormResponse>("/pmb/peserta/modify", peserta)
      .subscribe(
        (success) => {},
        (error) => {}
      );
  }

  onSubmitProdiPilihan() {
    swal
      .fire({
        title: "Pilihan Program Studi",
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
          // this.submitProdiPilihan();
        }
      });
  }

  // submitProdiPilihan(): void {

  //   const value = cloneDeep(this.formProdiPilihan.value);

  //   console.log(value);

  //   const payload = [];

  //   let i = 0;
  //   this.prodi_pilihan.controls.forEach((c) => {
  //     payload.push({
  //       id: c.value.id,
  //       kode_prodi_program: c.value.prodi,
  //     });
  //     i++;
  //   });

  //   for (let i = 0; i < payload.length; i++) {
  //     this.dataService
  //       .getPostRequest<FormResponse>(
  //         "/pmb/pesertaPilihanProdi/modify",
  //         payload[i]
  //       )
  //       .subscribe(
  //         (success) => {
  //           if (i == payload.length - 1) {
  //             if (success.message == "Invalid Parameter") {
  //               swal.fire({
  //                 title: "Pilihan Program Studi",
  //                 text: "Pilihan Program Studi Gagal di Simpan.",
  //                 icon: "error",
  //                 customClass: {
  //                   confirmButton: "btn btn-error",
  //                 },
  //                 buttonsStyling: false,
  //               });
  //             } else {
  //               swal
  //                 .fire({
  //                   title: "Pilihan Program Studi",
  //                   text: "Pilihan Program Studi Berhasil di Simpan.",
  //                   icon: "success",
  //                   customClass: {
  //                     confirmButton: "btn btn-success",
  //                   },
  //                   buttonsStyling: false,
  //                   showCancelButton: false,
  //                   confirmButtonText: "Ok",
  //                 })
  //                 .then((result) => {
  //                   this.manageData(success.result);
  //                 });
  //             }
  //           }
  //         },
  //         (error) => {
  //           swal.fire({
  //             title: "Pilihan Program Studi",
  //             text: "Pilihan Program Studi Gagal di Simpan.",
  //             icon: "error",
  //             customClass: {
  //               confirmButton: "btn btn-error",
  //             },
  //             buttonsStyling: false,
  //           });
  //         }
  //       );
  //   }
  // }

  onSubmitNilaiRapor() {
    swal
      .fire({
        title: "Nilai Rapor",
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
          this.submitNilaiRapor();
        }
      });
  }

  submitNilaiRapor(): void {
    //this.showSpinner();
    const value = cloneDeep(this.formProdiPilihan.value);

    console.log(value);

    const payload = [];

    let i = 0;

    for (let i = 0; i < this.dataPesertaNilai.length; i++) {
      for (let j = 0; j < this.dataPesertaNilai[i].matkul.length; j++) {
        payload.push({
          id: this.dataPesertaNilai[i].matkul[j].id,
          nilai: this.dataPesertaNilai[i].matkul[j].nilai,
        });
      }
    }

    for (let i = 0; i < payload.length; i++) {
      this.dataService
        .getPostRequest<FormResponse>("/pmb/pesertaNilai/modify", payload[i])
        .subscribe(
          (success) => {
            if (i == payload.length - 1) {
              if (success.message == "Invalid Parameter") {
                swal.fire({
                  title: "Nilai Rapor",
                  text: "Nilai Rapor Gagal di Simpan.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else {
                swal
                  .fire({
                    title: "Nilai Rapor",
                    text: "Nilai Rapor Berhasil di Simpan.",
                    icon: "success",
                    customClass: {
                      confirmButton: "btn btn-success",
                    },
                    buttonsStyling: false,
                    showCancelButton: false,
                    confirmButtonText: "Ok",
                  })
                  .then((result) => {
                    this.manageData(success.result);
                  });
              }
            }
          },
          (error) => {
            swal.fire({
              title: "Nilai Rapor",
              text: "Nilai Rapor Gagal di Simpan.",
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

  dataPesertaNilai: any;

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

      console.log(this.dataPesertaNilai);
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

  // async onChangeNik(nik, type): Promise<any> {
  //   if (nik.length >= 16) {
  //     const request = [this.loadDataPenduduk(nik)];

  //     const [dataPenduduk] = await Promise.all(request);

  //     if (dataPenduduk.result.length > 0) {
  //       this.inisialisasiDataPenduduk(dataPenduduk.result[0], type);
  //     }

  //     console.log(dataPenduduk.result);
  //   }
  // }

  // inisialisasiDataPenduduk(data, type) {
  //   if (type == "pribadi") {
  //     if (data.kewarganegaraan == "ID.00.00.0000") {
  //       this.loadDataWilayah("WNI", true, "ID.00.00.0000");
  //       this.formDataMgm.get("warga_negara").setValue("WNI");
  //     } else {
  //       this.formDataMgm.get("warga_negara").setValue("WNA");
  //       this.loadDataWilayah("WNA", true, data.kewarganegaraan);
  //       this.formDataMgm
  //         .get("id_warga_negara")
  //         .setValue(data.kewarganegaraan);
  //     }

  //     this.formDataMgm.get("alamat_tinggal").setValue(data.alamat_jalan);
  //     this.formDataMgm.get("rt").setValue(data.alamat_rt);
  //     this.formDataMgm.get("rw").setValue(data.alamat_rw);
  //   }
  // }

  loadDataPenduduk(nik): Promise<any> {
    return this.dataService
      .getRequest<any>("/penduduk", {
        where: "kode = '" + nik + "'",
      })
      .toPromise();
  }

  loadDataWilayah(wn, set, value): void {
    let where = "tingkat = '1' AND kode ='ID.00.00.0000'";
    if (wn == "WNA") {
      where = "tingkat = '1' AND kode !='ID.00.00.0000'";

      this.formDataMgm.get("id_warga_negara").enable();
    } else {
      this.formDataMgm.get("id_warga_negara").setValue("ID.00.00.0000");
      this.formDataMgm.get("id_warga_negara").disable();
    }

    if (set) {
      where = "tingkat = '1' AND kode ='" + value + "'";
      this.formDataMgm.get("id_warga_negara").setValue(value);
    }

    this.dataService
      .getRequest<any>("/master/wilayah", {
        where: where,
        limit: 242,
      })
      .subscribe(
        (response) => {
          this.listDataWilayah = response.result;
        },
        (error) => {
          this.listDataWilayah = [];
        }
      );
  }

  doFilterTempatLahir(searchValue: string) {
    if (searchValue.length > 2) {
      this.tempatLahirList = this.getDataWilayah(
        3,
        searchValue,
        "isParentSearch"
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

  selectTempatLahir(data) {
    this.formDataMgm.get("kode_tempat_lahir_id").setValue(data.kode);
    this.formDataMgm.get("kode_tempat_lahir").setValue(data.nama_wilayah);
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

  selectWilayah(data) {
    console.log(data);
    this.formDataMgm.get("wilayah_id").setValue(data.kode);
    this.formDataMgm.get("wilayah").setValue(data.nama_wilayah);
  }

  async loadInitialDataTabOrangTua(): Promise<any> {
    try {
      const request = [this.loadDataPesertaKeluarga(this.dataPeserta.id)];

      const [dataPesertaKeluarga] = await Promise.all(request);

      this.dataPesertaKeluarga = dataPesertaKeluarga.result;
    } catch (error) {
      console.log(error);
      //this.showSpinner();
    }
  }

  loadDataPesertaKeluarga(peserta_id): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaKeluarga", {
        where: "peserta_id = '" + peserta_id + "'",
      })
      .toPromise();
  }

  onSubmitDataUndurDiri() {
    swal
      .fire({
        title: "Data Undur Diri",
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
          this.submitRequestUndurDiri();
        }
      });
  }

  submitRequestUndurDiri(): void {
    //this.showSpinner();
    const value = cloneDeep(this.formUndurDiri.value);
    this.date = new Date();
    const payload = {
      peserta_id: this.dataPeserta.id,
      id_alasan_pengunduran_diri: value.id_alasan_pengunduran_diri,
      path_to_dokumen: value.path_to_dokumen,
      keterangan_undur_diri: value.keterangan_undur_diri,
      nomor_rekening: value.nomor_rekening,
      nama_bank: value.nama_bank,
      id: null,
      diubah_oleh: this.dataPeserta.formulir_id,
      waktu_ubah: this.formatDate(this.date, "datetime"),
      id_status_dokumen: value.id_status_dokumen,
    };

    let endpoint = "/pmb/pesertaUndurDiri/create";

    if (this.undur) {
      payload.id = this.dataPesertaUndurDiri.id;
      endpoint = "/pmb/pesertaUndurDiri/modify";
    }

    this.dataService.getPostRequest<FormResponse>(endpoint, payload).subscribe(
      (success) => {
        if (success.message == "Invalid Parameter") {
          swal.fire({
            title: "Data Undur Diri",
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
              title: "Data Undur Diri",
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
          title: "Data Undur Diri",
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

  openFileUploader(): void {
    this.fileUploaderService
      .open({
        title: "Unggah Kelengkapan",
        templateUrl: "",
        templateParams: {
          action: "",
        },
        uploadUrl: "/file/uploadFile",
        uploadParams: {
          path: "undur-diri/" + this.dataPeserta.id,
        },
        downlodButtonText: "Download Template",
        uploadButtonText: "Upload",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result.data) {
          this.file_name = result.data.result.filename;
          this.formUndurDiri
            .get("path_to_dokumen")
            .setValue(result.data.result.newfilename);
          this.formUndurDiri.get("id_status_dokumen").setValue(1);
        }
      });
  }

  cancelUpload() {
    this.dataPesertaUndurDiri.path_to_dokumen = null;
    this.formUndurDiri.get("path_to_dokumen").setValue(null);
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
