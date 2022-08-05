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

interface Selector {
  value: string;
  viewValue: string;
}

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
  selector: "app-ubah-status-dokumen",
  templateUrl: "./ubah-status-dokumen.component.html",
  styleUrls: ["./ubah-status-dokumen.component.scss"],
})
export class UbahStatusDokumenComponent implements OnInit {
  
  listDataPilihanProdi = [];
  formGroup: FormGroup;
  params: any;
  checked = false;
  disabled = false;
  
  dataRefStatusDokumen: any;
  listDataAktif = [];
  listDataYn = [];
  
  isLoading = false;
  isPreparingForm = false;
  spinnerName = "formPmbSpinner";
  spinnerStatus = "Mohon Tunggu...";

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private dataService: DataService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this._activatedRoute.params.subscribe(
      (params: any) => (this.params = params)
    );
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      id: [{ value: "", disabled: true }],
      status_dokumen: [{ value: ""}],
      is_valid: [{ value: ""}],
      aktif_status: [{ value: ""}],
      boleh_unggah: [{ value: ""}],
      

    });

    if(this.params.id){
      this.loadInitialData();
    }
    
  }

  loadDataStatusDokumen(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/statusDokumen", {
        where: "id='" + this.params.id + "'",
      })
      .toPromise();
  }

  loadDataAktif(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/yt", {})
      .toPromise();
  }

  loadDataYn(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/yn", {})
      .toPromise();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();
      const request = [
        this.loadDataStatusDokumen(),
        this.loadDataAktif(),
        this.loadDataYn()
      ];

      const [
        dataReferensiSD,
        listDataAktif,
        listDataYn
      ] = await Promise.all(request);

      this.dataRefStatusDokumen = dataReferensiSD.result[0];
      this.listDataAktif = listDataAktif.result;
      this.listDataYn = listDataYn.result;

      this.formGroup.get("id").setValue(this.dataRefStatusDokumen.id);
      this.formGroup.get("status_dokumen").setValue(this.dataRefStatusDokumen.status_dokumen);
      this.formGroup.get("is_valid").setValue(this.dataRefStatusDokumen.is_valid);
      this.formGroup.get("aktif_status").setValue(this.dataRefStatusDokumen.id_aktif);
      this.formGroup.get("boleh_unggah").setValue(this.dataRefStatusDokumen.boleh_unggah);

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
      this.router.navigate(["pmb/referensi/status-dokumen"]);
    }
  }

  onSubmit() {
    swal
      .fire({
        title: "Referensi Status Dokumen",
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
          id: this.dataRefStatusDokumen.id,
          status_dokumen: this.formGroup.get("status_dokumen").value,  
          is_valid: this.formGroup.get("is_valid").value,
          id_aktif: this.formGroup.get("aktif_status").value,
          boleh_unggah: this.formGroup.get("boleh_unggah").value,
        };
        this.dataService
          .getPostRequest<FormResponse>(
            "/pmb/referensi/statusDokumen/modify",
            payload
          )
          .pipe(finalize(() => this.hideSpinner()))
          .subscribe(
            (success) => {
              if (success.message == "Invalid Parameter") {
                swal.fire({
                  title: "Ubah Status Dokumen",
                  text: "Status Dokumen Gagal di Simpan.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else {
                swal
                  .fire({
                    title: "Ubah Status Dokumen",
                    text: "Status Dokumen Berhasil di Simpan.",
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
                title: "Ubah Status Dokumen",
                text: "Status Dokumen Gagal di Simpan.",
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