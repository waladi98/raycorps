 import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { DataService} from '../../core/services/data.service';
import { finalize, map, takeUntil } from 'rxjs/operators';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { StorageService } from '../../core/services/storage.service';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-unggah-persyaratan',
  templateUrl: 'unggah-persyaratan.component.html',
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class UnggahPersyaratanComponent implements OnInit {
  listData = {
    filter: false,
    type: '',
    order: '',
    where: '',
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
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private dataService: DataService,
    public breakpointObserver: BreakpointObserver,
    private _storageService: StorageService
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
    this.loadInitialData();
    this.inisialisasiTable();
    this.loadData(0, '', '', this.listData.type);
   
  }

  loadData(page: number, filter, condition, type): void {
    // console.log("ini nomor test :"+this.dataPeserta.id);
    this.isLoadingTable = true;
    this.listData.type = type;

    if (type == 'order') {
      this.listData.order = filter;
    } else if (type == 'filter') {
      this.listData.where = condition;
    }

    this.dataService
      .getPostRequest<any>("/pmb/pesertaPersyaratan", {
        offset: page,
        limit: this.pageSize,
        order: this.listData.order,
        where: this.listData.where
      })
      .pipe(
        map((response) => response),
        finalize(() => setTimeout(() => (this.isLoadingTable = false), 1000))
      )
      .subscribe(
        (response) => {
          this.listData.data = response.result;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
    console.log(event);
    this.loadData(event.pageIndex + 0, '', '', this.listData.type);
  }

  inisialisasiTable() {
    this.listData = {
      filter: false,
      type: '',
      order: '',
      where: '',
      header: [
        {
          label: "#",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
          field: "no",
          filter: false, filter_type: 'text', filter_value: null, sort: false, sort_type: '', data: []
        },
        {
          label: "Persyaratan",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-max",
          field: "persyaratan",
          filter: false, filter_type: 'text', filter_value: null, sort: true, sort_type: '', data: []
        },
        {
          label: "Dokumen",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-max",
          field: "path_to_dokumen",
          filter: false, filter_type: 'text', filter_value: null, sort: true, sort_type: '', data: []
        },
        {
          label: "Wajib",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "required",
          filter: false, filter_type: 'text', filter_value: null, sort: false, sort_type: '', data: []
        },
        {
          label: "Status Dokumen",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: "status_dokumen",
          filter: false, filter_type: 'text', filter_value: null, sort: false, sort_type: '', data: []
        },
        {
          label: "Aksi",
          class:
            "text-sm disabled-sorting text-center w-40 border border-black-300 bg-gray-400",
          field: "action",
          filter: false, filter_type: 'text', filter_value: null, sort: false, sort_type: '', data: []
        },
      ],
      field: [
        {
          class: "text-center border border-black-300",
          field: "no",
        },
        {
          class: "text-center border border-black-300",
          field: "persyaratan",
        },
        {
          class: "text-center  border border-black-300",
          field: "path_to_dokumen",
        },
        {
          class: "text-center border border-black-300",
          field: "required",
        },
        {
          class: "text-left border border-black-300",
          field: "status_dokumen",
        },
        {
          class: "text-left border border-black-300",
          field: "action",
        },
      ],
      action: [
        {
          action_name: "detailData",
          icon: "fa fa-info-circle",
        },
        {
          action_name: "ubahData",
          icon: "fa fa-edit text-warning",
        },
        {
          action_name: "deleteData",
          icon: "fa fa-trash text-danger",
        },
      ],
      data: [],
    };
  }


  setSortBy(field, type, data) {

    for (let i = 0; i < this.listData.header.length; i++) {
      if (this.listData.header[i].field != field) {
        this.listData.header[i].sort_type = '';
      }
    }

    data.sort_type = type;

    let order = field + ' ' + type

    if (type == '') {
      order = '';
    }

    this.loadData(0, order, '', 'order');
  }

  setFilterBy(field, filter, data) {

    if (data.filter_type == 'text' && filter.length < 2) {
      if (filter == '') {
        for (let i = 0; i < this.listData.header.length; i++) {
          if (this.listData.header[i].field == field && this.listData.header[i].filter_value == '') {
            this.loadData(0, '', '', this.listData.type);
          }
        }
      }
      return true;
    }

    for (let i = 0; i < this.listData.header.length; i++) {
      if (this.listData.header[i].field != field) {
        this.listData.header[i].filter_value = null;
      }
    }

    if (filter == '') {
      for (let i = 0; i < this.listData.header.length; i++) {
        if (this.listData.header[i].field == field && this.listData.header[i].filter_value == '') {
          this.loadData(0, '', '', this.listData.type);
        }
      }
      return true;
    }

    let search = field + " like '%" + filter + "%'"

    this.loadData(0, '', search, 'filter');
  }

  dataPeserta: any;

  loadDataPeserta(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/peserta", {
        where: "formulir_id='" + this._storageService.get("username") + "'",
      })
      .toPromise();
  }

  async loadInitialData(): Promise<any> {
    try {
      const request = [this.loadDataPeserta()];
      const [dataPeserta] = await Promise.all(request);
      this.dataPeserta = dataPeserta.result[0];

      // console.log("ini data peserta" + dataPeserta.id);
      // var str = JSON.stringify(dataPeserta);
      // str = JSON.stringify(dataPeserta, null, 4); // (Optional) beautiful indented output.
      // console.log(str); // Logs output to dev tools console.
    } catch (error) {
      console.log(error);
    }
  }
 
  
}
