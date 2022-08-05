import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
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
  selector: 'app-verifikasi-peserta',
  templateUrl: 'verifikasi-reg-ulang.component.html',
  styleUrls: ['./verifikasi-reg-ulang.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class VerifikasiRegUlangComponent implements OnInit {
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

  status_reg_ulang = [
    { value: '1', viewValue: 'Belum Registrasi Ulang' },
    { value: '2', viewValue: 'Sudah Registrasi Ulang' },
    { value: '3', viewValue: 'Mengundurkan Diri' },
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
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: 'No. PMB',
          class: 'text-sm text-left border border-black-300 bg-gray-400 w-30',
          field: 'kode',
        },
        {
          label: 'Nama',
          class: 'text-sm text-left border border-black-300 bg-gray-400',
          field: 'nama',
        },
        {
          label: 'Verifikasi Perlengkapan',
          class: 'text-sm text-left border border-black-300 bg-gray-400',
          field: 'verifikasi_perlengkapan',
        },
        {
          label: 'Status Registrasi Ulang',
          class: 'text-sm text-left border border-black-300 bg-gray-400',
          field: 'status_registrasi_ulang',
        },
        {
          label: 'AKSI',
          class: 'text-sm disabled-sorting text-center w-20 border border-black-300 bg-gray-400',
          field: 'action',
        }
      ],
      field: [
        {
          class: 'text-left border border-black-300',
          field: 'nopmb',
        },
        {
          class: 'text-left border border-black-300',
          field: 'nama',
        },
        {
          class: 'text-left border border-black-300',
          field: 'verifikasi_perlengkapan',
        },
        {
          class: 'text-left border border-black-300',
          field: 'status_registrasi_ulang',
        },
        {
          class: 'text-center border border-black-300',
          field: 'action',
        }],
      action: [{
        action_name: "manageData",
        icon: "fa fa-edit",
      }, 
      {
        action_name: "manageData",
        icon: "fa fa-edit",
      }],
      data: [
        
      ]
    };
  }
}
