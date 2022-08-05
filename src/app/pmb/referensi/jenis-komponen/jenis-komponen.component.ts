import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router, Route, ActivatedRoute } from "@angular/router";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { finalize, map, takeUntil } from "rxjs/operators";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { DataService } from "../../../core/services/data.service";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";

import { CustomTable } from '../../../components/custom-table/custom-table.interface';

declare const require: any;

declare const $: any;

@Component({
  selector: "app-gelombang",
  templateUrl: "jenis-komponen.component.html",
  styleUrls: ["./jenis-komponen.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class JenisKomponenComponent implements OnInit {
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
  FormDialogComponent=FormDialogComponent;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private dataService: DataService,
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
    this.loadData(0);
  }

  loadData(page: number): void {
    this.isLoadingTable = true;
    this.dataService
      .getPostRequest<any>("/pmb/master/komponen", {
        where: "id_jenis_komponen = 1",
        offset: page,
        limit: this.pageSize,
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
  manageData(data) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        type: data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteData(data) {
    swal
      .fire({
        title: "Hapus Jenis Komponen",
        text: "Apakah Yakin Akan Menghapus Data Ini?",
        icon: "warning",
        showCancelButton: true,
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        buttonsStyling: false,
      })
      .then((result) => {
        if (result.value) {
          swal.fire({
            title: "Dihapuskan!",
            text: "Jenis Komponen Telah Dihapuskan.",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false,
          });
        } else {
          swal.fire({
            title: "Dibatalkan",
            text: "Jenis Komponen Tidak Jadi Dihapuskan",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-info",
            },
            buttonsStyling: false,
          });
        }
      });
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
    console.log(event);
    this.loadData(event.pageIndex + 0);
  }

  // inisialisasiTable() {
  //   this.listData = {
  //     header: [
  //       {
  //         label: "ID",
  //         class: "text-sm text-center border border-black-300 bg-gray-400 w-20",
  //         field: "no",
  //       },
  //       {
  //         label: "Jenis Komponen",
  //         class: "text-sm text-left border border-black-300 bg-gray-400 w-30",
  //         field: "kode",
  //       },
  //       {
  //         label: "AKTIF",
  //         class: "text-sm text-left border border-black-300 bg-gray-400",
  //         field: "jenis_komponen",
  //       },
  //       {
  //         label: "DIBUAT OLEH",
  //         class: "text-sm text-left border border-black-300 bg-gray-400",
  //         field: "kode_prodi",
  //       },
  //       {
  //         label: "WAKTU UBAH",
  //         class: "text-sm text-left border border-black-300 bg-gray-400",
  //         field: "status",
  //       },
  //       {
  //         label: "AKSI",
  //         class:
  //           "text-sm disabled-sorting text-center w-25 border border-black-300 bg-gray-400",
  //         field: "action",
  //       },
  //     ],
  //     field: [
  //       {
  //         class: "text-center border border-black-300",
  //         field: "id",
  //       },
  //       {
  //         class: "text-left border border-black-300",
  //         field: "jenis_komponen",
  //       },
  //       {
  //         class: "text-left border border-black-300",
  //         field: "id_aktif",
  //       },
  //       {
  //         class: "text-left border border-black-300",
  //         field: "diubah_oleh",
  //       },
  //       {
  //         class: "text-left border border-black-300",
  //         field: "waktu_ubah",
  //       },
  //       {
  //         class: "text-center border border-black-300",
  //         field: "action",
  //       },
  //     ],
  //     action: [
  //       {
  //         action_name: "manageData",
  //         icon: "fa fa-edit text-warning",
  //         toolTip: "Edit Data",
  //       },
  //       {
  //         action_name: "deleteData",
  //         icon: "fa fa-trash text-danger",
  //         toolTip: "Delete Data",
  //       },
  //     ],
  //     data: [],
  //   };
  // }

  inisialisasiTable() {
    this.listData = {
      add_data: {
        type: "dialog",
        controller: "FormDialogComponent"
      },
      is_action: true,
      filter: false,
      init_load: true,
      is_role: false,
      is_role_params: {
        prodi: ''
      },
      endpoint: 'pmb/referensi/jenisKomponen',
      endpoint_local: '',
      action_name: '',
      type: "",
      order: "",
      where: "",
      group: "",
      dynamic_header_field: "",
      dynamic_header_name: "",
      dynamic_header_value: "",
      dynamic_header_type: "",
      dynamic_header_add_index: 0,
      filter_builder: true,
      filter_data: [],
      header: [
        {
          type: "select",
          label: '',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
          field: '-',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'ID',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
          field: 'id',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Jenis Komponen',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'jenis_komponen',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Aktif',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'aktif',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Diubah Oleh',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'diubah_oleh',
          filter: false,
          filter_type: "select",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Waktu Ubah',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'waktu_ubah',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Aksi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'actions',
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
          type: "select",
          count_field: [],
          class: 'text-center border border-black-300',
          field: '-',
        },
        {
          type: "",
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'id',
        },
        {
          type: "",
          count_field: [],
          class: 'text-left border border-black-300',
          field: 'jenis_komponen',
        },
        {
          type: "",
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'id_aktif',
        },
        {
          type: "",
          count_field: [],
          class: 'text-left border border-black-300',
          field: 'diubah_oleh',
        },
        {
          type: "",
          count_field: [],
          class: 'text-left border border-black-300',
          field: 'waktu_ubah',
        },
        {
          type: "action",
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'action',
        }],
      action: [
        {
          id_params: "id",
          route: "pmb/referensi/jenis-komponen/ubah-jenis-komponen",
          type: "route",
          icon: "fa fa-edit text-warning",
          toolTip: "Ubah Jenis Komponen"
        },],
      data: [],
      export: [{
        type: "csv",
        label: "CSV",
        label_report: "report-ref-jenis-komponen"
      },
      {
        type: "pdf",
        label: "PDF",
        label_report: "report-ref-jenis-komponen"
      },
      {
        type: "excel",
        label: "EXCEL",
        label_report: "report-ref-jenis-komponen"
      }],
      expand: true,
      expand_data: {
        list: [
          {
            label: "Mst Komponen",
            params_set: "id_jenis_komponen",
            params_get: "id",
            data: {
              is_action: true,
              filter: false,
              init_load: true,
              is_role: false,
              is_role_params: {
                prodi: ''
              },
              endpoint: 'pmb/master/komponen',
              endpoint_local: '',
              action_name: '',
              type: "",
              order: "",
              where: "",
              group: "",
              dynamic_header_field: "",
              dynamic_header_name: "",
              dynamic_header_value: "",
              dynamic_header_type: "",
              dynamic_header_add_index: 0,
              filter_builder: true,
              filter_data: [],
              header: [
                {
                  type: "",
                  label: '#',
                  class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                  field: 'no',
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: 'Kode',
                  class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
                  field: 'kode',
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: 'Nama',
                  class: 'text-sm text-center border border-black-300 bg-gray-400',
                  field: 'nama',
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: 'Keterangan',
                  class: 'text-sm text-center border border-black-300 bg-gray-400',
                  field: 'keterangan',
                  filter: false,
                  filter_type: "select",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: 'ID Jenis Komponen',
                  class: 'text-sm text-center border border-black-300 bg-gray-400',
                  field: 'id_jenis_komponen',
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: 'ID Aktif',
                  class: 'text-sm text-center border border-black-300 bg-gray-400',
                  field: 'id_aktif',
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: 'Dibuat Oleh',
                  class: 'text-sm text-center border border-black-300 bg-gray-400',
                  field: 'dibuat_oleh',
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: 'Waktu Buat',
                  class: 'text-sm text-center border border-black-300 bg-gray-400',
                  field: 'waktu_buat',
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: 'Diubah Oleh',
                  class: 'text-sm text-center border border-black-300 bg-gray-400',
                  field: 'diubah_oleh',
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: 'Waktu Ubah',
                  class: 'text-sm text-center border border-black-300 bg-gray-400',
                  field: 'waktu_ubah',
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: 'Code',
                  class: 'text-sm text-center border border-black-300 bg-gray-400',
                  field: 'code',
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: 'Kode Institusi',
                  class: 'text-sm text-center border border-black-300 bg-gray-400',
                  field: 'kode_institusi',
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: 'Aksi',
                  class: 'text-sm text-center border border-black-300 bg-gray-400',
                  field: 'actions',
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
                  class: 'text-center border border-black-300',
                  field: 'no',
                },
                {
                  type: "",
                  count_field: [],
                  class: 'text-left border border-black-300',
                  field: 'kode',
                },
                {
                  type: "",
                  count_field: [],
                  class: 'text-left border border-black-300',
                  field: 'nama',
                },
                {
                  type: "",
                  count_field: [],
                  class: 'text-left border border-black-300',
                  field: 'keterangan',
                },
                {
                  type: "",
                  count_field: [],
                  class: 'text-center border border-black-300',
                  field: 'id_jenis_komponen',
                },
                {
                  type: "",
                  count_field: [],
                  class: 'text-left border border-black-300',
                  field: 'id_aktif',
                },
                {
                  type: "",
                  count_field: [],
                  class: 'text-left border border-black-300',
                  field: 'dibuat_oleh',
                },
                {
                  type: "",
                  count_field: [],
                  class: 'text-left border border-black-300',
                  field: 'waktu_buat',
                },
                {
                  type: "",
                  count_field: [],
                  class: 'text-left border border-black-300',
                  field: 'diubah_oleh',
                },
                {
                  type: "",
                  count_field: [],
                  class: 'text-left border border-black-300',
                  field: 'waktu_ubah',
                },
                {
                  type: "",
                  count_field: [],
                  class: 'text-left border border-black-300',
                  field: 'code',
                },
                {
                  type: "",
                  count_field: [],
                  class: 'text-left border border-black-300',
                  field: 'kode_institusi',
                },
                {
                  type: "action",
                  count_field: [],
                  class: 'text-center border border-black-300',
                  field: 'action',
                }],
              action: [
                {
                  id_params: "id",
                  route: "pmb/referensi/jenis-komponen/ubah-jenis-komponen",
                  type: "route",
                  icon: "fa fa-edit text-warning",
                  toolTip: "Ubah Jenis Komponen"
                },],
              data: [],
              export: [{
                type: "csv",
                label: "CSV",
                label_report: "report-ref-jenis-komponen"
              },
              {
                type: "pdf",
                label: "PDF",
                label_report: "report-ref-jenis-komponen"
              },
              {
                type: "excel",
                label: "EXCEL",
                label_report: "report-ref-jenis-komponen"
              }],
              expand: false
            }
          }
        ]
      },
      action_selected: [
        {
          label: "Delete",
          id_params: "id",
          api: {
            endpoint: 'pmb/referensi/jenisKomponen/remove'
          }
        },
      ],

    };
  }

  dialogData(data) {


    const dialogRef = this.dialog.open(this[data.controller], {
      data: {
        type: data.data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    console.log(data);
  }
}


