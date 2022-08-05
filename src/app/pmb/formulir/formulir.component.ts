import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef,
  ElementRef,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormControl,
} from "@angular/forms";
import { DataService } from "../../core/services/data.service";
import { RecaptchaErrorParameters } from "ng-recaptcha";
import { HttpClient } from "@angular/common/http";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../shared/types/common";
import { finalize, takeUntil } from "rxjs/operators";
import { cloneDeep } from "lodash";
import { MAT_DATE_FORMATS } from "@angular/material/core";

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

interface Formulir {
  value: string;
  viewValue: string;
}

interface Prodi {
  value: string;
  viewValue: string;
}

interface Jurusan {
  value: string;
  viewValue: string;
}

declare const require: any;

declare const $: any;
declare var window: any;
declare var parsedUrl: any;
@Component({
  selector: "app-pmb-formulir",
  templateUrl: "formulir.component.html",
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class PmbFormulirComponent implements OnInit {
  keyCapca = {
    key_captcha: null,
    key_captcha2: null,
  };
  // parsedUrl = new URL(window.location.href);

  // baseUrl = parsedUrl.origin;
  domain = window.location.host;

  ipAddress = "";
  userAgent = window.navigator.userAgent;
  simpleSlider = 40;
  doubleSlider = [20, 60];

  regularItems = ["Pizza", "Pasta", "Parmesan"];
  touch: boolean;

  selectedValue: string;

  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  formGroup: FormGroup;
  //listDataGelombangPeriode = [];
  listDataGelombangPeriode: any;
  listDataJenisFormulir = [];
  listDataProdi = [];
  listDataJurusanSekolah = [];
  listDataJenisDisabilitas = [];
  // ipAddress = null;
  recaptcha = false;
  isLoadingTable = false;
  spinnerStatus = "Mohon Tunggu...";

  form_exp = true;
  listDataAlasanMemilih = [];
  listDataInformasiKampus = [];
  listDataPembiayaan = [];
  listDataPekerjaanOrtu = [];
  listDataPenghasilan = [];
  date: any;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private http: HttpClient
  ) {}

  manageData(data) {
    if (data) {
      this.router.navigate(["/pmb/reservasi/" + data.id + "/" + data.password]);
    }
  }

  selectTheme = "primary";
  formulir = [
    { value: "ipa-0", viewValue: "IPA - Rp.300.000" },
    { value: "ips-1", viewValue: "IPS - Rp.300.000" },
  ];

  prodi: Prodi[] = [
    { value: "301", viewValue: "Teknik Industri" },
    { value: "302", viewValue: "Teknik Pangan" },
    { value: "303", viewValue: "Teknik Mesin" },
    { value: "304", viewValue: "Teknik Informatika" },
    { value: "305", viewValue: "Teknik Lingkungan" },
    { value: "306", viewValue: "Teknik PWK" },
  ];

  jurusan = [
    { value: "sma-ipa", viewValue: "SMA IPA" },
    { value: "sma-ips", viewValue: "SMA IPS" },
    { value: "smk", viewValue: "SMK" },
  ];
  maxDateTanggalLahir: any;

  ngOnInit() {
    // this.loadRefPengaturan();
    this.getIPAddress();
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    this.maxDateTanggalLahir = new Date(year - 15, month, day);

    this.formGroup = this.formBuilder.group({
      periode: [{ value: "", disabled: true }],
      jenis_formulir_id: ["", Validators.required],
      prodi_id: ["", Validators.required],
      jurusan_id: [""],
      nama: ["", Validators.required],
      alamat: ["", Validators.required],
      no_hp: ["", [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)]],
      email: ["", Validators.required],
      tanggal_lahir: [this.maxDateTanggalLahir, Validators.required],
      nama_ibu_kandung: ["", Validators.required],
      jenis_disabilitas_id: ["0", Validators.required],
      keterangan_disabilitas: [""],
      ip_address_client: [""],
      recaptcha: [""],
      captcha: [""],
      id_alasan_memilih: ["", Validators.required],
      id_informasi_kampus: ["", Validators.required],
      handphone_ortu: [
        "",
        [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)],
      ],
      id_nama_pembiayaan: ["", Validators.required],
      id_nama_pekerjaan: ["", Validators.required],
      id_nama_penghasilan: ["", Validators.required],
    });

    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();

      // this.makeForm();

      const request = [
        this.loadGelombangPeriode(),
        this.loadJenisFormulir(),
        // this.loadJenisFormulirPilihan(),
        // this.loadJurusanSekolah(),
        this.loadJenisDisabilitas(),
        this.loadRefPengaturan(),
        this.getIPAddress(),
        this.getAlasanMemilih(),
        this.getInformasiKampus(),
        this.getPembiayaan(),
        this.getPekerjaanOrtu(),
        this.getPenghasilan(),
      ];

      const [
        gelombangPeriode,
        jenisFormulir,
        // jurusanSekolah,
        jenisDisabilitas,
        capca,
        ip,
        alasanMemilih,
        informasiKampus,
        pembiayaan,
        pekerjaanOrtu,
        penghasilan,
      ] = await Promise.all(request);
      //this.listDataGelombangPeriode = gelombangPeriode.result;
      this.listDataGelombangPeriode =
        gelombangPeriode.result.length > 0 ? gelombangPeriode.result[0] : false;
      this.inisialisasiDataGelombang(this.listDataGelombangPeriode);

      this.listDataJenisFormulir = jenisFormulir.result;
      // this.listDataProdi = jenisFormulirPilihan.result;
      // this.listDataJurusanSekolah = jurusanSekolah.result;
      this.listDataJenisDisabilitas = jenisDisabilitas.result;
      this.keyCapca =
        capca.result.length > 0
          ? capca.result[0]
          : {
              key_captcha: "",
              key_captcha2: "",
            };
      this.userAgent = window.navigator.userAgent;

      // this.baseUrl = parsedUrl.origin;
      this.listDataAlasanMemilih = alasanMemilih.result;
      this.listDataInformasiKampus = informasiKampus.result;
      this.listDataPembiayaan = pembiayaan.result;
      this.listDataPekerjaanOrtu = pekerjaanOrtu.result;
      this.listDataPenghasilan = penghasilan.result;
      this.ipAddress = ip.result;

      //this.isPreparingForm = false;
      //untuk loading data
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
    }
  }

  // makeForm(): void {
  //   this.formGroup = this.formBuilder.group({
  //     periode: ["", Validators.required],
  //     jenis_formulir_id: ["", Validators.required],
  //     prodi_id: ["", Validators.required],
  //     jurusan_id: ["", Validators.required],
  //     nama: ["", Validators.required],
  //     alamat: ["", Validators.required],
  //     no_hp: ["", [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)]],
  //     email: ["", Validators.required],
  //     tanggal_lahir: ["", Validators.required],
  //     nama_ibu_kandung: ["", Validators.required],
  //     jenis_disabilitas_id: ["0", Validators.required],
  //     keterangan_disabilitas: [""],
  //     ip_address_client: [""],
  //     captcha: [""],
  //     id_alasan_memilih: ["", Validators.required],
  //     id_informasi_kampus: ["", Validators.required],
  //     handphone_ortu: [
  //       "",
  //       [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)],
  //     ],
  //     id_nama_pembiayaan: ["", Validators.required],
  //     id_nama_pekerjaan: ["", Validators.required],
  //     id_nama_penghasilan: ["", Validators.required],
  //   });
  // }

  /*   getIPAddress(): Promise<any> {
    return this.dataService.getIPAddress<any>(null, {}).toPromise();
  } */

  getIPAddress() {
    this.http
      .get("https://api.ipify.org/?format=json")
      .subscribe((res: any) => {
        this.ipAddress = res.ip;
      });
  }

  loadGelombangPeriode(): Promise<any> {
    return this.dataService
      .getRequestLocal<any>("", {
        action: "pmb/master/gelombang",
        where: "id_aktif='Y' ",
      })
      .toPromise();
  }

  loadJenisFormulir(): Promise<any> {
    return this.dataService
      .getRequestLocal<any>("", {
        action: "pmb/master/jenisFormulir",
        where: "id_aktif='Y' ",
      })
      .toPromise();
  }

  loadRefPengaturan(): Promise<any> {
    return this.dataService
      .getRequestLocal<any>("", {
        action: "referensi/pengaturan",
      })
      .toPromise();
  }

  loadJenisFormulirPilihan(jenis_formulir): void {
    this.dataService
      .getRequestLocal<any>("", {
        action: "pmb/master/jenisFormulirPilihan",
        where:
          "kode_jenis_formulir='" +
          jenis_formulir +
          "' and pilihan=1 and id_aktif='Y'",
      })
      .subscribe(
        (response) => {
          this.listDataProdi = response.result;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  loadJurusanSekolah(jenis_formulir): void {
    this.dataService
      .getRequestLocal<any>("", {
        action: "pmb/master/jenisFormulirJurusan",
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

  loadJenisDisabilitas(): Promise<any> {
    return this.dataService
      .getRequestLocal<any>("", {
        action: "pmb/referensi/jenisDisabilitas",
        where: "id_aktif='Y'  ",
      })
      .toPromise();
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

  onSubmit() {
    swal
      .fire({
        title: "Daftar PMB",
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
    // swal.fire({
    //   title: "Good job!",
    //   text: "You clicked the button!",
    //   buttonsStyling: false,
    //   customClass: {
    //     confirmButton: "btn btn-success",
    //   },
    //   icon: "success"
    // });
  }
  async inisialisasiDataGelombang(data) {
    this.formGroup.get("periode").setValue(data.nama);
    this.checkDataGelombang(data.kode);
  }
  public resolved(captchaResponse: string): void {
    this.recaptcha = true;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    this.recaptcha = false;
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

  submitRequest(): void {
    this.spinnerStatus = "Pendaftaran Sedang Diproses...";
    this.showSpinner();
    this.date = new Date();
    const value = cloneDeep(this.formGroup.value);
    const payload = {
      kode_gelombang: this.listDataGelombangPeriode.kode_hash,
      kode_jenis_formulir_pilihan_1: value.prodi_id,
      id_jurusan_sekolah: value.jurusan_id,
      nama: value.nama,
      alamat: value.alamat,
      handphone: value.no_hp,
      nama_ibu: value.nama_ibu_kandung,
      ip_address: this.ipAddress + " " + this.userAgent,
      tanggal_lahir: this.formatDate(value.tanggal_lahir),
      email: value.email,
      id_jenis_disabilitas: value.jenis_disabilitas_id,
      keterangan_disabilitas: value.keterangan_disabilitas,
      id_alasan_memilih: value.id_alasan_memilih,
      id_informasi_kampus: value.id_informasi_kampus,
      handphone_ortu: value.handphone_ortu,
      id_nama_pembiayaan: value.id_nama_pembiayaan,
      id_nama_pekerjaan: value.id_nama_pekerjaan,
      id_nama_penghasilan: value.id_nama_penghasilan,
      waktu_buat: this.formatDateDibuatOleh(this.date, "datetime"),
    };

    this.dataService
      .postRequestPmb<FormResponse>("/pmb/formulirOnline/create", payload)
      .pipe(finalize(() => this.hideSpinner()))
      .subscribe(
        (success) => {
          if (success.code == "500") {
            swal.fire({
              title: "Daftar PMB",
              text: "Data Gagal di Simpan, sepertinya terjadi sesuatu pada server atau koneksi anda, mohon refresh ulang browser anda dan coba kembali.",
              icon: "error",
              customClass: {
                confirmButton: "btn btn-error",
              },
              buttonsStyling: false,
            });
          } else {
            swal
              .fire({
                title: "Daftar PMB",
                text: "Data PMB Berhasil di Daftarkan, Silahkan Cek Email Anda !",
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

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  formatDateDibuatOleh(date, type) {
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

  checkDataGelombang(kode): void {
    this.dataService
      .getRequestLocal<any>("", {
        action: "pmb/master/gelombang",
        where: "id_aktif='Y' AND kode='" + kode + "'",
      })
      .subscribe(
        (response) => {
          //console.log(response);
          if (response.result.length > 0) {
            // let end_date = new Date(
            //   response.result[0].selesai_pendaftaran_online
            // ).getTime();
            // let current_date = new Date().getTime();

            if (response.result[0].status_pendaftaran == "1") {
              this.form_exp = false;
            } else {
              this.form_exp = true;

              swal.fire({
                title: "Daftar PMB",
                text: "PMB Pada Gelombang Tersebut Telah Berakhir.",
                icon: "warning",
                customClass: {
                  confirmButton: "btn btn-error",
                },
                buttonsStyling: false,
              });
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getAlasanMemilih(): Promise<any> {
    return this.dataService
      .getRequestLocal<any>("", {
        action: "referensi/alasanMemilih",
        where: "id_aktif='Y' ",
      })
      .toPromise();
  }

  getInformasiKampus(): Promise<any> {
    return this.dataService
      .getRequestLocal<any>("", {
        action: "referensi/informasiKampus",
        where: "id_aktif='Y' ",
      })
      .toPromise();
  }

  getPembiayaan(): Promise<any> {
    return this.dataService
      .getRequestLocal<any>("", {
        action: "referensi/pembiayaan",
        where: "id_aktif='Y' ",
      })
      .toPromise();
  }

  getPekerjaanOrtu(): Promise<any> {
    return this.dataService
      .getRequestLocal<any>("", {
        action: "referensi/pekerjaanOrtu",
        where: "id_aktif='Y' ",
      })
      .toPromise();
  }

  getPenghasilan(): Promise<any> {
    return this.dataService
      .getRequestLocal<any>("", {
        action: "referensi/penghasilan",
        where: "id_aktif='Y' ",
      })
      .toPromise();
  }
}
