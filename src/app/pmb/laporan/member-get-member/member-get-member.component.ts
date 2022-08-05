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
  selector: "app-komponen-nilai-dan-seleksi",
  templateUrl: "member-get-member.component.html",
  styleUrls: ["./member-get-member.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class MemberGetMemberComponent implements OnInit {
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
      endpoint: "pmb/pesertaMgm",
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
          label: "Data Peserta",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-21",
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
          label: "Kode Referral",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "kode_referral",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        // {
        //   type: "",
        //   label: "NIK",
        //   class: "text-sm text-center border border-black-300 bg-gray-400",
        //   field: "nik_pegawai",
        //   filter: false,
        //   filter_type: "text",
        //   filter_value: null,
        //   sort: false,
        //   sort_type: "",
        //   data: [],
        // },
        {
          type: "",
          label: "Nama Refferal",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "nama_refferal",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        // {
        //   type: "",
        //   label: "Handphone Civitas",
        //   class: "text-sm text-center border border-black-300 bg-gray-400",
        //   field: "handphone_pegawai",
        //   filter: false,
        //   filter_type: "text",
        //   filter_value: null,
        //   sort: false,
        //   sort_type: "",
        //   data: [],
        // },
        // {
        //   type: "",
        //   label: "Jenis MGM",
        //   class: "text-sm text-center border border-black-300 bg-gray-400",
        //   field: "jenis_mgm",
        //   filter: false,
        //   filter_type: "text",
        //   filter_value: null,
        //   sort: false,
        //   sort_type: "",
        //   data: [],
        // },
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
          class: "text-left border border-black-300",
          field: "peserta",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "kode_referral",
        },
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-center border border-black-300",
        //   field: "nik_pegawai",
        // },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "nama_referral",
        },
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-center border border-black-300",
        //   field: "handphone_pegawai",
        // },
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-center border border-black-300",
        //   field: "jenis_mgm",
        // },
      ],
      action: [
        {
          id_params: "kode",
          route: "pmb/master/gelombang/detail-gelombang",
          type: "dialog",
          controller: "FormDialogComponent",
          toolTip: "View Detail",
          icon: "fa fa-info text-info",
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
      data: [],
      expand: false,
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
