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
  selector: "app-ubah-status-seleksi",
  templateUrl: "./ubah-status-seleksi.component.html",
  styleUrls: ["./ubah-status-seleksi.component.scss"],
})
export class UbahStatusSeleksiComponent implements OnInit {
  
  listDataPilihanProdi = [];
  formGroup: FormGroup;
  params: any;
  checked = false;
  disabled = false;
  
  dataRefStatusSeleksi: any;
  listDataAktif = [];
  
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

  mahasiswa: Selector[] = [
    {value: 'value-0', viewValue: 'Tes1'},
    {value: 'value-1', viewValue: 'Tes2'},
    {value: 'value-2', viewValue: 'Tes3'},
  ];

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      id: [{ value: "", disabled: true }],
      status_seleksi: [{ value: ""}],
      lulus_status: [{ value: ""}],
      aktif_status: [{ value: ""}]
    });

    if(this.params.id){
      this.loadInitialData();
    }
    
  }

  loadDataStatusSeleksi(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/statusSeleksi", {
        where: "id='" + this.params.id + "'",
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
        this.loadDataStatusSeleksi(),
        this.loadDataAktif()
      ];

      const [
        dataReferensiSS,
        listDataAktif
      ] = await Promise.all(request);

      this.dataRefStatusSeleksi = dataReferensiSS.result[0];
      this.listDataAktif = listDataAktif.result;

      this.formGroup.get("id").setValue(this.dataRefStatusSeleksi.id);
      this.formGroup.get("status_seleksi").setValue(this.dataRefStatusSeleksi.status_seleksi);
      this.formGroup.get("lulus_status").setValue(this.dataRefStatusSeleksi.lulus);
      this.formGroup.get("aktif_status").setValue(this.dataRefStatusSeleksi.id_aktif);

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
      this.router.navigate(["pmb/referensi/status-seleksi"]);
    }
  }

  onSubmit() {
    swal
      .fire({
        title: "Referensi Status Seleksi",
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
          id: this.dataRefStatusSeleksi.id,
          status_seleksi: this.formGroup.get("status_seleksi").value,  
          lulus: this.formGroup.get("lulus_status").value,
          id_aktif: this.formGroup.get("aktif_status").value
        };
        this.dataService
          .getPostRequest<FormResponse>(
            "/pmb/referensi/statusSeleksi/modify",
            payload
          )
          .pipe(finalize(() => this.hideSpinner()))
          .subscribe(
            (success) => {
              if (success.message == "Invalid Parameter") {
                swal.fire({
                  title: "Ubah Status Seleksi",
                  text: "Status Seleksi Gagal di Simpan.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else {
                swal
                  .fire({
                    title: "Ubah Status Seleksi",
                    text: "Status Seleksi Berhasil di Simpan.",
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
                title: "Ubah Status Seleksi",
                text: "Status Seleksi Gagal di Simpan.",
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
