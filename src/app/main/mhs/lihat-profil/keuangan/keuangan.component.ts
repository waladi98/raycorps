import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { CustomTable } from '../../../../components/custom-table/custom-table.interface';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-keuangan',
  templateUrl: 'keuangan.component.html',
  styleUrls: ['./keuangan.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class KeuanganComponent implements OnInit {
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
          label: 'Sesi',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-12',
          field: 'sesi',
        },
        {
          label: 'Tahun',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-28',
          field: 'tahun',
        },
        {
          label: 'Saldo Awal',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-52',
          field: 'saldo_awal',
        },
        {
          label: 'Biaya',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'biaya',
        },
        {
          label: 'Potongan',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-24',
          field: 'potongan',
        },
        {
          label: 'Pembayaran',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-24',
          field: 'pembayaran',
        },
        {
          label: 'Penarikan',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-24',
          field: 'penarikan',
        },
        {
          label: 'Saldo Akhir',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-24',
          field: 'saldo_akhir',
        },
      ],
    
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'sesi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tahun',
        },
        {
          class: 'text-left border border-black-300',
          field: 'saldo_awal',
        },
        {
          class: 'text-center border border-black-300',
          field: 'biaya',
        },
        {
          class: 'text-center border border-black-300',
          field: 'potongan',
        },
        {
          class: 'text-center border border-black-300',
          field: 'pembayaran',
        },
        {
          class: 'text-center border border-black-300',
          field: 'penarikan',
        },
        {
          class: 'text-center border border-black-300',
          field: 'saldo_akhir',
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
        }
      ],
    };
  }
}
