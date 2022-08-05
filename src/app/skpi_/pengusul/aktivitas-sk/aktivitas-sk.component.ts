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
import { DataService } from "../../../core/services/data.service";
import { finalize, map, takeUntil } from "rxjs/operators";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { PageEvent } from "@angular/material/paginator";

declare const require: any;
declare const $: any;

@Component({
  selector: "app-unggah-kelengkapan",
  templateUrl: "aktivitas-sk.component.html",
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class UnggahKelengkapanComponent implements OnInit {
  listData = {
    filter: false,
    type: "",
    order: "",
    where: "",
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
    this.loadData(0, "", "", this.listData.type);
  }

  loadData(page: number, filter, condition, type): void {
    this.isLoadingTable = true;
    this.listData.type = type;

    if (type == "order") {
      this.listData.order = filter;
    } else if (type == "filter") {
      this.listData.where = condition;
    }

    this.dataService
      .getPostRequest<any>("", {
        offset: page,
        limit: this.pageSize,
        order: this.listData.order,
        where: this.listData.where,
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
    //console.log(event);
    this.loadData(event.pageIndex + 0, "", "", this.listData.type);
  }

  inisialisasiTable() {
    this.listData = {
      filter: false,
      type: "",
      order: "",
      where: "",
      header: [
        {
          label: "#",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
          field: "no",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          label: "Jenis Kegiatan",
          class:
            "text-sm text-center border border-black-300 bg-gray-400 w-max",
          field: "kode",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          label: "Kegiatan",
          class:
            "text-sm text-center border border-black-300 bg-gray-400 w-max",
          field: "tahun_akademik",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          label: "Tingkat",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "id_gelombang",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          label: "Partisipasi",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "nama",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          label: "Bobot",
          class:
            "text-sm disabled-sorting text-center w-40 border border-black-300 bg-gray-400",
          field: "action",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          label: "Dokumen",
          class:
            "text-sm disabled-sorting text-center w-40 border border-black-300 bg-gray-400",
          field: "action",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          label: "Status",
          class:
            "text-sm disabled-sorting text-center w-40 border border-black-300 bg-gray-400",
          field: "action",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          label: "Aksi",
          class:
            "text-sm disabled-sorting text-center w-40 border border-black-300 bg-gray-400",
          field: "action",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
      ],
      field: [
        {
          class: "text-center border border-black-300",
          field: "no",
        },
        {
          class: "text-center border border-black-300",
          field: "jenis_kegiatan",
        },
        {
          class: "text-center  border border-black-300",
          field: "kegiatan",
        },
        {
          class: "text-center border border-black-300",
          field: "tingkat",
        },
        {
          class: "text-center border border-black-300",
          field: "partisipasi",
        },
        {
          class: "text-center border border-black-300",
          field: "bobot",
        },
        {
          class: "text-center border border-black-300",
          field: "dokumen",
        },
        {
          class: "text-center border border-black-300",
          field: "status",
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
      data: [
        {
          id: "1",
          jenis_kegiatan: "kegiatan pilihan",
          kegiatan: "Lorem",
          tingkat: "Internasional",
          partisipasi: "juara 1",
          bobot: "50",
          dokumen: "Belum Unggah",
          status: "Usulan",
        },
      ],
    };
  }

  // inisialisasiTable() {
  //   this.listData = {
  //     header: [
  //       {
  //         label: 'ID',
  //         class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
  //         field: 'no',
  //       },
  //       {
  //         label: 'Nama Dokumen',
  //         class: 'text-sm text-left border border-black-300 bg-gray-400 w-30',
  //         field: 'kode',
  //       },
  //       {
  //         label: 'Status',
  //         class: 'text-sm text-left border border-black-300 bg-gray-400',
  //         field: 'nama',
  //       },
  //       {
  //         label: 'Keterangan',
  //         class: 'text-sm text-left border border-black-300 bg-gray-400',
  //         field: 'kode_prodi',
  //       },
  //       // {
  //       //   label: 'WAKTU UBAH',
  //       //   class: 'text-sm text-left border border-black-300 bg-gray-400',
  //       //   field: 'status',
  //       // },
  //       {
  //         label: 'AKSI',
  //         class: 'text-sm disabled-sorting text-center w-20 border border-black-300 bg-gray-400',
  //         field: 'action',
  //       }
  //     ],
  //     field: [
  //       {
  //         class: 'text-center border border-black-300',
  //         field: 'no',
  //       },
  //       {
  //         class: 'text-left border border-black-300',
  //         field: 'kode',
  //       },
  //       {
  //         class: 'text-left border border-black-300',
  //         field: 'nama',
  //       },
  //       {
  //         class: 'text-left border border-black-300',
  //         field: 'kode_prodi',
  //       },
  //       {
  //         class: 'text-left border border-black-300',
  //         field: 'aktif',
  //       },
  //       {
  //         class: 'text-left border border-black-300',
  //         field: 'aktif',
  //       },
  //       // {
  //       //   class: 'text-left border border-black-300',
  //       //   field: 'aktif',
  //       // },
  //       {
  //         class: 'text-center border border-black-300',
  //         field: 'action',
  //       }],
  //     action: [{
  //       action_name: "manageData",
  //       icon: "fa fa-edit",
  //     }],
  //     data: []
  //   };
  // }

  setSortBy(field, type, data) {
    for (let i = 0; i < this.listData.header.length; i++) {
      if (this.listData.header[i].field != field) {
        this.listData.header[i].sort_type = "";
      }
    }

    data.sort_type = type;

    let order = field + " " + type;

    if (type == "") {
      order = "";
    }

    this.loadData(0, order, "", "order");
  }

  setFilterBy(field, filter, data) {
    if (data.filter_type == "text" && filter.length < 2) {
      if (filter == "") {
        for (let i = 0; i < this.listData.header.length; i++) {
          if (
            this.listData.header[i].field == field &&
            this.listData.header[i].filter_value == ""
          ) {
            this.loadData(0, "", "", this.listData.type);
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

    if (filter == "") {
      for (let i = 0; i < this.listData.header.length; i++) {
        if (
          this.listData.header[i].field == field &&
          this.listData.header[i].filter_value == ""
        ) {
          this.loadData(0, "", "", this.listData.type);
        }
      }
      return true;
    }

    let search = field + " like '%" + filter + "%'";

    this.loadData(0, "", search, "filter");
  }
}
