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
} from "../../../../shared/types/common";
import { DataService } from "../../../../../app/core/services/data.service";
import { finalize, map, takeUntil } from "rxjs/operators";
import { StorageService } from '../../../../core/services/storage.service';

declare const require: any;
declare const $: any;

@Component({
  selector: "app-verifikasi-peserta",
  templateUrl: "verifikasi-reg-ulang.component.html",
  styleUrls: ["./verifikasi-reg-ulang.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class VerifikasiRegUlangComponent implements OnInit {
  formGroup: FormGroup;
  formDataPribadi: FormGroup;
  formProdiPilihan: FormGroup;
  formPesertaKeluarga: FormGroup;

  agama = [
    { value: "B", viewValue: "Budha" },
    { value: "H", viewValue: "Hindu" },
    { value: "I", viewValue: "Islam" },
    { value: "K", viewValue: "Katholik" },
    { value: "P", viewValue: "Protestan" },
    { value: "L", viewValue: "Lain-lain" },
  ];

  program = [
    { value: "KER", viewValue: "Kerjasama" },
    { value: "NON", viewValue: "Regular Sore" },
    { value: "REG", viewValue: "Regular Pagi" },
    { value: "TES", viewValue: "Program Tes" },
  ];

  jurusan = [
    { value: "SMAIPA", viewValue: "SMA - IPA" },
    { value: "SMAIPS", viewValue: "SMA - IPS" },
    { value: "SMKKES", viewValue: "SMK - Kesehatan" },
  ];

  pilihan1 = [
    { value: "110", viewValue: "110 - Kedokteran" },
    { value: "111", viewValue: "111 - Pendidikan Dokter Gigi" },
    { value: "113", viewValue: "113 - Profesi Dokter Gigi" },
    { value: "140", viewValue: "140 - Teknik Informatika" },
  ];

  pilihan2 = [
    { value: "110", viewValue: "110 - Kedokteran" },
    { value: "111", viewValue: "111 - Pendidikan Dokter Gigi" },
    { value: "113", viewValue: "113 - Profesi Dokter Gigi" },
    { value: "140", viewValue: "140 - Teknik Informatika" },
  ];

  pilihan3 = [
    { value: "110", viewValue: "110 - Kedokteran" },
    { value: "111", viewValue: "111 - Pendidikan Dokter Gigi" },
    { value: "113", viewValue: "113 - Profesi Dokter Gigi" },
    { value: "140", viewValue: "140 - Teknik Informatika" },
  ];

  pendidikan_ortu = [
    { value: "1", viewValue: "1 - Tidak Tamat SD" },
    { value: "2", viewValue: "2 - Tamat SD" },
    { value: "3", viewValue: "3 - Tamat SMP" },
    { value: "4", viewValue: "4 - Tamat SMTA" },
    { value: "5", viewValue: "5 - Diploma" },
    { value: "6", viewValue: "6 - Sarjana Muda" },
    { value: "7", viewValue: "7 - Sarjana" },
    { value: "8", viewValue: "8 - Pasca Sarjana" },
    { value: "9", viewValue: "9 - Doktor" },
  ];

  pekerjaan_ortu = [
    { value: "0", viewValue: "0 - Belum diisi" },
    { value: "1", viewValue: "1 - Pegawai Negeri" },
    { value: "2", viewValue: "2 - ABRI" },
    { value: "3", viewValue: "3 - Pegawai Swasta" },
    { value: "4", viewValue: "4 - Usaha Sendiri" },
    { value: "5", viewValue: "5 - Tidak Bekerja" },
    { value: "6", viewValue: "6 - Pensiun" },
    { value: "7", viewValue: "7 - Lain-lain" },
    { value: "8", viewValue: "8 - Nelayan" },
    { value: "9", viewValue: "9 - Petani" },
    { value: "10", viewValue: "10 - Peternak" },
    { value: "11", viewValue: "11 - Pedagang Kecil" },
    { value: "12", viewValue: "12 - Pedagang Besar" },
    { value: "13", viewValue: "13 - Wiraswasta" },
    { value: "14", viewValue: "14 - Buruh" },
    { value: "15", viewValue: "15 - Sudah Meninggal" },
  ];

  status_ortu = [
    { value: "1", viewValue: "1 - Masih Hidup" },
    { value: "2", viewValue: "2 - Sudah Meninggal" },
  ];

  formulir = [
    { value: "1", viewValue: "IPA - Rp.300.0000" },
    { value: "2", viewValue: "IPS - Rp.300.0000" },
  ];

  simpleSlider = 40;
  doubleSlider = [20, 60];

  regularItems = ["Pizza", "Pasta", "Parmesan"];
  touch: boolean;

  selectedValue: string;
  currentCity: string[];

  selectTheme = "primary";
  cities = [
    { value: "ipa-0", viewValue: "IPA - Rp.300.000" },
    { value: "ips-1", viewValue: "IPS - Rp.300.000" },
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
  register = false;
  kode_tempat_lahir: any;
  tempatLahirList;
  wilayahList;

  isParentSearch: boolean = false;
  isParentSearchWilayah: boolean = false;

  dataPesertaKeluarga: any;

  @ViewChild("iframe") iframe: ElementRef;

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _storageService: StorageService
  ) { }
  ngOnInit() {
    this.loadInitialData();

    this.formGroup = this.formBuilder.group({
      periode: [{ value: "", disabled: true }, Validators.required],
      no_pendaftaran: [{ value: "", disabled: true }, Validators.required],
      no_test: [{ value: "", disabled: true }],
      nama: ["", Validators.required],
      jenis_formulir: [{ value: "", disabled: true }, Validators.required],
      prodi_1: [{ value: "", disabled: true }, Validators.required],
      kode_program: ["REG", Validators.required],
      status_awal: ["B", Validators.required],
      jurusan_sekolah: ["", Validators.required],
    });

    this.formDataPribadi = this.formBuilder.group({
      nik: ["", Validators.minLength(16)],
      nama: ["", Validators.required],
      warga_negara: [""],
      id_warga_negara: ["", Validators.required],
      agama: ["", Validators.required],
      status_sipil: ["", Validators.required],
      alamat_tinggal: ["", Validators.required],
      kode_tempat_lahir: ["", Validators.required],
      kode_tempat_lahir_id: ["", Validators.required],
      tanggal_lahir: ["", Validators.required],
      wilayah: ["", Validators.required],
      wilayah_id: ["", Validators.required],
      rt: ["", Validators.required],
      rw: ["", Validators.required],
      kode_pos: ["", Validators.required],
      provinsi: ["", Validators.required],
      negara: ["", Validators.required],
      telepon: ["", Validators.required],
      no_hp: ["", Validators.required],
      email: ["", Validators.required],
      id_jenjang: ["", Validators.required],
      jenis_kelamin: ["", Validators.required],
    });

    this.formPesertaKeluarga = this.formBuilder.group({
      nik_ayah: ["", Validators.minLength(16)],
      nama_ayah: ["", Validators.required],
      kode_tempat_lahir_ayah: ["", Validators.required],
      tanggal_lahir_ayah: ["", Validators.required],
      agama_ayah: ["", Validators.required],
      id_jenjang_ayah: ["", Validators.required],
      pekerjaan_ayah: ["", Validators.required],
      status_ayah: ["", Validators.required],
      nik_ibu: ["", Validators.minLength(16)],
      nama_ibu: ["", Validators.required],
      kode_tempat_lahir_ibu: ["", Validators.required],
      tanggal_lahir_ibu: ["", Validators.required],
      agama_ibu: ["", Validators.required],
      id_jenjang_ibu: ["", Validators.required],
      pekerjaan_ibu: ["", Validators.required],
      status_ibu: ["", Validators.required],
    });

    this.formProdiPilihan = this.formBuilder.group({
      id: ["", Validators.required],
      prodi_pilihan: new FormArray([]),
    });

    // console.log("testing");
    var user_token = this._storageService.get("user_token");

    if (user_token) {
      this.srcdoc = this.sanitizer.bypassSecurityTrustResourceUrl(
        "https://pmb.yarsi.ac.id/prototipe/pmb/frame_modul.php?user_token=" +
          user_token +
          "&modul=q_peserta"
      );
    } else {
      console.log("user_token");
    }
  }
  myFunc(val: any) {
    // code here
  }
  user = this._storageService.get("username");
  dataPendaftaranPmb: any;
  dataPeserta: any;

  async loadInitialData(): Promise<any> {
    try {
      const request = [
        this.loadDataPendaftaranPmb(),
        this.loadDataPeserta(),
        this.loadDataProgram(),
        this.loadStatusAwal(),
        this.loadDataJurusanSekolah(),
        this.loadDataAgama(),
        this.loadDataStatusSipil(),
        this.loadDataJenisKelamin(),
        this.loadDataJenjang(),
      ];

      const [
        dataPendaftaran,
        dataPeserta,
        listDataProgram,
        listDataStatusAwal,
        listDataJurusanSekolah,
        listDataAgama,
        listDataStatusSipil,
        listDataJenisKelamin,
        listDataJenjang,
      ] = await Promise.all(request);
      this.dataPendaftaranPmb = dataPendaftaran.result[0];

      this.inisialisasiDataForm(this.dataPendaftaranPmb);

      this.dataPeserta =
        dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;

      if (this.dataPeserta) {
        this.register = true;
        this.inisialisasiDataFormPeserta(this.dataPeserta);
      }

      if (this.dataPeserta.nik) {
        this.register = true;
        this.onChangeNik(this.dataPeserta.nik, "pribadi");
      }

      this.listDataProgram = listDataProgram.result;
      this.listDataStatusAwal = listDataStatusAwal.result;
      this.listDataJurusanSekolah = listDataJurusanSekolah.result;
      this.listDataAgama = listDataAgama.result;
      this.listDataStatusSipil = listDataStatusSipil.result;
      this.listDataJenisKelamin = listDataJenisKelamin.result;
      this.listDataJenjang = listDataJenjang.result;

      this.isDoneMakeForm = true;
    } catch (error) {
      console.log(error);
      //this.showSpinner();
    }
  }

  inisialisasiDataForm(data) {
    this.formGroup
      .get("periode")
      .setValue(data.kode_gelombang + "-" + data.gelombang);
    this.formGroup.get("no_pendaftaran").setValue(data.id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("jenis_formulir").setValue(data.jenis_formulir);
    this.formGroup.get("prodi_1").setValue(data.prodi_pilihan_1);

    this.formDataPribadi.get("nama").setValue(data.nama);
  }

  get prodi_pilihan(): FormArray {
    return this.formProdiPilihan.get("prodi_pilihan") as FormArray;
  }

  async inisialisasiDataFormPeserta(data) {
    this.formProdiPilihan.get("id").setValue(data.id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("no_test").setValue(data.id);
    this.formDataPribadi.get("nik").setValue(data.nik);
    this.formGroup.get("jurusan_sekolah").setValue(data.id_jurusan_sekolah);
    this.formDataPribadi.get("nama").setValue(data.nama);

    for (let i = 0; i < data.jumlah_pilihan; i++) {
      this.prodi_pilihan.push(
        this.formBuilder.group({
          prodi: ["", Validators.required],
          id: ["", Validators.required],
        })
      );
      this.listDataPilihanProdi.push(null);
    }

    let i = 0;
    for (const list of this.listDataPilihanProdi) {
      let request = [
        this.loadDataPilihanProdi(
          this.dataPendaftaranPmb.kode_jenis_formulir,
          i
        ),
      ];

      let [listDataPilihanProdi] = await Promise.all(request);

      this.listDataPilihanProdi[i] = listDataPilihanProdi.result;

      i++;
    }
  }

  loadDataPendaftaranPmb(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/formulirOnline", {
        where: "id='" + this._storageService.get("username") + "'",
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

  loadDataJurusanSekolah(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/jurusanSekolah", {})
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
      // this.router.navigate(["/pmb/dashboard/"]);
    }
  }

  onTabChanged(e) {
    if (e.index == 2) {
      this.loadInitialDataTabPilihanProdi();
    } else if (e.index == 3) {
      this.loadInitialDataTabRapor();
    } else if (e.index == 4) {
      this.loadInitialDataTabOrangTua();
    }
  }

  async loadInitialDataTabPilihanProdi(): Promise<any> {
    try {
      const request = [this.loadDataPesertaPilihanProdi(this.dataPeserta.id)];

      const [listDataPesertaPilihanProdi] = await Promise.all(request);

      this.inisialisasiDataFormPilihanProdi(listDataPesertaPilihanProdi.result);
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

  inisialisasiDataFormPilihanProdi(data) {
    let i = 0;

    this.prodi_pilihan.controls.forEach((c) => {
      c.setValue({
        prodi: data[i].kode_prodi_program,
        id: data[i].id,
      });
      console.log(c.value);
      i++;
    });
  }

  onSubmitDataPribadi() {
    swal
      .fire({
        title: "Data Pribadi",
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
          this.submitDataPribadi();
        }
      });
  }

  submitDataPribadi(): void {
    //this.showSpinner();
    const value = cloneDeep(this.formDataPribadi.value);

    console.log(value);

    const payload = {
      kode: value.nik,
      kode_tempat_lahir: value.kode_tempat_lahir_id,
      tanggal_lahir: this.formatDate(value.tanggal_lahir),
      nama: value.nama,
      nama_ibu_kandung: null,
      id_agama: value.agama,
      id_kelamin: value.jenis_kelamin,
      id_status_sipil: value.status_sipil,
      id_jenjang: value.id_jenjang,
      id_pekerjaan: null,
      kewarganegaraan: value.id_warga_negara,
      telepon: value.telepon,
      handphone: value.no_hp,
      email: value.email,
      alamat_jalan: value.alamat_tinggal,
      alamat_rt: value.rt,
      alamat_rw: value.rw,
      nama_dusun: null,
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
          this.submitProdiPilihan();
        }
      });
  }

  submitProdiPilihan(): void {
    //this.showSpinner();
    const value = cloneDeep(this.formProdiPilihan.value);

    console.log(value);

    const payload = [];

    let i = 0;
    this.prodi_pilihan.controls.forEach((c) => {
      payload.push({
        id: c.value.id,
        kode_prodi_program: c.value.prodi,
      });
      i++;
    });

    for (let i = 0; i < payload.length; i++) {
      this.dataService
        .getPostRequest<FormResponse>(
          "/pmb/pesertaPilihanProdi/modify",
          payload[i]
        )
        .subscribe(
          (success) => {
            if (i == payload.length - 1) {
              if (success.message == "Invalid Parameter") {
                swal.fire({
                  title: "Pilihan Program Studi",
                  text: "Pilihan Program Studi Gagal di Simpan.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else {
                swal
                  .fire({
                    title: "Pilihan Program Studi",
                    text: "Pilihan Program Studi Berhasil di Simpan.",
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
              title: "Pilihan Program Studi",
              text: "Pilihan Program Studi Gagal di Simpan.",
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

  async onChangeNik(nik, type): Promise<any> {
    if (nik.length >= 16) {
      const request = [this.loadDataPenduduk(nik)];

      const [dataPenduduk] = await Promise.all(request);

      if (dataPenduduk.result.length > 0) {
        this.inisialisasiDataPenduduk(dataPenduduk.result[0], type);
      }

      console.log(dataPenduduk.result);
    }
  }

  inisialisasiDataPenduduk(data, type) {
    if (type == "pribadi") {
      if (data.kewarganegaraan == "ID.00.00.0000") {
        this.loadDataWilayah("WNI", true, "ID.00.00.0000");
        this.formDataPribadi.get("warga_negara").setValue("WNI");
      } else {
        this.formDataPribadi.get("warga_negara").setValue("WNA");
        this.loadDataWilayah("WNA", true, data.kewarganegaraan);
        this.formDataPribadi
          .get("id_warga_negara")
          .setValue(data.kewarganegaraan);
      }

      this.formDataPribadi.get("alamat_tinggal").setValue(data.alamat_jalan);
      this.formDataPribadi.get("rt").setValue(data.alamat_rt);
      this.formDataPribadi.get("rw").setValue(data.alamat_rw);
    }
  }

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

      this.formDataPribadi.get("id_warga_negara").enable();
    } else {
      this.formDataPribadi.get("id_warga_negara").setValue("ID.00.00.0000");
      this.formDataPribadi.get("id_warga_negara").disable();
    }

    if (set) {
      where = "tingkat = '1' AND kode ='" + value + "'";
      this.formDataPribadi.get("id_warga_negara").setValue(value);
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
    this.formDataPribadi.get("kode_tempat_lahir_id").setValue(data.kode);
    this.formDataPribadi.get("kode_tempat_lahir").setValue(data.nama_wilayah);
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
    this.formDataPribadi.get("wilayah_id").setValue(data.kode);
    this.formDataPribadi.get("wilayah").setValue(data.nama_wilayah);
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

  onSubmitDataPesertaKeluarga() {
    swal
      .fire({
        title: "Data Orang Tua",
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
          this.submitDataPesertaKeluarga();
        }
      });
  }

  submitDataPesertaKeluarga(): void {
    //this.showSpinner();
    const value = cloneDeep(this.formDataPribadi.value);

    console.log(value);

    const payload = {
      kode: value.nik,
      kode_tempat_lahir: value.kode_tempat_lahir_id,
      tanggal_lahir: this.formatDate(value.tanggal_lahir),
      nama: value.nama,
      nama_ibu_kandung: null,
      id_agama: value.agama,
      id_kelamin: value.jenis_kelamin,
      id_status_sipil: value.status_sipil,
      id_jenjang: value.id_jenjang,
      id_pekerjaan: null,
      kewarganegaraan: value.id_warga_negara,
      telepon: value.telepon,
      handphone: value.no_hp,
      email: value.email,
      alamat_jalan: value.alamat_tinggal,
      alamat_rt: value.rt,
      alamat_rw: value.rw,
      nama_dusun: null,
    };

    this.dataService
      .getPostRequest<FormResponse>("/penduduk/create", payload)
      .subscribe(
        (success) => {
          if (success.message == "Invalid Parameter") {
            swal.fire({
              title: "Data Orang Tua",
              text: "Data Orang Tua Gagal di Simpan.",
              icon: "error",
              customClass: {
                confirmButton: "btn btn-error",
              },
              buttonsStyling: false,
            });
          } else {
            swal
              .fire({
                title: "Data Orang Tua",
                text: "Data Orang Tua Berhasil di Simpan.",
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
            title: "Data Orang Tua",
            text: "Data Orang Tua Gagal di Simpan.",
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
}
