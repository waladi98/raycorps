import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { CustomTable } from '../../../../../../components/custom-table/custom-table.interface';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-struktural',
  templateUrl: 'struktural.component.html',
  styleUrls: ['./struktural.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class StrukturalComponent implements OnInit {
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
          label: 'EDIT',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'action',
        },
        {
          label: 'JABATAN STRUKTURAL',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'jabatan_struktural',
        },
        {
          label: 'UNIT KERJA',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'unit_kerja',
        },
        {
          label: 'TAHUN MULAI',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'tahun_mulai',
        },
        {
          label: 'TAHUN SELESAI',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'tahun_selesai',
        },
        {
          label: 'NOMOR SK',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'nomor_sk',
        },
        {
          label: 'NA',
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
          field: 'jabatan_struktural',
        },
        {
          class: 'text-center border border-black-300',
          field: 'unit_kerja',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tahun_mulai',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tahun_selesai',
        },
        {
          class: 'text-center border border-black-300',
          field: 'nomor_sk',
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
          jabatan_struktural: 'Wakil Dekan I',
          unit_kerja: '',
          tahun_mulai: '2017',
          tahun_selesai: '2022',
          nomor_sk: '',
          na: '',
        },
        {
          action: 'manageData',
          jabatan_struktural: 'Sekretaris Prodi',
          unit_kerja: 'Teknik Informatika',
          tahun_mulai: '2014',
          tahun_selesai: '2017',
          nomor_sk: '',
          na: '',
        },
        {
          action: 'manageData',
          jabatan_struktural: 'Ketua Program Studi',
          unit_kerja: 'Teknik Informatika',
          tahun_mulai: '2010',
          tahun_selesai: '2014',
          nomor_sk: '',
          na: '',
        },
        {
          action: 'manageData',
          jabatan_struktural: 'Ketua Program Studi',
          unit_kerja: 'Teknik Informatika',
          tahun_mulai: '2006',
          tahun_selesai: '2010',
          nomor_sk: '',
          na: '',
        },
        {
          action: 'manageData',
          jabatan_struktural: 'Sekretaris Prodi',
          unit_kerja: 'Teknik Informatika',
          tahun_mulai: '2000',
          tahun_selesai: '2005',
          nomor_sk: '',
          na: '',
        },
      ],
    };
  }
}
