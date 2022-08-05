import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  dataParam = {
    type: null,
  };

  dataCamaba:any;
  listDataPilihanProdi = [];
  listDataPersyaratan = [];
  listDataStatusDokumen = [];
  dataPendaftaranPmb: any;
  listDataProgram = [];

  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  spinnerStatus = "Mohon Tunggu...";

  program = [
    { value: "KER", viewValue: "Kerjasama" },
    { value: "NON", viewValue: "Regular Sore" },
    { value: "REG", viewValue: "Regular Pagi" },
    { value: "TES", viewValue: "Program Tes" },
  ];
  constructor(
    private _activatedRoute: ActivatedRoute, 
    public breakpointObserver: BreakpointObserver, 
    private formBuilder: FormBuilder, 
    private dialogRef: MatDialogRef<FormDialogComponent>, 
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    this.dataParam = this.data;
    this.breakpointObserver;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      periode: [{ value: "", disabled: true }],
      id: [{ value: "", disabled: true }],
      nama: [{ value: "", disabled: true }],
      jenis_formulir: [{ value: "", disabled: true }],
      kode_program: [{ value: "", disabled: true }],
      kode_prodi: [{ value: "", disabled: true }],
      status_seleksi: [{ value: "", disabled: true }],
      handphone: [{ value: "", disabled: true }],
      email: [{ value: "", disabled: true }],
    });

    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();
      const request = [
        this.loadDataCamaba(),

      ];

      const [
        dataCamaba,
        listDataProgram,

      ] = await Promise.all(request);


      this.dataCamaba =
      dataCamaba.result.length > 0 ? dataCamaba.result[0] : false;
      console.log(this.dataCamaba);
      if (this.dataCamaba) {
        this.inisialisasiDataFormCamaba(this.dataCamaba);
      }
      this.listDataProgram = listDataProgram.result;
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
    }, 1000);
  }
  loadDataCamaba(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/camaba", {
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

  async inisialisasiDataFormCamaba(data) {
    this.formGroup.get("periode").setValue(data.gelombang);
    this.formGroup.get("id").setValue(data.formulir_id + " / " + data.id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("jenis_formulir").setValue(data.jenis_formulir);
    this.formGroup.get("kode_program").setValue(data.kode_program);

    // this.formGroup.get("status_seleksi").setValue(data.status_seleksi);
    this.formGroup.get("handphone").setValue(data.handphone);
    this.formGroup.get("email").setValue(data.email);

    const request = [this.loadDataPesertaPilihanProdi(data.id)];

    const [listDataPesertaPilihanProdi] = await Promise.all(request);

    this.inisialisasiDataFormPilihanProdi(
      listDataPesertaPilihanProdi.result,
      data.jumlah_pilihan
    );
    
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
}
