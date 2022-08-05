import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from "../../../../core/services/data.service";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { cloneDeep } from "lodash";
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../../../shared/types/common";
import { finalize, takeUntil } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
declare const require: any;

declare const $: any;

interface stat_aktif {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: 'form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  formGroup: FormGroup;

  status_aktif: stat_aktif[] = [
    {value: 'T', viewValue: 'Tidak Aktif'},
    {value: 'Y', viewValue: 'Aktif'}
  ];

  dataParam={
    type:null
  };

  dataRefGelombang:any;
  listDataAktif = [];

  isLoading = false;
  isPreparingForm = false;
  spinnerName = "formPmbSpinner";
  spinnerStatus = "Mohon Tunggu...";
  
  constructor(
    
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.dataParam=this.data;
    this.breakpointObserver
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      id: [{ value: "", disabled: true }],
      nama_gelombang: [{ value: ""}],
    });
    this.loadInitialData();
    // if(this.dataParam.id){
      
    // }
  }
  

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();
      const request = [
        this.loadDataGelombang(),
        this.loadDataAktif(),
      ];

      const [
        dataReferensiGelombang,
        listDataAktif
      ] = await Promise.all(request);

      this.dataRefGelombang = dataReferensiGelombang.result[0];
      this.listDataAktif = listDataAktif.result;

      this.formGroup.get("id").setValue(this.dataRefGelombang.id);
      this.formGroup.get("nama_gelombang").setValue(this.dataRefGelombang.gelombang);

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
  loadDataGelombang(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/gelombang", {
        where: "id='" + this.dataParam.type.id + "'",
      })
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
        title: "Referensi Gelombang",
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
          id: this.dataRefGelombang.id,
          gelombang: this.formGroup.get("nama_gelombang").value,
          id_aktif: this.formGroup.get("aktif").value,
        };
        this.dataService
          .getPostRequest<FormResponse>(
            "/pmb/referensi/gelombang/modify",
            payload
          )
          .pipe(finalize(() => this.hideSpinner()))
          .subscribe(
            (success) => {
              if (success.message == "Invalid Parameter") {
                swal.fire({
                  title: "Ubah Gelombang",
                  text: "Gelombang Gagal di Simpan.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else {
                swal
                  .fire({
                    title: "Ubah Gelombang",
                    text: "Gelombang Berhasil di Simpan.",
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
                title: "Ubah Gelombang",
                text: "Gelombang Gagal di Simpan.",
                icon: "error",
                customClass: {
                  confirmButton: "btn btn-error",
                },
                buttonsStyling: false,
              });
            }
          );
   
  }
  toHome() {
    var home = localStorage.getItem("home");
    if (home) {
      this.router.navigate(["pmb/referensi/gelombang"]);
    }
  }
  cancel(data) {
    this.router.navigate(["/pmb/staff/master-pmb/gelombang"]);
  }

}
