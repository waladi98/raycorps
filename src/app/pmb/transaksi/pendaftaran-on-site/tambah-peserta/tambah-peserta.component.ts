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
import { DataService } from "../../../../core/services/data.service";
import { RecaptchaErrorParameters } from "ng-recaptcha";
import { HttpClient } from "@angular/common/http";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../../../shared/types/common";
import { finalize, takeUntil } from "rxjs/operators";
import { cloneDeep } from "lodash";

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

@Component({
  selector: "app-tambah-peserta",
  templateUrl: "tambah-peserta.component.html",
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class TambahPesertaComponent implements OnInit {
  simpleSlider = 40;
  doubleSlider = [20, 60];

  regularItems = ["Pizza", "Pasta", "Parmesan"];
  touch: boolean;

  selectedValue: string;

  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  formGroup: FormGroup;
  listDataGelombangPeriode = [];
  listDataJenisFormulir = [];
  listDataProdi = [];
  listDataJurusanSekolah = [];
  listDataJenisDisabilitas = [];
  ipAddress = null;
  recaptcha = false;
  isLoadingTable = false;
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private http: HttpClient
  ) {}

  manageData(data) {
    if (data) {
      this.router.navigate(["/pmb/staff/transaksi/pendaftaran-on-site/"]);
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

  ngOnInit() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var c = new Date(year - 18, month, day);

    this.formGroup = this.formBuilder.group({
      // periode: ["", Validators.required],
      // jenis_formulir_id: ["", Validators.required],
      // prodi_id: ["", Validators.required],
      // jurusan_id: ["", Validators.required],
      // nama: ["", Validators.required],
      // alamat: ["", Validators.required],
      // no_hp: ["", Validators.required],
      // email: ["", Validators.required],
      // tanggal_lahir: [c, Validators.required],
      // nama_ibu_kandung: ["", Validators.required],
      // recaptcha: [""],
    });

    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.showSpinner();

      // this.makeForm();

      const request = [
        this.loadGelombangPeriode(),
        this.loadJenisFormulir(),
        // this.loadJenisFormulirPilihan(),
        this.loadJurusanSekolah(),
        this.loadJenisDisabilitas(),
        // this.getIPAddress()
        ,
      ];

      const [
        gelombangPeriode,
        jenisFormulir,
        jurusanSekolah,
        jenisDisabilitas,
      ] = await Promise.all(request);
      this.listDataGelombangPeriode = gelombangPeriode.result;
      this.listDataJenisFormulir = jenisFormulir.result;
      // this.listDataProdi = jenisFormulirPilihan.result;
      this.listDataJurusanSekolah = jurusanSekolah.result;
      this.listDataJenisDisabilitas = jenisDisabilitas.result;
      // this.ipAddress = ip;

      this.isPreparingForm = false;
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
    }
  }

  makeForm(): void {
    this.formGroup = this.formBuilder.group({
      periode: ["", Validators.required],
      jenis_formulir_id: ["", Validators.required],
      prodi_id: ["", Validators.required],
      jurusan_id: ["", Validators.required],
      nama: ["", Validators.required],
      alamat: ["", Validators.required],
      no_hp: ["", Validators.required],
      email: ["", Validators.required],
      tanggal_lahir: ["", Validators.required],
      nama_ibu_kandung: ["", Validators.required],
      captcha: ["", Validators.required],
    });
  }

  getIPAddress(): Promise<any> {
    return this.dataService.getIPAddress<any>(null, {}).toPromise();
  }

  loadGelombangPeriode(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/master/gelombang", {
        where: "id_aktif='T' ",
      })
      .toPromise();
  }

  loadJenisFormulir(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/master/jenisFormulir", {
        where: "id_aktif='T' ",
      })
      .toPromise();
  }

  loadJenisFormulirPilihan(jenis_formulir): void {
    this.dataService
      .getRequest<any>("/pmb/master/jenisFormulirPilihan", {
        where: "kode_jenis_formulir=" + jenis_formulir + " and pilihan=1",
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

  loadJurusanSekolah(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/jurusanSekolah", {})
      .toPromise();
  }
  loadJenisDisabilitas(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/jenisDisabilitas", {})
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
        title: "Tambah Peserta",
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
  onCancel() {
    swal
      .fire({
        title: "Hapus Gelombang",
        text: "Apakah Yakin Akan Menghapus Data Ini?",
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
          swal.fire({
            title: 'Dihapuskan!',
            text: 'Data Peserta Telah Dihapuskan.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          });
        } else {
          swal.fire({
            title: 'Dibatalkan',
            text: 'Data Peserta Tidak Jadi Dihapuskan',
            icon: 'error',
            customClass: {
              confirmButton: "btn btn-info",
            },
            buttonsStyling: false
          });
        }
      });
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
    this.showSpinner();
    const value = cloneDeep(this.formGroup.value);

    const payload = {
      kode_gelombang: value.periode,
      kode_jenis_formulir_pilihan_1: value.prodi_id,
      id_jurusan_sekolah: value.jurusan_id,
      nama: value.nama,
      alamat: value.alamat,
      handphone: value.no_hp,
      nama_ibu: value.nama_ibu_kandung,
      ip_address: this.ipAddress ? this.ipAddress : "0.0.0.0",
      tanggal_lahir: this.formatDate(value.tanggal_lahir),
      email: value.email,
    };

    this.dataService
      .postRequestPmb<FormResponse>("/pmb/staff/transaksi/pendaftaran-on-site/create", payload)
      .pipe(finalize(() => this.hideSpinner()))
      .subscribe(
        (success) => {
          if (success.message == "Invalid Parameter") {
            swal.fire({
              title: "Tambah Peserta",
              text: "Data Peserta Gagal di Tambah.",
              icon: "error",
              customClass: {
                confirmButton: "btn btn-error",
              },
              buttonsStyling: false,
            });
          } else {
            swal
              .fire({
                title: "Tambah Peserta",
                text: "Data Peserta Berhasil di Tambah.",
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
            title: "Tambah Peserta",
            text: "Data Peserta Gagal di Tambah.",
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
}
