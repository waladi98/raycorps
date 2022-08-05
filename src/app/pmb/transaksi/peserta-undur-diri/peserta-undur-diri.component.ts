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
import { CustomTable } from "../../../components/custom-table/custom-table.interface";
import { AuthService } from "../../../core/auth/auth.service";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { Subject, Subscription, Observable } from "rxjs";

declare const require: any;
declare const $: any;

@Component({
  selector: "app-peserta-undur-diri",
  templateUrl: "peserta-undur-diri.component.html",
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PesertaUndurDiriComponent implements OnInit {
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
  FormDialogComponent = FormDialogComponent;
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private dataService: DataService,
    public breakpointObserver: BreakpointObserver,
    private _authService: AuthService,
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

  inisialisasiTable() {
    this.listData = {
      is_action: true,
      export: [
        {
          type: "csv",
          label: "CSV",
          label_report: "report-proses-persyaratan",
        },
        {
          type: "pdf",
          label: "PDF",
          label_report: "report-proses-persyaratan",
        },
        {
          type: "excel",
          label: "XLSX",
          label_report: "report-proses-persyaratan",
        },
      ],
      filter: true,
      init_load: true,
      is_role: true,
      is_role_params: {
        prodi: "kode_prodi",
      },
      endpoint: "pmb/pesertaUndurDiri",
      action_name: "",
      type: "",
      order: "id_status_dokumen asc",
      where: "",
      group: "",
      dynamic_header_field: "",
      dynamic_header_name: "",
      dynamic_header_value: "",
      dynamic_header_type: "",
      dynamic_header_add_index: 0,
      filter_data: [
        {
          id: "tahun_akademik",
          label: "Tahun Akademik",
          data_list: [],
          type: "select",
          is_filter: false,
          value: null,
          trigger: false,
          trigger_id: "kode_gelombang",
          trigger_params: null,
          api: {
            endpoint: "/master/tahunAkademik",
            where: "id_aktif='Y' ",
            id: "tahun",
            label: "tahun_akademik",
          },
        },
        {
          id: "kode_gelombang",
          label: "Gelombang",
          data_list: [],
          type: "select",
          is_filter: true,
          value: null,
          trigger: true,
          trigger_id: null,
          trigger_params: "kode_tahun_akademik",
          api: {
            endpoint: "/pmb/master/gelombang",
            where: "",
            id: "kode",
            label: "nama",
            concat: [
              {
                type: "string",
                field: "Gelombang",
              },
              {
                type: "string",
                field: " ",
              },
              {
                type: "value",
                field: "id_gelombang",
              },
            ],
          },
        },
        {
          id: "kode_prodi",
          label: "Prodi",
          data_list: [],
          type: "select",
          is_filter: true,
          value: null,
          trigger: false,
          trigger_id: null,
          trigger_params: null,
          first_index_selected: true,
          api: {
            endpoint: "/master/prodi",
            where: "id_aktif='Y'",
            prodi_role: {
              param: "kode",
              is_role: true,
            },
            id: "kode",
            label: "prodi",
          },
        },
      ],
      header: [
        {
          type: "",
          label: "#",
          class: "text-sm text-center border border-black-300 bg-gray-400",
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
          label: "Peserta",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "peserta",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Handphone",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "peserta",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "No. Rek",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-10",
          field: "peserta",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Alasan",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
          field: "dokumen_persyaratan",
          filter: null,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Keterangan",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-30",
          field: "dokumen_kelengkapan",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "status?",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-30",
          field: "dokumen_kelengkapan",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Dokumen",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "dokumen_kelengkapan",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "AKSI",
          class:
            "text-sm disabled-sorting text-center border border-black-300 bg-gray-400",
          field: "action",
          filter: false,
          filter_type: null,
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
          class: "text-center border border-black-300 w-5",
          field: "no",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-32",
          field: "peserta",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-24",
          field: "handphone",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "nomor_rekening",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 dokumen w-32",
          field: "alasan_pengunduran_diri",
        },
        {
          count_field: [],
          type: "",
          class: "text-left border border-black-300 dokumen w-32",
          field: "keterangan_undur_diri",
        },
        {
          count_field: [],
          type: "",
          class: "text-center border border-black-300 dokumen w-32",
          field: "status_dokumen",
        },
        {
          type: "download",
          count_field: [],
          class: "text-center border border-black-300 w-7",
          field: "path_to_dokumen",
          condition: {
            field: "path_to_dokumen",
            is_show_value: true,
            default: "Tidak Ada File",
          },
        },
        {
          type: "action",
          count_field: [],
          class: "text-center border border-black-300 w-5",
          field: "action",
        },
      ],
      action: [
        {
          id_params: "id",
          type: "dialog",
          controller: "FormDialogComponent",
          icon: "fa fa-edit text-warning",
          toolTip: "Proses Undur Diri",
          condition: [
            {
              params_1: "id_status_dokumen",
              operator: "!=",
              params_2: "0",
            },
          ],
        },
      ],
      data: [],
    };
  }
  dialogData(data) {
    const dialogRef = this.dialog.open(this[data.controller], {
      data: {
        type: data.data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadDataTable();
    });

    console.log(data);
  }
}
