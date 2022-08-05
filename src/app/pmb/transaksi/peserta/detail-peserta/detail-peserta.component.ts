import { Router, Route, ActivatedRoute } from "@angular/router";
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
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { StorageService } from "../../../../core/services/storage.service";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

declare const require: any;

declare const $: any;

@Component({
  selector: "app-detail-peserta",
  templateUrl: "detail-peserta.component.html",
  styleUrls: ["./detail-peserta.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class DetailPesertaComponent implements OnInit {
  formGroup: FormGroup;
  formDataPribadi: FormGroup;
  formProdiPilihan: FormGroup;
  formPesertaKeluarga: FormGroup;
  formAsalSekolah: FormGroup;
  formPerguruanTinggi: FormGroup;

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
    { value: "0", viewValue: "Belum diisi" },
    { value: "1", viewValue: "Pegawai Negeri" },
    { value: "2", viewValue: "ABRI" },
    { value: "3", viewValue: "Pegawai Swasta" },
    { value: "4", viewValue: "Usaha Sendiri" },
    { value: "5", viewValue: "Tidak Bekerja" },
    { value: "6", viewValue: "Pensiun" },
    { value: "7", viewValue: "Lain-lain" },
    { value: "8", viewValue: "Nelayan" },
    { value: "9", viewValue: "Petani" },
    { value: "10", viewValue: "Peternak" },
    { value: "11", viewValue: "Pedagang Kecil" },
    { value: "12", viewValue: "Pedagang Besar" },
    { value: "13", viewValue: "Wiraswasta" },
    { value: "14", viewValue: "Buruh" },
    { value: "15", viewValue: "Sudah Meninggal" },
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
  asalSekolahList;
  AsalPerguruanTinggiList;

  isParentSearch: boolean = false;
  isParentSearchWilayah: boolean = false;
  isAsalSekolahSearch: boolean = false;
  isAsalPerguruanTinggiSearch: boolean = false;

  spinnerStatus = "Mohon Tunggu...";
  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";

  dataPesertaKeluarga: any;
  dataPesertaAsalSekolah: any;
  dataPesertaAsalPerguruanTinggi: any;
  @ViewChild("iframe") iframe: ElementRef;
  maxDateTanggalLahir: any;
  isScreenSmall: boolean;
  params: any;
  constructor(
    public breakpointObserver: BreakpointObserver,
    private _activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
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
    // console.log("WAL", this.params);
    this.loadInitialData();

    this.formGroup = this.formBuilder.group({
      periode: [{ value: "", disabled: true }],
      no_pendaftaran: [{ value: "", disabled: true }],
      no_test: [{ value: "", disabled: true }],
      nama: [{ value: "", disabled: true }],
      jenis_formulir: [{ value: "", disabled: true }],
      prodi_1: [{ value: "", disabled: true }],
      prodi: [{ value: "", disabled: true }],
      kode_program: [{ value: "", disabled: true }],
      status_awal: ["B", { value: "", disabled: true }],
      jurusan_sekolah: [{ value: "", disabled: true }],
    });

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.maxDateTanggalLahir = new Date(year - 15, month, day);

    this.formDataPribadi = this.formBuilder.group({
      nik: [
        "",
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      nik_cek: ["", [Validators.required]],
      nama: ["", Validators.required],
      warga_negara: [""],
      id_warga_negara: ["", Validators.required],
      agama: ["", Validators.required],
      status_sipil: ["", Validators.required],
      alamat_tinggal: ["", Validators.required],
      kode_tempat_lahir: ["", Validators.required],
      kode_tempat_lahir_id: ["", Validators.required],
      tanggal_lahir: [this.maxDateTanggalLahir, Validators.required],
      wilayah: ["", Validators.required],
      wilayah_id: ["", Validators.required],
      rt: ["", Validators.required],
      rw: ["", Validators.required],
      kode_pos: ["", Validators.required],
      telepon: ["", Validators.required],
      no_hp: ["", Validators.required],
      email: ["", Validators.required],
      id_jenjang_pendidikan: ["", Validators.required],
      jenis_kelamin: ["", Validators.required],
      action: ["create", Validators.required],
    });

    this.formPesertaKeluarga = this.formBuilder.group({
      type_action_ayah: [""],
      nik_ayah: [""],
      status_nik_ayah: [""],
      nama_ayah: [""],
      kode_tempat_lahir_ayah: [""],
      tanggal_lahir_ayah: [""],
      agama_ayah: [""],
      id_jenjang_ayah: [""],
      pekerjaan_ayah: [""],
      // status_ayah: ["", Validators.required],
      type_action_ibu: [""],
      nik_ibu: [""],
      status_nik_ibu: [""],
      nama_ibu: [""],
      kode_tempat_lahir_ibu: [""],
      tanggal_lahir_ibu: [""],
      agama_ibu: [""],
      id_jenjang_ibu: [""],
      pekerjaan_ibu: [""],
      // status_ibu: ["", Validators.required],

      alamat_tinggal: [""],
      wilayah: [""],
      wilayah_id: [""],
      rt: [""],
      rw: [""],
      kode_pos: [""],
      telepon: [""],
      no_hp: [""],
      email: [""],
    });

    this.formAsalSekolah = this.formBuilder.group({
      kode_sekolah: [{ value: "", disabled: true }, Validators.required],
      nama_sekolah: ["", Validators.required],
      alamat_sekolah: [""],
      id: [""],
    });

    this.formPerguruanTinggi = this.formBuilder.group({
      kode_perguruan_tinggi: [
        { value: "", disabled: true },
        ,
        Validators.required,
      ],
      nama_perguruan_tinggi: ["", Validators.required],
      alamat_perguruan_tinggi: [""],
      id: [""],
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
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";

      this.showSpinner();
      const request = [
        this.loadDataPendaftaranPmb(),
        this.loadDataPeserta(),
        this.loadDataProgram(),
        this.loadStatusAwal(),
        // this.loadJurusanSekolah(),
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
        // listDataJurusanSekolah,
        listDataAgama,
        listDataStatusSipil,
        listDataJenisKelamin,
        listDataJenjang,
      ] = await Promise.all(request);

      this.dataPendaftaranPmb =
        dataPendaftaran.result.length > 0 ? dataPendaftaran.result[0] : false;

      if (this.dataPendaftaranPmb) {
        this.inisialisasiDataForm(this.dataPendaftaranPmb);
      }

      this.dataPeserta =
        dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;

      if (this.dataPeserta) {
        this.register = true;
        this.inisialisasiDataFormPeserta(this.dataPeserta);

        if (this.dataPeserta.nik) {
          this.register = true;
          this.onChangeNik(this.dataPeserta.nik, "pribadi");
        }
      }

      this.listDataProgram = listDataProgram.result;
      this.listDataStatusAwal = listDataStatusAwal.result;
      // this.listDataJurusanSekolah = listDataJurusanSekolah.result;
      this.listDataAgama = listDataAgama.result;
      this.listDataStatusSipil = listDataStatusSipil.result;
      this.listDataJenisKelamin = listDataJenisKelamin.result;
      this.listDataJenjang = listDataJenjang.result;

      this.isDoneMakeForm = true;
      this.hideSpinner();
      this.helloShow();
    } catch (error) {
      this.hideSpinner();
      console.log(error);
    }
  }

  inisialisasiDataForm(data) {
    console.log(data);
    this.formGroup
      .get("periode")
      .setValue(data.kode_gelombang + "-" + data.gelombang);
    this.formGroup.get("no_pendaftaran").setValue(data.id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("jenis_formulir").setValue(data.jenis_formulir);
    this.formGroup.get("prodi_1").setValue(data.prodi_pilihan_1);
    this.loadJurusanSekolah(data.kode_jenis_formulir);
    this.formDataPribadi.get("nama").setValue(data.nama);
    this.formGroup.get("jurusan_sekolah").setValue(data.id_jurusan_sekolah);
    this.formGroup.get("kode_program").setValue(data.kode_program);
  }

  get prodi_pilihan(): FormArray {
    return this.formProdiPilihan.get("prodi_pilihan") as FormArray;
  }

  async inisialisasiDataFormPeserta(data) {
    this.formProdiPilihan.get("id").setValue(data.id);
    this.formGroup.get("kode_program").setValue(data.kode_program);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("no_test").setValue(data.id);
    this.formGroup.get("prodi").setValue(data.prodi);
    this.formGroup.get("status_awal").setValue(data.id_status_awal);

    console.log(data);

    this.formDataPribadi.get("nama").setValue(data.nama);
    this.formDataPribadi.get("nik").setValue(data.nik);
    this.formDataPribadi.get("id_warga_negara").setValue(data.warga_negara);
    this.formDataPribadi.get("agama").setValue(data.id_agama);
    this.formDataPribadi.get("status_sipil").setValue(data.id_status_sipil);
    this.formDataPribadi
      .get("id_jenjang_pendidikan")
      .setValue(data.id_jenjang_pendidikan);
    this.formDataPribadi.get("jenis_kelamin").setValue(data.id_kelamin);
    this.formDataPribadi
      .get("kode_tempat_lahir_id")
      .setValue(data.kode_tempat_lahir);
    this.formDataPribadi.get("kode_tempat_lahir").setValue(data.tempat_lahir);
    this.formDataPribadi.get("tanggal_lahir").setValue(data.tanggal_lahir);
    this.formDataPribadi.get("alamat_tinggal").setValue(data.alamat_jalan);
    this.formDataPribadi.get("rt").setValue(data.rt);
    this.formDataPribadi.get("rw").setValue(data.rw);
    this.formDataPribadi.get("wilayah_id").setValue(data.kode_wilayah);
    this.formDataPribadi.get("wilayah").setValue(data.nama_wilayah);
    this.formDataPribadi.get("kode_pos").setValue(data.kode_pos);
    this.formDataPribadi.get("telepon").setValue(data.telepon);
    this.formDataPribadi.get("no_hp").setValue(data.handphone);
    this.formDataPribadi.get("email").setValue(data.email);

    for (let i = 0; i < data.jumlah_pilihan; i++) {
      if (i <= 0) {
        this.prodi_pilihan.push(
          this.formBuilder.group({
            prodi: [{ value: "", disabled: true }, Validators.required],
            id: ["", Validators.required],
          })
        );
      } else if (i >= 1) {
        if (this.dataPeserta.id_status_seleksi > 0) {
          this.prodi_pilihan.push(
            this.formBuilder.group({
              prodi: [{ value: "", disabled: true }, Validators.required],
              id: ["", Validators.required],
            })
          );
        } else {
          this.prodi_pilihan.push(
            this.formBuilder.group({
              prodi: ["", Validators.required],
              id: ["", Validators.required],
            })
          );
        }
      }

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
      .getRequest<any>("/pmb/formulir", {
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

  loadJurusanSekolah(jenis_formulir): void {
    this.dataService
      .getRequest<any>("/pmb/master/jenisFormulirJurusan", {
        where: "kode_jenis_formulir='" + jenis_formulir + "'",
      })
      .subscribe(
        (response) => {
          this.listDataJurusanSekolah = response.result;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loadDataAgama(): Promise<any> {
    return this.dataService.getRequest<any>("/master/agama", {}).toPromise();
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
      .getRequest<any>("/referensi/jenjangPendidikan", {})
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
    const value = cloneDeep(this.formGroup.getRawValue());
    const payload = {
      formulir_id: this.dataPendaftaranPmb.hash_id,
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
        if (success.code == "500") {
          swal.fire({
            title: "Informasi Dasar",
            text: "Gagal Menyimpan Data.",
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
              html:
                "Data Berhasil di Simpan. " +
                "<p>Perubahan data <b>akan terproses setelah 10 detik</b>, mohon ditunggu dan coba refresh halaman.</p> ",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-success",
              },
              buttonsStyling: false,
              showCancelButton: false,
              confirmButtonText: "Ok",
            })
            .then((result) => {
              this.loadInitialData();
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
    if (e.index == 0 || e.index == 1) {
    } else if (e.index == 2) {
      this.loadInitialDataTabPilihanProdi();
    } else if (e.index == 3) {
      this.loadInitialDataTabRapor();
    } else if (e.index == 4) {
      this.loadInitialDataTabOrangTua();
    } else if (e.index == 5) {
      this.loadInitialDataTabAsalSekolah();
    } else if (e.index == 6) {
      this.loadInitialDataTabAsalPerguruanTinggi();
    }
  }

  async loadInitialDataTabPilihanProdi(): Promise<any> {
    try {
      const request = [this.loadDataPesertaPilihanProdi(this.dataPeserta.id)];

      const [listDataPesertaPilihanProdi] = await Promise.all(request);

      this.inisialisasiDataFormPilihanProdi(listDataPesertaPilihanProdi.result);
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
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
    const value = cloneDeep(this.formDataPribadi.getRawValue());

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
      id_jenjang_pendidikan: value.id_jenjang_pendidikan,
      id_pekerjaan: null,
      kewarganegaraan: value.id_warga_negara,
      telepon: value.telepon,
      handphone: value.no_hp,
      email: value.email,
      alamat_jalan: value.alamat_tinggal,
      alamat_rt: value.rt,
      alamat_rw: value.rw,
      kode_pos: value.kode_pos,
      kode_wilayah: value.wilayah_id,
      nama_dusun: null,
    };

    this.dataService
      .getPostRequest<FormResponse>("/penduduk/" + value.action, payload)
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
    const value = cloneDeep(this.formProdiPilihan.getRawValue());

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
    const value = cloneDeep(this.formProdiPilihan.getRawValue());

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

  onSubmitDataAsalSekolah() {
    swal
      .fire({
        title: "Informasi Asal Sekolah",
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
          this.submitDataAsalSekolah();
        }
      });
  }

  submitDataAsalSekolah(): void {
    const value = cloneDeep(this.formAsalSekolah.getRawValue());

    console.log(value);

    const payload = {
      kode_sekolah: value.kode_sekolah,
      id: value.id,
    };

    this.dataService
      .getPostRequest<FormResponse>("/pmb/pesertaAsalSekolah/modify", payload)
      .subscribe(
        (success) => {
          if (success.message == "Invalid Parameter") {
            swal.fire({
              title: "Data Informasi Asal Sekolah",
              text: "Data Informasi Asal Sekolah Gagal di Simpan.",
              icon: "error",
              customClass: {
                confirmButton: "btn btn-error",
              },
              buttonsStyling: false,
            });
          } else {
            swal
              .fire({
                title: "Data Informasi Asal Sekolah",
                text: "Data Informasi Asal Sekolah Berhasil di Simpan.",
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
            title: "Data Informasi Asal Sekolah",
            text: "Data Informasi Asal Sekolah Gagal di Simpan.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        }
      );
  }

  onSubmitDataPerguruanTinggi() {
    swal
      .fire({
        title: "Informasi Perguruan Tinggi",
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
          this.submitDataPerguruanTinggi();
        }
      });
  }

  submitDataPerguruanTinggi(): void {
    const value = cloneDeep(this.formPerguruanTinggi.getRawValue());

    console.log(value);

    const payload = {
      kode_perguruan_tinggi: value.kode_perguruan_tinggi,
      id: value.id,
    };

    this.dataService
      .getPostRequest<FormResponse>(
        "/pmb/pesertaAsalPerguruanTinggi/modify",
        payload
      )
      .subscribe(
        (success) => {
          if (success.message == "Invalid Parameter") {
            swal.fire({
              title: "Data Informasi Perguruan Tinggi",
              text: "Data Informasi Perguruan Tinggi Gagal di Simpan.",
              icon: "error",
              customClass: {
                confirmButton: "btn btn-error",
              },
              buttonsStyling: false,
            });
          } else {
            swal
              .fire({
                title: "Data Informasi Perguruan Tinggi",
                text: "Data Informasi Perguruan Tinggi Berhasil di Simpan.",
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
            title: "Data Informasi Perguruan Tinggi",
            text: "Data Informasi Perguruan Tinggi Gagal di Simpan.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        }
      );
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
      this.hideSpinner();
      console.log(this.dataPesertaNilai);
    } catch (error) {
      console.log(error);
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
    console.log("qw");
    if (nik.length >= 1) {
      if (type == "ayah") {
        this.formPesertaKeluarga.controls["nik_ayah"].setValidators([
          Validators.required,
          Validators.minLength(13),
        ]);
        // this.formPesertaKeluarga.controls["status_nik_ayah"].setValidators([
        //   Validators.required,
        // ]);
        this.formPesertaKeluarga.controls["nama_ayah"].setValidators([
          Validators.required,
        ]);
        this.formPesertaKeluarga.controls["agama_ayah"].setValidators([
          Validators.required,
        ]);
        this.formPesertaKeluarga.controls["id_jenjang_ayah"].setValidators([
          Validators.required,
        ]);
        this.formPesertaKeluarga.controls["pekerjaan_ayah"].setValidators([
          Validators.required,
        ]);
      } else if (type == "ibu") {
        this.formPesertaKeluarga
          .get("nik_ibu")
          .setValidators([Validators.required, Validators.minLength(13)]);
        // this.formPesertaKeluarga
        //   .get("status_nik_ibu")
        //   .setValidators([Validators.required]);
        this.formPesertaKeluarga
          .get("nama_ibu")
          .setValidators([Validators.required]);
        this.formPesertaKeluarga
          .get("agama_ibu")
          .setValidators([Validators.required]);
        this.formPesertaKeluarga
          .get("id_jenjang_ibu")
          .setValidators([Validators.required]);
        this.formPesertaKeluarga
          .get("pekerjaan_ibu")
          .setValidators([Validators.required]);

        this.formPesertaKeluarga.controls["nik_ibu"].updateValueAndValidity();
        // this.formPesertaKeluarga.controls[
        //   "status_nik_ibu"
        // ].updateValueAndValidity();
        this.formPesertaKeluarga.controls["nama_ibu"].updateValueAndValidity();
        this.formPesertaKeluarga.controls["agama_ibu"].updateValueAndValidity();
        this.formPesertaKeluarga.controls[
          "id_jenjang_ibu"
        ].updateValueAndValidity();
        this.formPesertaKeluarga.controls[
          "pekerjaan_ibu"
        ].updateValueAndValidity();
      }
    } else {
      if (type == "ayah") {
        this.formPesertaKeluarga.get("nik_ayah").clearValidators();
        this.formPesertaKeluarga.get("status_nik_ayah").clearValidators();
        this.formPesertaKeluarga.get("nama_ayah").clearValidators();
        this.formPesertaKeluarga.get("agama_ayah").clearValidators();
        this.formPesertaKeluarga.get("id_jenjang_ayah").clearValidators();
        this.formPesertaKeluarga.get("pekerjaan_ayah").clearValidators();
      } else if (type == "ibu") {
        this.formPesertaKeluarga.get("nik_ibu").clearValidators();
        this.formPesertaKeluarga.get("status_nik_ibu").clearValidators();
        this.formPesertaKeluarga.get("nama_ibu").clearValidators();
        this.formPesertaKeluarga.get("agama_ibu").clearValidators();
        this.formPesertaKeluarga.get("id_jenjang_ibu").clearValidators();
        this.formPesertaKeluarga.get("pekerjaan_ibu").clearValidators();
      }
    }

    if (type == "ayah") {
      this.formPesertaKeluarga.controls["nik_ayah"].updateValueAndValidity();
      this.formPesertaKeluarga.controls[
        "status_nik_ayah"
      ].updateValueAndValidity();
      this.formPesertaKeluarga.controls["nama_ayah"].updateValueAndValidity();
      this.formPesertaKeluarga.controls["agama_ayah"].updateValueAndValidity();
      this.formPesertaKeluarga.controls[
        "id_jenjang_ayah"
      ].updateValueAndValidity();
      this.formPesertaKeluarga.controls[
        "pekerjaan_ayah"
      ].updateValueAndValidity();
    } else if (type == "ibu") {
      this.formPesertaKeluarga.controls["nik_ibu"].updateValueAndValidity();
      this.formPesertaKeluarga.controls[
        "status_nik_ibu"
      ].updateValueAndValidity();
      this.formPesertaKeluarga.controls["nama_ibu"].updateValueAndValidity();
      this.formPesertaKeluarga.controls["agama_ibu"].updateValueAndValidity();
      this.formPesertaKeluarga.controls[
        "id_jenjang_ibu"
      ].updateValueAndValidity();
      this.formPesertaKeluarga.controls[
        "pekerjaan_ibu"
      ].updateValueAndValidity();
    }

    if (nik.length >= 16) {
      this.formDataPribadi.get("nik_cek").setValue(1);
      const request = [this.loadDataPenduduk(nik)];

      const [dataPenduduk] = await Promise.all(request);

      if (dataPenduduk.result.length > 0) {
        if (type == "pribadi") {
          this.formDataPribadi.get("action").setValue("modify");
          this.formDataPribadi.get("nik").disable();

          if (dataPenduduk.result[0].kewarganegaraan == "ID.00.00.0000") {
            this.loadDataWilayah("WNI", true, "ID.00.00.0000", "pribadi");
            this.formDataPribadi.get("warga_negara").setValue("WNI");
          }
        }

        this.inisialisasiDataPenduduk(dataPenduduk.result[0], type);
      }

      if (type == "pribadi") {
      } else if (type == "ayah") {
        this.formPesertaKeluarga.get("status_nik_ayah").setValue(1);
      } else if (type == "ibu") {
        this.formPesertaKeluarga.get("status_nik_ibu").setValue(1);
      }
      console.log(dataPenduduk.result);
    } else {
      if (type == "pribadi") {
        this.formDataPribadi.get("nik_cek").setValue(null);
      } else if (type == "ayah") {
        this.formPesertaKeluarga.get("status_nik_ayah").setValue(null);
      } else if (type == "ibu") {
        this.formPesertaKeluarga.get("status_nik_ibu").setValue(null);
      }
    }
  }

  inisialisasiDataPenduduk(data, type) {
    if (type == "pribadi") {
      if (data.kewarganegaraan == "ID.00.00.0000") {
        this.loadDataWilayah("WNI", true, "ID.00.00.0000", "pribadi");
        this.formDataPribadi.get("warga_negara").setValue("WNI");
      } else {
        this.formDataPribadi.get("warga_negara").setValue("WNA");
        this.loadDataWilayah("WNA", true, data.kewarganegaraan, "pribadi");
        this.formDataPribadi
          .get("id_warga_negara")
          .setValue(data.kewarganegaraan);
      }

      this.formDataPribadi.get("alamat_tinggal").setValue(data.alamat_jalan);
      this.formDataPribadi.get("rt").setValue(data.alamat_rt);
      this.formDataPribadi.get("rw").setValue(data.alamat_rw);
    } else if (type == "ayah") {
      this.formPesertaKeluarga.get("nik_ayah").setValue(data.kode);
      this.formPesertaKeluarga.get("nama_ayah").setValue(data.nama);
      this.formPesertaKeluarga.get("agama_ayah").setValue(data.id_agama);
      this.formPesertaKeluarga
        .get("id_jenjang_ayah")
        .setValue(data.id_jenjang_pendidikan);
      this.formPesertaKeluarga
        .get("pekerjaan_ayah")
        .setValue(data.id_pekerjaan.toString());
      // this.formPesertaKeluarga
      //   .get("status_ayah")
      //   .setValue(data.id_status_sipil);

      this.formPesertaKeluarga
        .get("alamat_tinggal")
        .setValue(data.alamat_jalan);
      this.formPesertaKeluarga.get("rt").setValue(data.alamat_rt);
      this.formPesertaKeluarga.get("rw").setValue(data.alamat_rw);
      this.formPesertaKeluarga.get("wilayah_id").setValue(data.kode_wilayah);
      this.formPesertaKeluarga.get("wilayah").setValue(data.nama_wilayah);
      this.formPesertaKeluarga.get("kode_pos").setValue(data.kode_pos);
      this.formPesertaKeluarga.get("no_hp").setValue(data.handphone);
      this.formPesertaKeluarga.get("kode_pos").setValue(data.kode_pos);
      this.formPesertaKeluarga.get("telepon").setValue(data.telepon);
      this.formPesertaKeluarga.get("email").setValue(data.email);
    } else if (type == "ibu") {
      this.formPesertaKeluarga.get("nik_ibu").setValue(data.kode);
      this.formPesertaKeluarga.get("nama_ibu").setValue(data.nama);
      this.formPesertaKeluarga.get("agama_ibu").setValue(data.id_agama);
      this.formPesertaKeluarga
        .get("id_jenjang_ibu")
        .setValue(data.id_jenjang_pendidikan);
      this.formPesertaKeluarga
        .get("pekerjaan_ibu")
        .setValue(data.id_pekerjaan.toString());

      // this.formPesertaKeluarga.get("status_ibu").setValue(data.id_status_sipil);
    }
  }

  loadDataPenduduk(nik): Promise<any> {
    return this.dataService
      .getRequest<any>("/penduduk", {
        where: "kode = '" + nik + "'",
      })
      .toPromise();
  }

  loadDataWilayah(wn, set, value, type): void {
    let where = "tingkat = '1' AND kode ='ID.00.00.0000'";

    if (type == "pribadi") {
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
    } else {
      if (set) {
        where = "tingkat = '1' AND kode ='" + value + "'";

        if (type == "ayah") {
          this.formDataPribadi.get("wilayah_id").setValue(value);
        }
      }
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
    this.formDataPribadi.get("wilayah_id").setValue(data.kode);
    this.formDataPribadi.get("wilayah").setValue(data.nama_wilayah);
  }

  selectWilayahOrangTua(data) {
    console.log(data);
    this.formPesertaKeluarga.get("wilayah_id").setValue(data.kode);
    this.formPesertaKeluarga.get("wilayah").setValue(data.nama_wilayah);
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

      this.dataPesertaKeluarga =
        dataPesertaKeluarga.result.length > 0
          ? dataPesertaKeluarga.result[0]
          : null;

      if (this.dataPesertaKeluarga) {
        if (this.dataPesertaKeluarga.nik_ayah) {
          this.formPesertaKeluarga.get("type_action_ayah").setValue("1");
          this.formPesertaKeluarga.get("nik_ayah").disable();
          this.onChangeNik(this.dataPesertaKeluarga.nik_ayah, "ayah");
        } else {
          this.formPesertaKeluarga.get("type_action_ayah").setValue("0");
        }

        if (this.dataPesertaKeluarga.nik_ibu) {
          this.formPesertaKeluarga.get("type_action_ibu").setValue("1");
          this.formPesertaKeluarga.get("nik_ibu").disable();
          this.onChangeNik(this.dataPesertaKeluarga.nik_ibu, "ibu");
        } else {
          this.formPesertaKeluarga.get("type_action_ibu").setValue("0");
        }
      }
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
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
    const value = cloneDeep(this.formPesertaKeluarga.getRawValue());

    console.log(value);

    const payload = [];

    if (value.status_nik_ayah == "1") {
      payload.push({
        kode: value.nik_ayah,
        nama: value.nama_ayah,
        status: value.status_nik_ayah,
        id_agama: value.agama_ayah,
        id_jenjang_pendidikan: value.id_jenjang_ayah,
        kode_wilayah: value.wilayah_id,
        telepon: value.telepon,
        handphone: value.no_hp,
        email: value.email,
        alamat_jalan: value.alamat_tinggal,
        alamat_rt: value.rt,
        alamat_rw: value.rw,
        type_action: value.type_action_ayah,
        id_pekerjaan: value.pekerjaan_ayah,
        kode_pos: value.kode_pos,
      });
    }

    if (value.status_nik_ibu == "1") {
      payload.push({
        kode: value.nik_ibu,
        status: value.status_nik_ibu,
        nama: value.nama_ibu,
        id_agama: value.agama_ibu,
        id_jenjang_pendidikan: value.id_jenjang_ibu,
        kode_wilayah: value.wilayah_id,
        telepon: value.telepon,
        handphone: value.no_hp,
        email: value.email,
        alamat_jalan: value.alamat_tinggal,
        alamat_rt: value.rt,
        alamat_rw: value.rw,
        type_action: value.type_action_ibu,
        id_pekerjaan: value.pekerjaan_ibu,
        kode_pos: value.kode_pos,
      });
    }

    for (let i = 0; i < payload.length; i++) {
      let action =
        payload[i].type_action == "0" ? "/penduduk/create" : "/penduduk/modify";
      this.dataService
        .getPostRequest<FormResponse>(action, payload[i])
        .subscribe(
          (success) => {
            if (i == payload.length - 1) {
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
                    const peserta = {
                      id: this.dataPesertaKeluarga.id,
                      nik_ayah: value.nik_ayah,
                      nik_ibu: value.nik_ibu,
                    };

                    this.dataService
                      .getPostRequest<FormResponse>(
                        "/pmb/pesertaKeluarga/modify",
                        peserta
                      )
                      .subscribe(
                        (success) => {
                          this.manageData(success.result);
                        },
                        (error) => {}
                      );
                  });
              }
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
    }
  }

  async loadInitialDataTabAsalSekolah(): Promise<any> {
    try {
      const request = [this.loadDataPesertaAsalSekolah(this.dataPeserta.id)];

      const [dataPesertaAsalSekolah] = await Promise.all(request);

      this.dataPesertaAsalSekolah =
        dataPesertaAsalSekolah.result.length > 0
          ? dataPesertaAsalSekolah.result[0]
          : null;

      if (this.dataPesertaAsalSekolah) {
        this.formAsalSekolah.get("id").setValue(this.dataPesertaAsalSekolah.id);
        this.formAsalSekolah
          .get("kode_sekolah")
          .setValue(this.dataPesertaAsalSekolah.kode_sekolah);
        this.formAsalSekolah
          .get("nama_sekolah")
          .setValue(this.dataPesertaAsalSekolah.nama);
        this.formAsalSekolah
          .get("alamat_sekolah")
          .setValue(this.dataPesertaAsalSekolah.alamat_1);
      }
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
    }
  }

  loadDataPesertaAsalSekolah(peserta_id): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaAsalSekolah", {
        where: "peserta_id = '" + peserta_id + "'",
      })
      .toPromise();
  }

  selectAsalSekolah(data) {
    this.formAsalSekolah.get("kode_sekolah").setValue(data.kode);
    this.formAsalSekolah.get("nama_sekolah").setValue(data.nama);
    this.formAsalSekolah.get("alamat_sekolah").setValue(data.alamat_1);
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
      .getRequest<any>("/master/sekolah", {
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

  async loadInitialDataTabAsalPerguruanTinggi(): Promise<any> {
    try {
      const request = [
        this.loadDataPesertaAsalPerguruanTinggi(this.dataPeserta.id),
      ];

      const [dataPesertaAsalPerguruanTinggi] = await Promise.all(request);

      this.dataPesertaAsalPerguruanTinggi =
        dataPesertaAsalPerguruanTinggi.result.length > 0
          ? dataPesertaAsalPerguruanTinggi.result[0]
          : null;

      if (this.dataPesertaAsalPerguruanTinggi) {
        this.formPerguruanTinggi
          .get("id")
          .setValue(this.dataPesertaAsalPerguruanTinggi.id);
        this.formPerguruanTinggi
          .get("kode_perguruan_tinggi")
          .setValue(this.dataPesertaAsalPerguruanTinggi.kode_perguruan_tinggi);
        this.formPerguruanTinggi
          .get("nama_perguruan_tinggi")
          .setValue(this.dataPesertaAsalPerguruanTinggi.nama);
        this.formPerguruanTinggi
          .get("alamat_perguruan_tinggi")
          .setValue(this.dataPesertaAsalPerguruanTinggi.alamat_1);
      }
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
    }
  }

  loadDataPesertaAsalPerguruanTinggi(peserta_id): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaAsalPerguruanTinggi", {
        where: "peserta_id = '" + peserta_id + "'",
      })
      .toPromise();
  }

  selectAsalPerguruanTinggi(data) {
    this.formPerguruanTinggi.get("kode_perguruan_tinggi").setValue(data.kode);
    this.formPerguruanTinggi.get("nama_perguruan_tinggi").setValue(data.nama);
    this.formPerguruanTinggi
      .get("alamat_perguruan_tinggi")
      .setValue(data.alamat_1);
  }

  doFilterAsalPerguruanTinggi(searchValue: string) {
    if (searchValue.length > 2) {
      this.AsalPerguruanTinggiList = this.getDataPerguruanTinggi(
        searchValue,
        "isAsalPerguruanTinggiSearch"
      ).pipe(map((res) => res));
    }
  }

  getDataPerguruanTinggi(search, nameLoader) {
    let where =
      "nama LIKE  '%" + search + "%' or kode LIKE  '%" + search + "%'";
    this[nameLoader] = true;
    return this.dataService
      .getRequest<any>("/master/perguruanTinggi", {
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

  toHome() {
    var home = this._storageService.get("home");
    if (home) {
      this.router.navigate([home]);
    }
  }
  toRouteBatal(data) {
    if (data) {
      this.router.navigate(["/pmb/transaksi/peserta"]);
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
  helloShow() {
    var welcome = this._storageService.get("welcome");
    if (welcome == "1") {
      return false;
    } else {
      this._storageService.set("welcome", "1");
    }
    // this.isLoading = true;
    swal
      .fire({
        title: "Hallo Selamat Datang",
        text: "Silahkan isi formulir pendaftaran anda",
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
}
