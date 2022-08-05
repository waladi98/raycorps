import { Component, OnInit, ElementRef } from "@angular/core";
import { DataService } from "../../../../app/core/services/data.service";
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
import { Router } from "@angular/router";
import { cloneDeep } from "lodash";
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../../shared/types/common";
import { StorageService } from '../../../core/services/storage.service';
import { FileUploaderService } from '../../../shared/file-uploader/file-uploader.service';

declare const require: any;

declare const $: any;

@Component({
  selector: "app-upload-bukti-transfer",
  templateUrl: "upload-bukti-transfer.component.html",
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class UploadBuktiTransferComponent implements OnInit {
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
  dataPendaftaranPmb: any;
  isDoneMakeForm = false;
  formGroup: FormGroup;
  file_name: any;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _storageService: StorageService,
    private fileUploaderService: FileUploaderService,
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      status_pembayaran: ["", Validators.required],
      no_pendaftaran: ["", Validators.required],
      nama: ["", Validators.required],
      handphone: ["", Validators.required],
      email: ["", Validators.required],
      prodi_1: ["", Validators.required],
      bukti_setoran: ["", Validators.required],
    });

    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      const request = [this.loadDataPendaftaranPmb()];

      const [dataPendaftaran] = await Promise.all(request);
      this.dataPendaftaranPmb = dataPendaftaran.result[0];

      this.inisialisasiDataForm(this.dataPendaftaranPmb);

      this.isDoneMakeForm = true;
    } catch (error) {
      console.log(error);
      //this.showSpinner();
    }
  }

  inisialisasiDataForm(data) {
    let status = "Belum Bayar";
    if (data.id_status_bayar == "Y") {
      status = "Sudah Bayar";
    }

    this.formGroup.get("no_pendaftaran").setValue(data.id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("handphone").setValue(data.handphone);
    this.formGroup.get("email").setValue(data.email);
    this.formGroup.get("prodi_1").setValue(data.prodi_pilihan_1);
    this.formGroup.get("status_pembayaran").setValue(status);
    this.formGroup.get("bukti_setoran").setValue(data.bukti_setoran);
  }

  loadDataPendaftaranPmb(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/formulirOnline", {
        where: "id='" + this._storageService.get("username") + "'",
      })
      .toPromise();
  }

  onSubmit() {
    swal
      .fire({
        title: "Upload Bukti Pembayaran",
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
    //this.showSpinner();
    const value = cloneDeep(this.formGroup.value);
    const payload = {
      id: this.dataPendaftaranPmb.id,
      bukti_setoran: value.bukti_setoran,
    };

    let endpoint = "/pmb/formulirOnline/modify";

    this.dataService.getPostRequest<FormResponse>(endpoint, payload).subscribe(
      (success) => {
        if (success.message == "Invalid Parameter") {
          swal.fire({
            title: "Upload Bukti Pembayaran",
            text: "Upload Bukti Pembayaran Gagal di Simpan.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        } else {
          swal
            .fire({
              title: "Upload Bukti Pembayaran",
              text: "Upload Bukti Pembayaran Berhasil di Simpan.",
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
          title: "Upload Bukti Pembayaran",
          text: "Upload Bukti Pembayaran Gagal di Simpan.",
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
      this.router.navigate(["/pmb/dashboard/"]);
    }
  }

  openFileUploader(): void {
    this.fileUploaderService
      .open({
        title: 'Upload Bukti',
        templateUrl: '',
        templateParams: {
          action: '',
        },
        uploadUrl: '/file/uploadFile',
        uploadParams: {
          path: 'buktibayar',
        },
        downlodButtonText: 'Download Template',
        uploadButtonText: 'Upload',
      })
      .afterClosed()
      .subscribe((result) => {
        if(result.data){
          this.file_name=result.data.result.filename;
          this.formGroup.get('bukti_setoran').setValue(result.data.result.newfilename);
        } 
      });
  }

  cancelUpload(){
    this.dataPendaftaranPmb.bukti_setoran=null;
    this.formGroup.get('bukti_setoran').setValue(null);
  }
}
