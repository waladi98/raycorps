import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { CustomTable } from '../../../../../../components/custom-table/custom-table.interface';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-pengajaran',
  templateUrl: 'pengajaran.component.html',
  styleUrls: ['./pengajaran.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PengajaranComponent implements OnInit {
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

  // @Input() listData: CustomTable;

  eventsLoad: Subject<void> = new Subject<void>();

  loadDataTable() {
    this.eventsLoad.next();
  }

  // isScreenSmall: boolean;
  // length = 100;
  // pageSize = 10;
  // pageSizeOptions: number[] = [5, 10, 25, 100];
  // isLoadingTable = true;
  // where = '';
  // order = '';

  // @Output('change') sizeChange = new EventEmitter<number>();

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

  // onChangePaginator(event: PageEvent): void {
  //   this.pageSize = event.pageSize;
  // }

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: '#',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'no',
        },
        {
          label: 'TAHUN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'tahun',
        },
        {
          label: 'KODE',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'kode',
        },
        {
          label: 'MATAKULIAH',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'matakuliah',
        },
        {
          label: 'KELAS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'kelas',
        },
        {
          label: 'JENIS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'jenis',
        },
        {
          label: 'HARI',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'hari',
        },
        {
          label: 'JAM',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'jam',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tahun',
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
          field: 'kelas',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jenis',
        },
        {
          class: 'text-center border border-black-300',
          field: 'hari',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jam',
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
          tahun: '20022',
          kode: 'IF801',
          matakuliah: 'KOMPUTER DAN MASYARAKAT',
          kelas: '01',
          jenis: 'K',
          hari: 'SENIN',
          jam: '08:00:00 ~ 09:59:00',
        },
        {
          tahun: '20022',
          kode: 'IF801',
          matakuliah: 'KOMPUTER DAN MASYARAKAT',
          kelas: '02',
          jenis: 'K',
          hari: 'SENIN',
          jam: '08:00:00 ~ 09:59:00',
        },
        {
          tahun: '20041',
          kode: 'IF387',
          matakuliah: 'SISTEM PENGARSIPAN DAN AKSES',
          kelas: '01',
          jenis: 'K',
          hari: 'SENIN',
          jam: '08:00:00 ~ 09:59:00',
        },
        {
          tahun: '20041',
          kode: 'IF387',
          matakuliah: 'SISTEM PENGARSIPAN DAN AKSES',
          kelas: '02',
          jenis: 'K',
          hari: 'SENIN',
          jam: '08:00:00 ~ 09:59:00',
        },
        {
          tahun: '20041',
          kode: 'IF387',
          matakuliah: 'SISTEM PENGARSIPAN DAN AKSES',
          kelas: '03',
          jenis: 'K',
          hari: 'SENIN',
          jam: '08:00:00 ~ 09:59:00',
        },
      ],
    };
  }
}
