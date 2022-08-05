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
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../../../shared/types/common";
import { NgxSpinnerService } from "ngx-spinner";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
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
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-ubah-guru",
  templateUrl: "./ubah-guru.component.html",
  styleUrls: ["./ubah-guru.component.scss"],
})
export class UbahGuruComponent implements OnInit {
  listDataPilihanProdi = [];
  formGroup: FormGroup;
  params: any;
  checked = false;
  disabled = false;
  
  dataMasGuru:any;
  listDataAktif = [];
  
  isLoading = false;
  isPreparingForm = false;
  spinnerName = "formPmbSpinner";
  spinnerStatus = "Mohon Tunggu...";

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this._activatedRoute.params.subscribe(
      (params: any) => (this.params = params)
    );
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      sekolah_mitra: [{ value: "", disabled: true}],
      nama: [{ value: ""}],
      handphone: [{ value: ""}],
      aktif_status: [{ value: ""}]
    });

    if(this.params.id){
      this.loadInitialData();
    }
    
  }

  loadDataGuru(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/master/guru", {
        where: "kode ='" + this.params.id + "'",
      })
      .toPromise();
  }

  loadDataAktif(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/yt", {})
      .toPromise();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();
      const request = [
        this.loadDataGuru(),
        this.loadDataAktif(),
      ];

      const [
        dataMasterGuru,
        listDataAktif
      ] = await Promise.all(request);

      this.dataMasGuru = dataMasterGuru.result[0];
      this.listDataAktif = listDataAktif.result;
      console.log(this.dataMasGuru.code);

      this.formGroup.get("sekolah_mitra").setValue(this.dataMasGuru.kode_sekolah);
      this.formGroup.get("nama").setValue(this.dataMasGuru.nama);
      this.formGroup.get("handphone").setValue(this.dataMasGuru.handphone);
      this.formGroup.get("aktif_status").setValue(this.dataMasGuru.id_aktif);

      this.hideSpinner();
    } catch (error) {
      console.log(error);
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
    }, 2000);
  }

  toHome() {
    var home = localStorage.getItem("home");
    if (home) {
      this.router.navigate(["pmb/master/guru"]);
    }
  }

  onSubmit() {
    swal
      .fire({
        title: "Referensi Guru",
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
    this.spinnerStatus = "Sedang Diproses...";
    this.showSpinner();
    const value = cloneDeep(this.formGroup.value);

  
        const payload = {
          kode: this.dataMasGuru.kode,
          code: this.dataMasGuru.kode_hash,
          nama: this.formGroup.get("nama").value,
          handphone: this.formGroup.get("handphone").value,
          id_aktif: this.formGroup.get("aktif_status").value
        };
        this.dataService
          .getPostRequest<FormResponse>(
            "/pmb/master/guru/modify",
            payload
          )
          .pipe(finalize(() => this.hideSpinner()))
          .subscribe(
            (success) => {
              if (success.message == "Invalid Parameter") {
                swal.fire({
                  title: "Ubah Guru",
                  text: "Guru Gagal di Simpan.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else {
                swal
                  .fire({
                    title: "Ubah Guru",
                    text: "Guru Berhasil di Simpan.",
                    icon: "success",
                    customClass: {
                      confirmButton: "btn btn-success",
                    },
                    buttonsStyling: false,
                    showCancelButton: false,
                    confirmButtonText: "Ok",
                  })
                  .then((result) => {
                    this.toHome();
                  });
              }
            },
            (error) => {
              swal.fire({
                title: "Ubah Guru",
                text: "Guru Gagal di Simpan.",
                icon: "error",
                customClass: {
                  confirmButton: "btn btn-error",
                },
                buttonsStyling: false,
              });
            }
          );
   
  }

  cancel(data) {
    this.router.navigate(["/pmb/staff/master-pmb/gelombang"]);
  }
}
