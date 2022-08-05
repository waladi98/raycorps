import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';

import { FormControl, Validators } from '@angular/forms';

declare const require: any;
declare const $: any;

interface Nilai {
  name: string;
  hasil: string;
}

@Component({
  selector: 'app-l-akademik-pmb',
  templateUrl: 'l-akademik-pmb.component.html',
  styleUrls: ['./l-akademik-pmb.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class LAkademikPmbComponent implements OnInit {
  listData = {
    header: [],
    field: [],
    action: [],
    data: [],
  };

  nilaiControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);

  nilais: Nilai[] = [
    { name: 'Sangat Buruk', hasil: 'Kami Akan Memperbaikin Layanan Kami' },
    { name: 'Buruk', hasil: 'Kami Akan Memperbaikin Layanan Kami' },
    { name: 'Cukup', hasil: 'Kami Akan Memperbaikin Layanan Kami' },
    { name: 'Baik', hasil: 'Kami Akan Memperbaikin Layanan Kami' },
    { name: 'Sangat Baik', hasil: 'Kami Akan Memperbaikin Layanan Kami' },
  ];

  // verifikasi = [
  //   { value: '1', viewValue: 'Belum diverifikasi' },
  //   { value: '2', viewValue: 'Dalam Proses' },
  //   { value: '3', viewValue: 'Lulus Verifikasi' },
  //   { value: '4', viewValue: 'Data Tidak Lengkap' },
  //   { value: '5', viewValue: 'Data Salah Input' },
  // ];

  // tes_kesehatan = [
  //   { value: '1', viewValue: 'Belum diproses' },
  //   { value: '2', viewValue: 'Direkomendasikan' },
  //   { value: '3', viewValue: 'Tidak Direkomendasikan' },
  //   { value: '4', viewValue: 'Tes Menyusul' },
  // ];

  // tes_psikologi = [
  //   { value: '1', viewValue: 'Belum tes' },
  //   { value: '2', viewValue: 'Dalam Proses Verifikasi' },
  //   { value: '3', viewValue: 'Memenuhi Syarat' },
  //   { value: '4', viewValue: 'Tidak Memenuhi Syarat' },
  // ];

  // action = [
  //   { value: '1', viewValue: 'Proses DPP' },
  //   { value: '2', viewValue: 'Hitung IPK' },
  // ];

  isLoadingTable = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  params: any;
  constructor(private _activatedRoute: ActivatedRoute, public breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isScreenSmall = true;
        console.log('Matches small viewport or handset in portrait mode');
      } else {
        this.isScreenSmall = false;
      }
    });
    this._activatedRoute.params.subscribe((params: any) => (this.params = params));
  }
  ngOnInit() {
    this.inisialisasiTable();
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: '#',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-0.5',
          field: 'no',
        },
        {
          label: 'ID',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-0.5',
          field: 'id',
        },
        {
          label: 'Uraian Pertanyaan',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'uraian_pertanyaan',
        },
        {
          label: 'Nilai',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'nilai',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'id',
        },
        {
          class: 'text-center border border-black-300',
          field: 'uraian_pertanyaan',
        },
        {
          class: 'text-center border border-black-300',
          field: 'action',
        },
      ],
      action: [
        {
          action_name: 'manageData',
          action_title: 'N_baik',
          icon: 'fa fa-edit text-warning',
        },
        {
          action_name: 'manageData',
          action_title: 'update',
          icon: 'fa fa-edit text-warning',
          text: 'Hitung IPK',
        },
      ],
      data: [
        {
          no: '1',
          id: 'IFS1',
          uraian_pertanyaan: 'Apakah anda pernah mengalami gangguan pada saat mengikuti ujian?',
        },
        {
          no: '2',
          id: 'IFS2',
          uraian_pertanyaan: 'Apakah anda pernah mengalami gangguan pada saat mengikuti ujian?',
        },
        {
          no: '3',
          id: 'IFS3',
          uraian_pertanyaan: 'Apakah anda pernah mengalami gangguan pada saat mengikuti ujian?',
        },
        
      ],
    };
  }
}
