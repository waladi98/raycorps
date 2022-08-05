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
import { MatDialog } from "@angular/material/dialog";

import { CustomTable } from "../../../../../../components/custom-table/custom-table.interface";

declare const require: any;
declare const $: any;

@Component({
  selector: "app-dosen-pelatihan",
  templateUrl: "pelatihan.component.html",
  styleUrls: ["./pelatihan.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PelatihanComponent implements OnInit {
  listData: CustomTable;

  eventsLoad: Subject<void> = new Subject<void>();

  loadDataTable() {
    this.eventsLoad.next();
  }

  isLoadingTable = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  params: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    public dialog: MatDialog
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
      filter: false,
      init_load: true,
      is_role: true,
      is_role_params: {
        prodi: "",
      },
      endpoint: "",
      action_name: "",
      type: "",
      order: "",
      where: "",
      group: "",
      dynamic_header_field: "",
      dynamic_header_name: "",
      dynamic_header_value: "",
      dynamic_header_type: "",
      dynamic_header_add_index: 0,
      filter_data: [
        /*{
          id: "tahun_akademik",
          label: "Tahun Akademik",
          data_list: [],
          type: "select",
          is_filter: false,
          value:null,
          trigger:false,
          trigger_id:"kode_gelombang",
          trigger_params:null,
          api: {
            endpoint: "/master/tahunAkademik",
            where: "id_aktif='Y' ",
            id: "kode",
            label: "tahun_akademik",
          },
        },
        {
          id: "kode_gelombang",
          label: "Gelombang",
          data_list: [],
          type: "select",
          is_filter: true,
          value:null,
          trigger:true,
          trigger_id:null,
          trigger_params:"kode_tahun_akademik",
          api: {
            endpoint: "/pmb/master/gelombang",
            where: "",
            id: "kode",
            label: "nama",
          },
        },
        {
          id: "kode_prodi",
          label: "Prodi",
          data_list: [],
          type: "select",
          is_filter: true,
          value:null,
          trigger:false,
          trigger_id:null,
          trigger_params:null,
          api: {
            endpoint: "/master/prodi",
            where: "id_aktif='Y'",
            prodi_role:{
              param:"kode",
              is_role:true
            },
            id: "kode",
            label: "prodi",
          },
        }
        /*{
          id: "prodi",
          label: "Prodi",
          data_list: [],
          type: "select",
          value:null,
          trigger:false,
          trigger_id:null,
          trigger_params:null,
          api: {
            endpoint: "/master/prodi",
            where: "id_aktif='Y' ",
            id: "kode",
            label: "prodi",
          },
        }*/
      ],
      header: [
        {
          type: "",
          label: "#",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-20",
          field: "no",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Edit",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-30",
          field: "aksi",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Nama Pelatihan",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "nama_pelatihan",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Peran",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "peran",
          filter: false,
          filter_type: "select",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Nama Forum",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "nama_forum",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Tempat",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "tempat",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Tahun",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-30",
          field: "tahun",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "NA",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-30",
          field: "na",
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
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "no",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "aksi",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "nama_pelatihan",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "peran",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "nama_forum",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "tempat",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "tahun",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "na",
        },
      ],
      action: [
        {
          id_params: "",
          route: "",
          type: "route",
          icon: "fa fa-info-circle text-info",
          toolTip: "Informasi Lengkap Peserta",
        },
      ],
      data: [
        {
          nama_pelatihan: "Nama Pelatihan 1",
          peran: "Peran 1",
          nama_forum: "Forum 1",
          tempat: "Tempat 1",
          tahun: "2022",
          na: "Y",
        },
        {
          nama_pelatihan: "Nama Pelatihan 2",
          peran: "Peran 2",
          nama_forum: "Forum 2",
          tempat: "Tempat 2",
          tahun: "20223",
          na: "Y",
        },
        {
          nama_pelatihan: "Nama Pelatihan 3",
          peran: "Peran 3",
          nama_forum: "Forum 3",
          tempat: "Tempat 3",
          tahun: "2024",
          na: "N",
        },
        {
          nama_pelatihan: "Nama Pelatihan 4",
          peran: "Peran 4",
          nama_forum: "Forum 4",
          tempat: "Tempat 4",
          tahun: "2024",
          na: "Y",
        },
      ],
    };
  }
}
