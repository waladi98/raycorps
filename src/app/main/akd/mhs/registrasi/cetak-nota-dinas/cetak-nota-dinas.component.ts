import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-cetak-nota-dinas',
  templateUrl: 'cetak-nota-dinas.component.html',
  styleUrls: ['./cetak-nota-dinas.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class CetakNotaDinasComponent implements OnInit {
  listData = {
    header: [],
    field: [],
    action: [],
    data: [],
  };

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

  action = [
    { value: '1', viewValue: 'Proses DPP' },
    { value: '2', viewValue: 'Hitung IPK' },
  ];

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
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-12',
          field: 'no',
        },
        {
          label: 'SEMESTER',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-28',
          field: 'semester',
        },
        {
          label: 'STATUS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'status_mhs',
        },
        {
          label: 'CETAK',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-28',
          field: 'action',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'semester',
        },
        {
          class: 'text-center border border-black-300',
          field: 'status_mhs',
        },
        {
          class: 'text-center border border-black-300',
          field: 'action',
        },
      ],
      action: [
        {
          action_name: "ubahData",
          icon: "fa fa-print text-success",
          toolTip: "Ubah Data",
        },
        {
          action_name: 'manageData',
          action_title: 'update',
          icon: 'fa fa-ban text-danger',
        },
      ],
      data: [
        {
          no: '1',
          semester: '20211',
          status_mhs: 'Tidak Mengajukan',
        },
        {
          no: '2',
          semester: '20212',
          status_mhs: 'Belum Berhak Mengajukan',
        },
      ],
    };
  }
}
