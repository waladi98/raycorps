import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { CustomTable } from '../../../../components/custom-table/custom-table.interface';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-riwayat-nilai',
  templateUrl: 'riwayat-nilai.component.html',
  styleUrls: ['./riwayat-nilai.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class RiwayatNilaiComponent implements OnInit {
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
          label: 'KODE',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-28',
          field: 'kode_matkul',
        },
        {
          label: 'MATAKULIAH',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-52',
          field: 'matakuliah',
        },
        {
          label: 'TAHUN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'tahun',
        },
        {
          label: 'BOBOT',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-24',
          field: 'bobot',
        },
        {
          label: 'KOREKSI',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-28',
          field: 'koreksi',
        },
        {
          label: 'EKIVALENSI',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'ekivalensi',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kode_matkul',
        },
        {
          class: 'text-left border border-black-300',
          field: 'matakuliah',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tahun',
        },
        {
          class: 'text-center border border-black-300',
          field: 'bobot',
        },
        {
          class: 'text-center border border-black-300',
          field: 'koreksi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'aktif',
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
          kode_matkul: 'IF161201',
          matakuliah: 'DASAR PEMROGRAMAN',
          tahun: '20201',
          bobot: '3.00',
          koreksi: '(E), SK: 24/03/2021',
          aktif: 'T',
        },
        {
          kode_matkul: 'IF161201',
          matakuliah: 'DASAR PEMROGRAMAN',
          tahun: '20201',
          bobot: '3.00',
          koreksi: '(E), SK: 24/03/2021',
          aktif: 'Y',
        },
        {
          kode_matkul: 'IF161201',
          matakuliah: 'DASAR PEMROGRAMAN',
          tahun: '20201',
          bobot: '3.00',
          koreksi: '(E), SK: 24/03/2021',
          aktif: 'Y',
        },
        {
          kode_matkul: 'IF161201',
          matakuliah: 'DASAR PEMROGRAMAN',
          tahun: '20201',
          bobot: '3.00',
          koreksi: '(E), SK: 24/03/2021',
          aktif: 'Y',
        },
        {
          kode_matkul: 'IF161201',
          matakuliah: 'DASAR PEMROGRAMAN',
          tahun: '20201',
          bobot: '3.00',
          koreksi: '(E), SK: 24/03/2021',
          aktif: 'Y',
        },
      ],
    };
  }
}
