import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-tambah-prs',
  templateUrl: 'tambah-prs.component.html',
  styleUrls: ['./tambah-prs.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class TambahPRSComponent implements OnInit {
  listData = {
    header: [],
    field: [],
    action: [],
    data: [],
  };

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
          label: 'KONTRAK',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'kontrak',
        },
        {
          label: 'KODE',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'kode',
        },
        {
          label: 'MATAKULIAH',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-52',
          field: 'matakuliah',
        },
        {
          label: 'NILAI',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-24',
          field: 'nilai',
        },
        {
          label: 'SKS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-28',
          field: 'sks',
        },
        {
          label: 'KELAS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'kelas',
        },
        {
          label: 'TERISI',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'terisi',
        },
        {
          label: 'KAPASITAS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'kapasitas',
        },
        {
          label: 'PRASYARAT',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'prasyarat',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'aktif',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kode',
        },
        {
          class: 'text-left border border-black-300',
          field: 'matakuliah',
        },
        {
          class: 'text-center border border-black-300',
          field: 'nilai',
        },
        {
          class: 'text-center border border-black-300',
          field: 'sks',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kelas',
        },
        {
          class: 'text-center border border-black-300',
          field: 'terisi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kapasitas',
        },
        {
          class: 'text-center border border-black-300',
          field: 'prasyarat',
        },
      ],
      action: [
        {
          action_name: 'manageData',
          action_title: 'delete',
          icon: 'fa fa-trash text-danger',
        },
      ],
      data: [
        {
          no: '',
          aktif: '',
          kode: 'IF21W0201',
          matakuliah: 'Pendidikan Pancasila',
          nilai: '-',
          sks: '2',
          kelas: '-',
          terisi: '',
          kapasitas: '',
          prasyarat: '',
        },
        {
          no: '',
          aktif: '',
          kode: 'IF21W0201',
          matakuliah: 'Pendidikan Pancasila',
          nilai: '-',
          sks: '1',
          kelas: '-',
          terisi: '',
          kapasitas: '',
          prasyarat: '',
        },
        {
          no: '',
          aktif: '',
          kode: 'IF21W0201',
          matakuliah: 'Pendidikan Pancasila',
          nilai: '-',
          sks: '3',
          kelas: '-',
          terisi: '',
          kapasitas: '',
          prasyarat: '',
        },
      ],
    };
  }
}
