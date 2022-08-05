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
//untuk memanggil base url
import { DataService } from "../../../core/services/data.service";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { CustomTable } from "../../../components/custom-table/custom-table.interface";

declare const require: any;

declare const $: any;

@Component({
  selector: "app-ncr-ketidaksesuaian",
  templateUrl: "ncr-ketidaksesuaian.component.html",
  styleUrls: ["./ncr-ketidaksesuaian.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class NCRKetidaksesuaianComponent implements OnInit {
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
      // add_data: {
      //   type: "dialog",
      //   controller: "FormDialogComponent",
      // },
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
      filter: true,
      init_load: true,
      is_role: false,
      is_role_params: {
        prodi: "",
      },
      // where_param: [
      //   {
      //     field: "kode",
      //     value: "0000000",
      //     type: "local",
      //   },
      // ],
      endpoint: "master/?",
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
          label: "Tahun Periode",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "kode",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Program Audit",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "nama",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Nomor NCR",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "nomor_ncr",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Bidang",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "alamat_1",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Ref. Prosedur",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "alamat_2",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Tanggal Terbit NCR",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "alamat_2",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Status",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "status",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        // {
        //   type: "",
        //   label: "Aktif ?",
        //   class: "text-sm text-center border border-black-300 bg-gray-400",
        //   field: "id_aktif",
        //   filter: true,
        //   filter_type: "select",
        //   filter_value: null,
        //   sort: false,
        //   sort_type: "",
        //   data: [
        //     {
        //       id: "",
        //       label: "Clear",
        //     },
        //     {
        //       id: "Y",
        //       label: "Aktif",
        //     },
        //     {
        //       id: "T",
        //       label: "Tidak Aktif",
        //     },
        //   ],
        // },
        {
          type: "",
          label: "Aksi",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "",
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
          class: "text-center border border-black-300 w-20",
          field: "tahun_periode",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-20",
          field: "program_audit",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-20",
          field: "nomor_ncr",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-20",
          field: "bidang",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-20",
          field: "ref_prosedur",
        },{
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-20",
          field: "tgl_terbit_ncr",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-20",
          field: "status",
        },
        {
          type: "download",
          count_field: [],
          class: "text-left border border-black-300 w-20",
          field: "aksi",
        },
        // {
        //   // jika ada nilai null
        //   type: "nilaiNull",
        //   count_field: [],
        //   class: "text-left border border-black-300 w-20",
        //   field: "alamat_1",
        //   condition: {
        //     field: "alamat_1",
        //     is_show_value: true,
        //     default: "Belum di isi",
        //   },
        // },
        // {
        //   type: "nilaiNull",
        //   count_field: [],
        //   class: "text-left border border-black-300 w-20",
        //   field: "alamat_2",
        //   condition: {
        //     field: "alamat_2",
        //     is_show_value: true,
        //     default: "Belum di isi",
        //   },
        // },
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-center border border-black-300 w-10",
        //   field: "id_aktif",
        // },
        {
          type: "action",
          count_field: [],
          class: "text-center border border-black-300 w-16",
          field: "action",
        },
      ],
      action: [
        {
          id_params: "",
          route: "",
          type: "dialog",
          controller: "FormDialogEditComponent",
          icon: "fa fa-edit text-warning",
          toolTip: "Edit Sekolah",
        },
        {
          id_params: "",
          route: "",
          type: "dialog",
          controller: "FormDialogDeleteComponent",
          icon: "fa fa-trash text-danger",
          toolTip: "Delete sekolah",
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
          tahun_periode: "2022",
          program_audit: "2022",
          bidang: "2022",
          ref_prosedur: "2022",
          tgl_terbit_ncr: "2022",
          status: "2022",
        }
      ],
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
