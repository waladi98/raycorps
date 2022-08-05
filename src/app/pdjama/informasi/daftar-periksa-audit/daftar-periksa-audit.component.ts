import { Component, OnInit } from "@angular/core";

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
import { FormDialogDetailComponent } from "./detail-komponen-nilai/form-dialog-detail/form-dialog-detail.component";
//untuk memanggil base url
import { DataService } from "../../../core/services/data.service";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { CustomTable } from "../../../components/custom-table/custom-table.interface";

declare const require: any;

declare const $: any;

@Component({
  selector: "app-daftar-periksa-audit",
  templateUrl: "daftar-periksa-audit.component.html",
  styleUrls: ["./daftar-periksa-audit.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class DaftarPeriksaComponent implements OnInit {
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
  FormDialogDetailComponent = FormDialogDetailComponent;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    //ambil base url api
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
    //jalankan function
    this.inisialisasiTable();
  }

  deleteData(data) {
    swal
      .fire({
        title: "Hapus Data",
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
          console.log(result.value);
        }
      });
  }

  inisialisasiTable() {
    this.listData = {
      add_data: {
        type: "dialog",
        controller: "FormDialogComponent",
      },
      export: [
        {
          type: "csv",
          label: "CSV",
          label_report: "report-ref-jenis-komponen",
        },
        {
          type: "pdf",
          label: "PDF",
          label_report: "report-ref-jenis-komponen",
        },
        {
          type: "excel",
          label: "EXCEL",
          label_report: "report-ref-jenis-komponen",
        },
      ],
      is_action: true,
      filter: false,
      init_load: true,
      is_role: false,
      is_role_params: {
        prodi: "",
      },
      endpoint: "pdjama/master/daftarPeriksaAudit",
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
        // {
        //   id: "tahun_akademik",
        //   label: "Tahun Akademik",
        //   data_list: [],
        //   type: "select",
        //   is_filter: false,
        //   value:null,
        //   trigger:false,
        //   trigger_id:"kode_gelombang",
        //   trigger_params:null,
        //   api: {
        //     endpoint: "/master/tahunAkademik",
        //     where: "id_aktif='Y' ",
        //     id: "kode",
        //     label: "tahun_akademik",
        //   },
        // },
        // {
        //   id: "kode_gelombang",
        //   label: "Gelombang",
        //   data_list: [],
        //   type: "select",
        //   is_filter: true,
        //   value:null,
        //   trigger:true,
        //   trigger_id:null,
        //   trigger_params:"kode_tahun_akademik",
        //   api: {
        //     endpoint: "/pmb/master/gelombang",
        //     where: "",
        //     id: "kode",
        //     label: "nama",
        //   },
        // },
        // {
        //   id: "kode_prodi",
        //   label: "Prodi",
        //   data_list: [],
        //   type: "select",
        //   is_filter: true,
        //   value:null,
        //   trigger:false,
        //   trigger_id:null,
        //   trigger_params:null,
        //   api: {
        //     endpoint: "/master/prodi",
        //     where: "id_aktif='Y'",
        //     prodi_role:{
        //       param:"kode",
        //       is_role:true
        //     },
        //     id: "kode",
        //     label: "prodi",
        //   },
        // }
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
        // }
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
          label: "Kode",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "kode",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Nama Daftar Periksa",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "nama_daftar_periksa",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Aktif ?",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "id_aktif",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Aksi",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "actions",
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
          class: "text-center border border-black-300 w-2",
          field: "no",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "kode",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "nama_daftar_periksa",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "id_aktif",
        },
        {
          type: "action",
          count_field: [],
          class: "text-center border border-black-300",
          field: "action",
        },
      ],
      action: [
        {
          id_params: "kode",
          route: "",
          type: "dialog",
          controller: "FormDialogComponent",
          toolTip: "Edit Data",
          icon: "fa fa-edit text-warning",
          condition: [
            {
              params_1: "kode",
              operator: "!=",
              params_2: null,
            },
          ],
        },
        {
          id_params: "kode",
          route: "",
          type: "dialog",
          controller: "FormDialogComponent",
          toolTip: "Delete Data",
          icon: "fa fa-trash text-danger",
          condition: [
            {
              params_1: "kode",
              operator: "!=",
              params_2: null,
            },
          ],
        },
      ],
      //tambah tombol tambah data
      // add_data: [
      //   {
      //     // id_params: "kode",
      //     // route: "/pmb/master/gelombang",
      //     // type: "route",
      //   },
      // ],
      data: [
        {
          kode: "123",
          nama_butir_penilaian: "nama1",
        },
        {
          kode: "124",
          nama_butir_penilaian: "nama2",
        },
      ],
      expand: true,
      expand_data: {
        list: [
          {
            label: "Kriteria Penilaian",
            params_set: "kode_daftar_periksa_audit", //di isi oleh id detail dari master
            params_get: "kode", //id dari masternya
            data: {
              add_data: {
                type: "dialog",
                controller: "FormDialogDetailComponent",
              },
              is_action: true,
              filter: false,
              init_load: true,
              is_role: false,
              is_role_params: {
                prodi: "",
              },
              endpoint: "pdjama/master/kriteriaPenilaian",
              endpoint_local: "",
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
              filter_builder: true,
              filter_data: [],
              header: [
                {
                  type: "",
                  label: "No",
                  class:
                    "text-sm text-center border border-black-300 bg-gray-400 w-20",
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
                  label: "Kode",
                  class:
                    "text-sm text-center border border-black-300 bg-gray-400 w-30",
                  field: "kode",
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: 'Klausul',
                  class: 'text-sm text-center border border-black-300 bg-gray-400',
                  field: 'klausul',
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: 'Aspek Pilihan',
                  class: 'text-sm text-center border border-black-300 bg-gray-400',
                  field: 'aspek_pilihan',
                  filter: false,
                  filter_type: "select",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: "Aksi",
                  class:
                    "text-sm text-center border border-black-300 bg-gray-400",
                  field: "actions",
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
                  field: "kode",
                },
                {
                  type: "",
                  count_field: [],
                  class: "text-left border border-black-300",
                  field: "klausul",
                },
                {
                  type: "",
                  count_field: [],
                  class: "text-center border border-black-300",
                  field: "aspek_penilaian",
                },
                {
                  type: "action",
                  count_field: [],
                  class: "text-center border border-black-300",
                  field: "action",
                },
              ],
              action: [
                {
                  id_params: "kode",
                  route: "",
                  type: "dialog",
                  controller: "FormDialogComponent",
                  toolTip: "Edit Data",
                  icon: "fa fa-edit text-warning",
                  condition: [
                    {
                      params_1: "kode",
                      operator: "!=",
                      params_2: null,
                    },
                  ],
                },
                {
                  id_params: "kode",
                  route: "",
                  type: "dialog",
                  controller: "FormDialogComponent",
                  toolTip: "Delete Data",
                  icon: "fa fa-trash text-danger",
                  condition: [
                    {
                      params_1: "kode",
                      operator: "!=",
                      params_2: null,
                    },
                  ],
                },
              ],
              data: [],
              export: [
                {
                  type: "csv",
                  label: "CSV",
                  label_report: "report-ref-jenis-komponen",
                },
                {
                  type: "pdf",
                  label: "PDF",
                  label_report: "report-ref-jenis-komponen",
                },
                {
                  type: "excel",
                  label: "EXCEL",
                  label_report: "report-ref-jenis-komponen",
                },
              ],
              expand: false,
            },
          },
        ],
      },
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
      this.loadDataTable();
    });

    console.log(data);
  }
}
