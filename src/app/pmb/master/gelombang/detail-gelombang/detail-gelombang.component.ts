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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-detail-gelombang",
  templateUrl: "./detail-gelombang.component.html",
  styleUrls: ["./detail-gelombang.component.scss"],
})
export class DetailGelombangComponent implements OnInit {
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
      code: ["demo"],
      kode_institusi: ["", Validators.required],
      kode_tahun_akademik: ["", Validators.required],
      id_gelombang: ["", Validators.required],
      mulai_pendaftaran: ["", Validators.required],
      selesai_pendaftaran: ["", Validators.required],
      selesai_pendaftaran_online: ["", Validators.required],
      tanggal_ujian: ["", Validators.required],
      jam_ujian_mulai: ["", Validators.required],
      mulai_pengumuman: ["", Validators.required],
      selesai_pengumuman: ["", Validators.required],
      mulai_registrasi: ["", Validators.required],
      selesai_registrasi: ["", Validators.required],
    });

    if (this.params.kode) {
      this.loadInitialDataDetail();
      this.formGroup.disable();
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
  async loadInitialDataDetail(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();

      // this.makeForm();

      const request = [this.loadDataGelombang()];

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
      .getRequest<any>("/master/tahunAkademik", {})
      .toPromise();
  }

  loadDataGelombangKe(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/gelombang", {})
      .toPromise();
  }
  loadDataGelombang(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/master/gelombang", {
        where: "kode ='" + this.params.kode + "'",
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
}
