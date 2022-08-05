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
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from "../../../../core/services/data.service";
import { NgxSpinnerService } from "ngx-spinner";
declare const require: any;

declare const $: any;

@Component({
  selector: 'app-form-dialog',
  templateUrl: 'form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  formGroup: FormGroup;

  dataParam={
    type:null
  };

  dataPeserta:any;
  listDataPilihanProdi = [];
  listDataPersyaratan = [];
  listDataStatusDokumen = [];
  dataPendaftaranPmb: any;
  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  spinnerStatus = "Mohon Tunggu...";

  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.dataParam=this.data;
    this.breakpointObserver
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      formulir_id: [{ value: "", disabled: true }],
      nama: [{ value: "", disabled: true }],
      keterangan: [""],
      catatan: [""],
      test_kesehatan: [""],
      test_psikologi: [""],
      status_seleksi: [{ value: "" }],
      handphone: [{ value: "", disabled: true }],
      email: [{ value: "", disabled: true }],
      link_info: [{ value: ""}],
      
      prodi_pilihan: new FormArray([]),
    });
    this.loadInitialData();
  }
  get prodi_pilihan(): FormArray {
    return this.formGroup.get("prodi_pilihan") as FormArray;
  }
  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();
      const request = [
        this.loadDataPendaftaranPmb(),
        this.loadDataPeserta(),
        this.loadDataPesertaPersyaratan(),
        this.loadDataStatusDokumen(),
      ];

      const [
        dataPendaftaran,
        dataPeserta,
        listDataPersyaratan,
        listDataStatusDokumen,
      ] = await Promise.all(request);

      this.dataPendaftaranPmb = dataPendaftaran.result[0];

      this.dataPeserta =
        dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;

      if (this.dataPeserta) {
        this.inisialisasiDataFormPeserta(this.dataPeserta);
      }

      this.listDataPersyaratan = listDataPersyaratan.result;
      this.listDataStatusDokumen = listDataStatusDokumen.result;
      this.hideSpinner();
    } catch (error) {
      this.hideSpinner();
      console.log(error);
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
    }, 1000);
  }
  loadDataPeserta(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/peserta", {
        where: "id='" + this.dataParam.type.id + "'",
      })
      .toPromise();
  }
  loadDataPesertaPilihanProdi(id): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaPilihanProdi", {
        where: "peserta_id = '" + id + "'",
      })
      .toPromise();
  }
  loadDataPendaftaranPmb(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/formulirOnline", {
        where: "id='" + this.dataParam.type.id + "'",
      })
      .toPromise();
  }
  loadDataPesertaPersyaratan(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaPersyaratanProdi", {
        where:
          "formulir_id='" +
          this.dataParam.type.formulir_id +
          "' AND  id_status_dokumen > 0",
        order: " required DESC",
      })
      .toPromise();
  }

  loadDataStatusDokumen(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/statusDokumen", {
        where: "id_aktif='Y' AND id > 0",
      })
      .toPromise();
  }

  inisialisasiDataFormPilihanProdi(data, jml_data) {
    // let i = 0;
    this.listDataPilihanProdi = [];

    for (let i = 0; i < jml_data; i++) {
      this.listDataPilihanProdi.push({ 
        value: data[i].prodi,
         disabled: true,
         status_seleksi: data[i].status_seleksi,
         id_status_seleksi: data[i].id_status_seleksi,
         });
    }
  }
  async inisialisasiDataFormPeserta(data) {
    this.formGroup
      .get("formulir_id")
      .setValue(data.formulir_id + "/ " + data.id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("keterangan").setValue(data.syarat);
    this.formGroup.get("catatan").setValue(data.catatan);
    this.formGroup.get("handphone").setValue(data.handphone);
    this.formGroup.get("email").setValue(data.email);    
    this.formGroup.get("status_seleksi").setValue(data.id_status_seleksi);
    this.formGroup.get("link_info").setValue(data.link_info);
    const request = [this.loadDataPesertaPilihanProdi(data.id)];

    const [listDataPesertaPilihanProdi] = await Promise.all(request);

    this.inisialisasiDataFormPilihanProdi(
      listDataPesertaPilihanProdi.result,
      data.jumlah_pilihan
    );
  }


}
