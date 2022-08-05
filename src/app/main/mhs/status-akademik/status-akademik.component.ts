import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-status-akademik',
  templateUrl: 'status-akademik.component.html',
  styleUrls: ['./status-akademik.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class StatusAkademikComponent implements OnInit {
  listData = {
    header: [],
    field: [],
    action: [],
    data: [],
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
          label: 'KEWAJIBAN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'kewajiban',
        },
        {
          label: 'BAYAR',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-24',
          field: 'bayar',
        },
        {
          label: 'STATUS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-28',
          field: 'status',
        },
        {
          label: 'MAX',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'max',
        },
        {
          label: 'KONTRAK',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'kontrak',
        },
        {
          label: 'LULUS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'lulus',
        },
        {
          label: 'KUMULATIF',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'kumulatif',
        },
        {
          label: 'IPS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'ips',
        },
        {
          label: 'IPK',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'ipk',
        },
        {
          label: 'AKSI',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
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
          field: 'kewajiban',
        },
        {
          class: 'text-center border border-black-300',
          field: 'bayar',
        },
        {
          class: 'text-center border border-black-300',
          field: 'status',
        },
        {
          class: 'text-center border border-black-300',
          field: 'max',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kontrak',
        },
        {
          class: 'text-center border border-black-300',
          field: 'lulus',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kumulatif',
        },
        {
          class: 'text-center border border-black-300',
          field: 'ips',
        },
        {
          class: 'text-center border border-black-300',
          field: 'ipk',
        },
        {
          class: 'text-center border border-black-300',
          field: 'action',
        },
      ],
      action: [
        {
          action_name: 'manageData',
          action_title: 'update',
          icon: 'fa fa-edit text-warning',
        },
      ],
      data: [
        {
          no: '',
          semester: '20211',
          status_mhs: 'Aktif',
          kewajiban: '18,500,000',
          bayar: '13,875,000',
          status: '75 %',
          max: '24',
          kontrak: '23',
          lulus: '0',
          kumulatif: '55',
          ips: '0.00',
          ipk: '3.42',
        },
        {
          no: '',
          semester: '20211',
          status_mhs: 'Aktif',
          kewajiban: '18,500,000',
          bayar: '13,875,000',
          status: '75 %',
          max: '24',
          kontrak: '23',
          lulus: '0',
          kumulatif: '55',
          ips: '0.00',
          ipk: '3.42',
        },
        {
          no: '',
          semester: '20211',
          status_mhs: 'Aktif',
          kewajiban: '18,500,000',
          bayar: '13,875,000',
          status: '75 %',
          max: '24',
          kontrak: '23',
          lulus: '0',
          kumulatif: '55',
          ips: '0.00',
          ipk: '3.42',
        },
        {
          no: '',
          semester: '20211',
          status_mhs: 'Aktif',
          kewajiban: '18,500,000',
          bayar: '13,875,000',
          status: '75 %',
          max: '24',
          kontrak: '23',
          lulus: '0',
          kumulatif: '55',
          ips: '0.00',
          ipk: '3.42',
        },
        {
          no: '',
          semester: '20211',
          status_mhs: 'Aktif',
          kewajiban: '18,500,000',
          bayar: '13,875,000',
          status: '75 %',
          max: '24',
          kontrak: '23',
          lulus: '0',
          kumulatif: '55',
          ips: '0.00',
          ipk: '3.42',
        },
        {
          no: '',
          semester: '20211',
          status_mhs: 'Aktif',
          kewajiban: '18,500,000',
          bayar: '13,875,000',
          status: '75 %',
          max: '24',
          kontrak: '23',
          lulus: '0',
          kumulatif: '55',
          ips: '0.00',
          ipk: '3.42',
        },
        {
          no: '',
          semester: '20211',
          status_mhs: 'Aktif',
          kewajiban: '18,500,000',
          bayar: '13,875,000',
          status: '75 %',
          max: '24',
          kontrak: '23',
          lulus: '0',
          kumulatif: '55',
          ips: '0.00',
          ipk: '3.42',
        },
      ],
    };
  }
}
