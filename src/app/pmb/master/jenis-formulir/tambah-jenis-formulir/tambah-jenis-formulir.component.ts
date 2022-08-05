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
import { cloneDeep } from "lodash";
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../../../shared/types/common";
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
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-tambah-jenis-formulir",
  templateUrl: "./tambah-jenis-formulir.component.html",
  styleUrls: ["./tambah-jenis-formulir.component.scss"],
})
export class TambahJenisFormulirComponent implements OnInit {
  formGroup: FormGroup;
  params: any;
  checked = false;
  disabled = false;
  
  isPreparingForm = false;
  spinnerStatus = "Mohon Tunggu...";
  isLoading = false;
  spinnerName = "formSpinner";

  listDataInstitusi = [];
  listDataJenjang = [];
  listDataTes = [];
  listDataAktif = [];
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
      nama_formulir: ["", Validators.required],
      jumlah_pilihan: ["", Validators.required],
      harga: ["", Validators.required],
      keterangan: ["", Validators.required],
    });

    if (this.params.kode) {
      //this.loadInitialDataUpdate();
    }

    console.log(this.params);

    this.loadInitialData();
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
  async loadInitialData(): Promise<any> {
    try {
      // this.isPreparingForm = true;
      // this.spinnerStatus = "Mohon Tunggu...";
      // this.showSpinner();

      // this.makeForm();

      const request = [
        this.loadDataInstitusi(),
        this.loadDataJenjang(),
        this.loadDataAktif(),
        
      ];

      const [listDataInstitusi,listDataJenjang,listDataAktif] =
        await Promise.all(request);
      // this.listDataInstitusi = listDataInstitusi.result;
      // default sebelum api
      this.listDataInstitusi = [
        {
          kode: "demo",
          name: "Universitas Yarsi",
        },
      ];
  
      this.listDataJenjang = listDataJenjang.result;
      this.listDataAktif = listDataAktif.result;

      this.isPreparingForm = false;
      //untuk loading data
      //this.hideSpinner();
    } catch (error) {
      console.log(error);
      //this.hideSpinner();
    }
  }
  loadDataInstitusi(): Promise<any> {
    return this.dataService
      .getRequest<any>("/master/institusi", {})
      .toPromise();
  }
  loadDataJenjang(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/jenjang", {})
      .toPromise();
  }
  loadDataAktif(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/yt", {})
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
                //this.cancel(success.result);
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
}
