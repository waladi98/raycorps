import { Component, OnInit, ElementRef, ViewChild, Inject,  ViewEncapsulation} from '@angular/core';
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
import { DataService } from "../../../../core/services/data.service";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  encapsulation: ViewEncapsulation.None
  
})
export class FormDialogComponent implements OnInit {
  formGroup: FormGroup;

  dataParam={
    type:null
  };

  status_aktif: stat_aktif[] = [
    {value: 'T', viewValue: 'Tidak Aktif'},
    {value: 'Y', viewValue: 'Aktif'}
  ];

  listDataInstitusi = [];
  // listDataInstitusi = [
  //   {
  //     kode: "demo",
  //     name: "Universitas Yarsi",
  //   },
  //   {
  //     kode: "demo1",
  //     name: "Universitas Yarsi1",
  //   },
  // ];

  dataKomponen:any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.dataParam=this.data;
    this.breakpointObserver
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      kode: [{ value: "" } ],
      kode_institusi: [{ value: "demo"}],
      nama: [{ value: ""}],
      id_jenis_komponen: [{ value: ""}],
      keterangan: [{ value: ""}],
      id_aktif: [{ value: ""}]
    });
    this.loadInitialData();
    // if(this.dataParam.id){
      
    // }
  }

  async loadInitialData(): Promise<any> {
    try {
      // this.isPreparingForm = true;
      // this.spinnerStatus = "Mohon Tunggu...";
      // this.showSpinner();
      const request = [
        this.loadDataInstitusi(),
       
      ];

      const [
        listDataInstitusi,
      ] = await Promise.all(request);

      
      this.listDataInstitusi = listDataInstitusi.result;
      

      // this.formGroup.get("kode").setValue(this.dataKomponen.kode);
      // this.formGroup.get("kode_institusi").setValue(this.dataKomponen.kode_institusi);
      // this.formGroup.get("nama").setValue(this.dataKomponen.nama);
      // this.formGroup.get("id_jenis_komponen").setValue(this.dataKomponen.id_jenis_komponen);
      // this.formGroup.get("keterangan").setValue(this.dataKomponen.keterangan);
      // this.formGroup.get("id_aktif").setValue(this.dataKomponen.id_aktif);
      // this.hideSpinner();
    } catch (error) {
      console.log(error);
      //this.showSpinner();
    }
  }

  loadDataInstitusi(): Promise<any> {
    return this.dataService
      .getRequest<any>("/referensi/aktif", {})
      .toPromise();
  }


}
