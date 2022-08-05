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

import { CustomTable } from "../../../../components/custom-table/custom-table.interface";

declare const require: any;
declare const $: any;

@Component({
  selector: "app-dosen-pekerjaan",
  templateUrl: "pekerjaan.component.html",
  styleUrls: ["./pekerjaan.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PekerjaanComponent implements OnInit {
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
      init_load: false,
      is_role: true,
      is_role_params: {
        prodi: "kode_prodi",
      },
      endpoint: "/pmb/Peserta",
      action_name: "",
      type: "",
      order: "",
      where: "lulus = 'Y'",
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
          field: "id",
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
          field: "id",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Jabatan",
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
          type: "",
          label: "Nama Institusi",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "kode_gelombang",
          filter: false,
          filter_type: "select",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Bidang Usaha",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "keterangan_disablitas",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Alamat Institusi",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "keterangan_disablitas",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Kota",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-30",
          field: "formulir_id",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Kode Pos",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-30",
          field: "formulir_id",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Telepon",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-30",
          field: "formulir_id",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Fax",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-30",
          field: "formulir_id",
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
          field: "formulir_id",
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
          field: "id",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "formulir_id",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "gelombang",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "jenis_formulir",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "nama",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "status_seleksi",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "kode_program",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "prodi",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "pilihan_ke",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "jurusan_sekolah",
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
          no: "1",
          nopmb: "123",
          nama: "PMB202101080",
          verifikasidokumen: "1",
        },
        {
          no: "2",
          nopmb: "124",
          nama: "PMB202101081",
          verifikasidokumen: "1",
        },
        {
          no: "3",
          nopmb: "125",
          nama: "PMB202101082",
          verifikasidokumen: "1",
        },
      ],
    };
  }
}
