import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { CustomTable } from '../../../../../../components/custom-table/custom-table.interface';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-penelitian',
  templateUrl: 'penelitian.component.html',
  styleUrls: ['./penelitian.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PenelitianComponent implements OnInit {
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
          label: 'DETAIL',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'action',
        },
        {
          label: 'PENELITIAN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'penelitian',
        },
        {
          label: 'JUDUL PENELITIAN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'judul_penelitian',
        },
        {
          label: 'PERAN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'peran',
        },
        {
          label: 'TEMPAT',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'tempat',
        },
        {
          label: 'JENIS PENELITIAN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'jenis_penelitian',
        },
        {
          label: 'BIDANG KAJIAN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'bidang_kajian',
        },
        {
          label: 'PENDANAAN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'pendanaan',
        },
        {
          label: 'TAHUN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'tahun',
        },
        {
          label: 'na',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'na',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'action',
        },
        {
          class: 'text-left border border-black-300',
          field: 'penelitian',
        },
        {
          class: 'text-center border border-black-300',
          field: 'judul_penelitian',
        },
        {
          class: 'text-center border border-black-300',
          field: 'peran',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tempat',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jenis_penelitian',
        },
        {
          class: 'text-center border border-black-300',
          field: 'bidang_kajian',
        },
        {
          class: 'text-center border border-black-300',
          field: 'pendanaan',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tahun',
        },
        {
          class: 'text-center border border-black-300',
          field: 'na',
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
          action: 'manageData',
          penelitian: '=NamaPenelitian=',
          judul_penelitian: '=JudulPenelitian=',
          peran: '=Role=',
          tempat: '=Tempat=',
          jenis_penelitian: '=JenisPenelitian=',
          bidang_kajian: '=BidangKajian=',
          pendanaan: '=Pendanaan=',
          tahun: '=Tahun=',
          na: 'NA',
        },
        {
          action: 'manageData',
          penelitian: '=NamaPenelitian=',
          judul_penelitian: '=JudulPenelitian=',
          peran: '=Role=',
          tempat: '=Tempat=',
          jenis_penelitian: '=JenisPenelitian=',
          bidang_kajian: '=BidangKajian=',
          pendanaan: '=Pendanaan=',
          tahun: '=Tahun=',
          na: 'NA',
        },
        {
          action: 'manageData',
          penelitian: '=NamaPenelitian=',
          judul_penelitian: '=JudulPenelitian=',
          peran: '=Role=',
          tempat: '=Tempat=',
          jenis_penelitian: '=JenisPenelitian=',
          bidang_kajian: '=BidangKajian=',
          pendanaan: '=Pendanaan=',
          tahun: '=Tahun=',
          na: 'NA',
        },
        {
          action: 'manageData',
          penelitian: '=NamaPenelitian=',
          judul_penelitian: '=JudulPenelitian=',
          peran: '=Role=',
          tempat: '=Tempat=',
          jenis_penelitian: '=JenisPenelitian=',
          bidang_kajian: '=BidangKajian=',
          pendanaan: '=Pendanaan=',
          tahun: '=Tahun=',
          na: 'NA',
        },
      ],
    };
  }
}
