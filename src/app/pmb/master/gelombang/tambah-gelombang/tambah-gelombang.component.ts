import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import { DataService } from "../../../../core/services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../../../shared/types/common";
import { cloneDeep } from "lodash";
import { finalize, takeUntil } from "rxjs/operators";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted, "setValue")
    );
  }
}

@Component({
  selector: "app-tambah-gelombang",
  templateUrl: "./tambah-gelombang.component.html",
  styleUrls: ["./tambah-gelombang.component.scss"],
})
export class TambahGelombangComponent implements OnInit {
  formGroup: FormGroup;
  params: any;
  checked = false;
  disabled = false;

  listDataInstitusi = [];
  listDataTahunAkademik = [];
  listDataGelombangKe = [];
  isPreparingForm = false;
  spinnerStatus = "Mohon Tunggu...";
  isLoading = false;
  spinnerName = "formSpinner";

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private _activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this._activatedRoute.params.subscribe(
      (params: any) => ((this.params = params), "setValue")
    );
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      kode: [""],
      code: [""],
      kode_institusi: ["", Validators.required],
      kode_tahun_akademik: ["", Validators.required],
      id_gelombang: ["", Validators.required],
      mulai_pendaftaran: ["", Validators.required],
      selesai_pendaftaran: ["", Validators.required],
      selesai_pendaftaran_online: ["", Validators.required],
      tanggal_ujian: [""],
      jam_ujian_mulai: [""],
      mulai_pengumuman: ["", Validators.required],
      selesai_pengumuman: ["", Validators.required],
      mulai_registrasi: ["", Validators.required],
      selesai_registrasi: ["", Validators.required],
    });

    if (this.params.kode) {
      this.loadInitialDataUpdate();
    }

    console.log(this.params);

    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();

      // this.makeForm();

      const request = [
        this.loadDataInstitusi(),
        this.loadDataTahunAkademik(),
        this.loadDataGelombangKe(),
      ];

      const [listDataInstitusi, listDataTahunAkademik, listDataGelombangKe] =
        await Promise.all(request);
      // this.listDataInstitusi = listDataInstitusi.result;
      // default sebelum api
      this.listDataInstitusi = [
        {
          kode: "demo",
          name: "Universitas Yarsi",
        },
      ];
      this.listDataTahunAkademik = listDataTahunAkademik.result;
      this.listDataGelombangKe = listDataGelombangKe.result;

      this.isPreparingForm = false;
      //untuk loading data
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
    }
  }

  async loadInitialDataUpdate(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();

      // this.makeForm();

      const request = [this.loadDataUpdate()];

      const [dataUpdate] = await Promise.all(request);

      let data = dataUpdate.result[0];

      this.formGroup.get("kode").setValue(data.kode);
      this.formGroup.get("kode_institusi").setValue(data.kode_institusi);
      this.formGroup
        .get("kode_tahun_akademik")
        .setValue(data.kode_tahun_akademik);
      this.formGroup.get("id_gelombang").setValue(data.id_gelombang);
      this.formGroup
        .get("mulai_pendaftaran")
        .setValue(this.formatDate(data.mulai_pendaftaran, "setValue"));
      this.formGroup
        .get("selesai_pendaftaran")
        .setValue(this.formatDate(data.selesai_pendaftaran, "setValue"));
      this.formGroup
        .get("selesai_pendaftaran_online")
        .setValue(this.formatDate(data.selesai_pendaftaran, "setValue"));
      this.formGroup.get("tanggal_ujian").setValue(data.tanggal_ujian);
      this.formGroup
        .get("jam_ujian_mulai")
        .setValue(data.jam_ujian_mulai.slice(0, 5));
      this.formGroup
        .get("mulai_pengumuman")
        .setValue(this.formatDate(data.mulai_pengumuman, "setValue"));
      this.formGroup
        .get("selesai_pengumuman")
        .setValue(this.formatDate(data.selesai_pengumuman, "setValue"));
      this.formGroup
        .get("mulai_registrasi")
        .setValue(this.formatDate(data.mulai_registrasi, "setValue"));
      this.formGroup
        .get("selesai_registrasi")
        .setValue(this.formatDate(data.selesai_registrasi, "setValue"));

      this.isPreparingForm = false;
      //untuk loading data
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
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

  loadDataInstitusi(): Promise<any> {
    return this.dataService
      .getRequest<any>("/master/institusi", {})
      .toPromise();
  }

  loadDataTahunAkademik(): Promise<any> {
    return this.dataService
      .getRequest<any>("/master/tahunAkademik", {
        where: "id_aktif = 'Y' ",
        order: "tahun desc",
      })
      .toPromise();
  }

  loadDataGelombangKe(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/gelombang", {})
      .toPromise();
  }

  loadDataUpdate(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/master/gelombang", {
        where: "kode ='" + this.params.kode + "'",
      })
      .toPromise();
  }

  onSubmit() {
    swal
      .fire({
        title: "Master Gelombang",
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
    this.showSpinner();
    const value = cloneDeep(this.formGroup.value);
    value.code = null;
    value.mulai_pendaftaran = this.formatDate(
      value.mulai_pendaftaran,
      "datetime"
    );
    value.selesai_pendaftaran = this.formatDate(
      value.selesai_pendaftaran,
      "datetime"
    );
    value.selesai_pendaftaran_online = this.formatDate(
      value.selesai_pendaftaran_online,
      "datetime"
    );
    value.mulai_pengumuman = this.formatDate(
      value.mulai_pengumuman,
      "datetime"
    );
    value.selesai_pengumuman = this.formatDate(
      value.selesai_pengumuman,
      "datetime"
    );
    value.mulai_registrasi = this.formatDate(
      value.mulai_registrasi,
      "datetime"
    );
    value.selesai_registrasi = this.formatDate(
      value.selesai_registrasi,
      "datetime"
    );
    value.jam_ujian_mulai = [value.jam_ujian_mulai, "00"].join(":");
    const payload = value;

    let endpoint = "/pmb/master/gelombang/create";

    if (this.params.kode) {
      endpoint = "/pmb/master/gelombang/modify";
    }

    this.dataService
      .getPostRequest<FormResponse>(endpoint, payload)
      .pipe(finalize(() => this.hideSpinner()))
      .subscribe(
        (success) => {
          if (success.message == "Invalid Parameter") {
            swal.fire({
              title: "Master Gelombang",
              text: "Data Master Gelombang Gagal di Submit.",
              icon: "error",
              customClass: {
                confirmButton: "btn btn-error",
              },
              buttonsStyling: false,
            });
          } else {
            swal
              .fire({
                title: "Master Gelombang",
                text: "Data Master Gelombang Berhasil di Submit !",
                icon: "success",
                customClass: {
                  confirmButton: "btn btn-success",
                },
                buttonsStyling: false,
                showCancelButton: false,
                confirmButtonText: "Ok",
              })
              .then((result) => {
                this.cancel(success.result);
              });
          }
        },
        (error) => {
          swal.fire({
            title: "Master Gelombang",
            text: "Data Master Gelombang Gagal di Submit.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        }
      );
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

  cancel(data) {
    this.router.navigate(["/pmb/master/gelombang"]);
  }
}
