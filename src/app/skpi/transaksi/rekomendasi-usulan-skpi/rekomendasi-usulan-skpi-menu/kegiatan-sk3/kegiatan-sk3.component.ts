import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-kegiatan-sk3',
  templateUrl: 'kegiatan-sk3.component.html',
  styleUrls: ['./kegiatan-sk3.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class KegiatanSK3Component implements OnInit {
  formGroup: FormGroup;

  listData = {
    header: [],
    field: [],
    action: [],
    data: []
  };

  verifikasi = [
    { value: '1', viewValue: 'Belum diverifikasi' },
    { value: '2', viewValue: 'Dalam Proses' },
    { value: '3', viewValue: 'Lulus Verifikasi' },
    { value: '4', viewValue: 'Data Tidak Lengkap' },
    { value: '5', viewValue: 'Data Salah Input' },
  ];

  tes_kesehatan = [
    { value: '1', viewValue: 'Belum diproses' },
    { value: '2', viewValue: 'Direkomendasikan' },
    { value: '3', viewValue: 'Tidak Direkomendasikan' },
    { value: '4', viewValue: 'Tes Menyusul' },
  ];

  tes_psikologi = [
    { value: '1', viewValue: 'Belum tes' },
    { value: '2', viewValue: 'Dalam Proses Verifikasi' },
    { value: '3', viewValue: 'Memenuhi Syarat' },
    { value: '4', viewValue: 'Tidak Memenuhi Syarat' },
  ];

  isLoadingTable = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  params: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenSmall = true;
          console.log(
            'Matches small viewport or handset in portrait mode'
          );
        } else {
          this.isScreenSmall = false;
        }
      });
    this._activatedRoute.params.subscribe((params: any) => (this.params = params));
  }
  ngOnInit() {
    this.inisialisasiTable();

    this.formGroup = this.formBuilder.group({
      nik: [{ value: '', disabled: true }, Validators.required],
      nik_ayah: [{ value: '', disabled: true }, Validators.required],
      nik_ibu: [{ value: '', disabled: true }, Validators.required],
      nama_ibu: [{ value: '', disabled: true }, Validators.required],
      nama_mahasiswa: [{ value: '', disabled: true }, Validators.required],
      tempat_lahir: [{ value: '', disabled: true }, Validators.required],
      tgl_lahir: [{ value: '', disabled: true }, Validators.required],
      warga_negara: [{ value: '', disabled: true }, Validators.required],
      agama: [{ value: '', disabled: true }, Validators.required],
      status_sipil: [{ value: '', disabled: true }, Validators.required],
      telepon: [{ value: '', disabled: true }, Validators.required],
      no_hp_wa: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      alamat: [{ value: '', disabled: true }, Validators.required],
      gender: [{ value: '', disabled: true }, Validators.required],
      rt: [{ value: '', disabled: true }, Validators.required],
      rw: [{ value: '', disabled: true }, Validators.required],
      domisili: [{ value: '', disabled: true }, Validators.required],
      desa_kel: [{ value: '', disabled: true }, Validators.required],
      kec: [{ value: '', disabled: true }, Validators.required],
      kab_kota: [{ value: '', disabled: true }, Validators.required],
      prov: [{ value: '', disabled: true }, Validators.required],
      kodepos: [{ value: '', disabled: true }, Validators.required],
      negara: [{ value: '', disabled: true }, Validators.required],
    });
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
  }
}
