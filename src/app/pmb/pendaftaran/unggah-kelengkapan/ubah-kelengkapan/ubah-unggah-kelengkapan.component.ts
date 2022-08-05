import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl,
} from "@angular/platform-browser";
import { Router, Route, ActivatedRoute } from "@angular/router";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { PageEvent } from "@angular/material/paginator";

declare const require: any;
declare const $: any;

@Component({
  selector: "app-ubah-unggah-kelengkapan",
  templateUrl: "ubah-unggah-kelengkapan.component.html",
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class UbahUnggahKelengkapanComponent implements OnInit {
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
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenSmall = true;
          console.log("Matches small viewport or handset in portrait mode");
        } else {
          this.isScreenSmall = false;
        }
      });
    this._activatedRoute.params.subscribe(
      (params: any) => (this.params = params)
    );
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
          label: "ID",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-20",
          field: "no",
        },
        {
          label: "Nama Dokumen",
          class: "text-sm text-left border border-black-300 bg-gray-400 w-30",
          field: "kode",
        },
        {
          label: "Status",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: "nama",
        },
        {
          label: "Keterangan",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: "kode_prodi",
        },
        // {
        //   label: 'WAKTU UBAH',
        //   class: 'text-sm text-left border border-black-300 bg-gray-400',
        //   field: 'status',
        // },
        {
          label: "AKSI",
          class:
            "text-sm disabled-sorting text-center w-20 border border-black-300 bg-gray-400",
          field: "action",
        },
      ],
      field: [
        {
          class: "text-center border border-black-300",
          field: "no",
        },
        {
          class: "text-left border border-black-300",
          field: "kode",
        },
        {
          class: "text-left border border-black-300",
          field: "nama",
        },
        {
          class: "text-left border border-black-300",
          field: "kode_prodi",
        },
        {
          class: "text-left border border-black-300",
          field: "aktif",
        },
        {
          class: "text-left border border-black-300",
          field: "aktif",
        },
        // {
        //   class: 'text-left border border-black-300',
        //   field: 'aktif',
        // },
        {
          class: "text-center border border-black-300",
          field: "action",
        },
      ],
      action: [
        {
          action_name: "manageData",
          icon: "fa fa-edit",
        },
      ],
      data: [],
    };
  }
}
