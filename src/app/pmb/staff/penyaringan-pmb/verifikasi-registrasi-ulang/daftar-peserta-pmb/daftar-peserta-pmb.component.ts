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
  selector: 'app-daftar-peserta-pmb',
  templateUrl: 'daftar-peserta-pmb.component.html',
  styleUrls: ['./daftar-peserta-pmb.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class DaftarPesertaPMBComponent implements OnInit {
  listData = {
    header: [],
    field: [],
    action: [],
    data: []
  };

  isLoadingTable = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  params: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private router: Router,
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

  verifyData(){
    this.router.navigate(['/pmb/staff/penyaringan-pmb/verifikasi-registrasi-ulang/verifikasi-reg-ulang']);
  }

  manageData(){
    this.router.navigate(['/pmb/staff/penyaringan-pmb/verifikasi-registrasi-ulang/informasi-lengkap-peserta']);
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
          class: 'text-sm disabled-sorting text-center w-30 border border-black-300 bg-gray-400',
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
          action_name: "verifyData",
          icon: "fa fa-edit text-warning",
          toolTip: "Verifikasi Kelulusan Peserta"
        }, 
        {
          action_name: "manageData",
          icon: "fa fa-info-circle text-info",
          toolTip: "Informasi Lengkap Peserta"
        }],
      data: [{
        nopmb: '1',
        nama: 'Gelombang 1',
        verifikasi_perlengkapan: 'PMB202101080',
        status_registrasi_ulang: '1',
      }]
    };
  }
}
