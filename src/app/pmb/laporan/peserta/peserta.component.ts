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
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import swal from "sweetalert2";
// import { TahunAkademikRoutes } from 'src/app/main/master-data/tahun-akademik/tahun-akademik.routing';
import { CustomTable } from "../../../components/custom-table/custom-table.interface";

import { Subject, Subscription, Observable } from "rxjs";

declare const require: any;

declare const $: any;

@Component({
  selector: "app-peserta",
  templateUrl: "peserta.component.html",
  styleUrls: ["./peserta.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PesertaComponent implements OnInit {
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
  FormDialogComponent = FormDialogComponent;
  params: any;
  constructor(
    private router: Router,
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

  manageData(type) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        type: type,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteData(data) {
    swal
      .fire({
        title: "Delete Data",
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

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  // inisialisasiTable() {
  //   this.listData = {
  //     is_action: true,
  //     filter: false,
  //     init_load: true,
  //     is_role: true,
  //     is_role_params: {
  //       prodi: 'kode_prodi_pilihan_1'
  //     },
  //     endpoint: 'pmb/peserta',
  //     action_name: '',
  //     type: "",
  //     order: "",
  //     where: "",
  //     group: "",
  //     dynamic_header_field: "",
  //     dynamic_header_name: "",
  //     dynamic_header_value: "",
  //     dynamic_header_type: "",
  //     dynamic_header_add_index: 0,
  //     filter_data: [
  //       {
  //         id: "tahun_akademik",
  //         label: "Tahun Akademik",
  //         data_list: [],
  //         type: "select",
  //         is_filter: false,
  //         value: null,
  //         trigger: false,
  //         trigger_id: "kode_gelombang",
  //         trigger_params: null,
  //         api: {
  //           endpoint: "/master/tahunAkademik",
  //           where: "id_aktif='Y' ",
  //           id: "tahun",
  //           label: "tahun_akademik",
  //         },
  //       },
  //       {
  //         id: "kode_gelombang",
  //         label: "Gelombang",
  //         data_list: [],
  //         type: "select",
  //         is_filter: true,
  //         value: null,
  //         trigger: true,
  //         trigger_id: null,
  //         trigger_params: "kode_tahun_akademik",
  //         api: {
  //           endpoint: "/pmb/master/gelombang",
  //           where: "",
  //           id: "kode",
  //           label: "nama",
  //           concat: [
  //             {
  //               type: "string",
  //               field: "Gelombang",
  //             },
  //             {
  //               type: "string",
  //               field: " ",
  //             },
  //             {
  //               type: "value",
  //               field: "id_gelombang",
  //             },
  //           ],
  //         },
  //       },
  //       {
  //         id: "kode_prodi",
  //         label: "Prodi",
  //         data_list: [],
  //         type: "select",
  //         is_filter: true,
  //         value: null,
  //         trigger: false,
  //         trigger_id: null,
  //         trigger_params: null,
  //         first_index_selected: true,
  //         api: {
  //           endpoint: "/master/prodi",
  //           where: "id_aktif='Y'",
  //           prodi_role: {
  //             param: "kode",
  //             is_role: true,
  //           },
  //           id: "kode",
  //           label: "prodi",
  //         },
  //       },
  //       /*{
  //         id: "prodi",
  //         label: "Prodi",
  //         data_list: [],
  //         type: "select",
  //         value:null,
  //         trigger:false,
  //         trigger_id:null,
  //         trigger_params:null,
  //         api: {
  //           endpoint: "/master/prodi",
  //           where: "id_aktif='Y' ",
  //           id: "kode",
  //           label: "prodi",
  //         },
  //       }*/
  //     ],
  //     header: [
  //       {
  //         type: "",
  //         label: 'ID',
  //         class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
  //         field: 'id',
  //         filter: false,
  //         filter_type: "text",
  //         filter_value: null,
  //         sort: false,
  //         sort_type: "",
  //         data: [],
  //       },
  //       {
  //         type: "",
  //         label: 'Kode Gelombang',
  //         class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
  //         field: 'periode',
  //         filter: false,
  //         filter_type: "text",
  //         filter_value: null,
  //         sort: false,
  //         sort_type: "",
  //         data: [],
  //       },
  //       {
  //         type: "",
  //         label: 'Jenis Formulir',
  //         class: 'text-sm text-center border border-black-300 bg-gray-400',
  //         field: 'no_pendaftar',
  //         filter: false,
  //         filter_type: "text",
  //         filter_value: null,
  //         sort: false,
  //         sort_type: "",
  //         data: [],
  //       },
  //       {
  //         type: "",
  //         label: 'No Pendaftar',
  //         class: 'text-sm text-center border border-black-300 bg-gray-400',
  //         field: 'nama',
  //         filter: false,
  //         filter_type: "select",
  //         filter_value: null,
  //         sort: false,
  //         sort_type: "",
  //         data: [],
  //       },
  //       {
  //         type: "",
  //         label: 'Tanggal Daftar',
  //         class: 'text-sm text-center border border-black-300 bg-gray-400',
  //         field: 'jenis_formulir',
  //         filter: false,
  //         filter_type: "text",
  //         filter_value: null,
  //         sort: false,
  //         sort_type: "",
  //         data: [],
  //       },
  //       {
  //         type: "",
  //         label: 'Nama',
  //         class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
  //         field: 'prodi_pilihan_1',
  //         filter: false,
  //         filter_type: "text",
  //         filter_value: null,
  //         sort: false,
  //         sort_type: "",
  //         data: [],
  //       },
  //       {
  //         type: "",
  //         label: 'Prodi Pilihan 1',
  //         class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
  //         field: 'handphone',
  //         filter: false,
  //         filter_type: "text",
  //         filter_value: null,
  //         sort: false,
  //         sort_type: "",
  //         data: [],
  //       },
  //       {
  //         type: "",
  //         label: 'Jenjang',
  //         class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
  //         field: 'email',
  //         filter: false,
  //         filter_type: "text",
  //         filter_value: null,
  //         sort: false,
  //         sort_type: "",
  //         data: [],
  //       },
  //       {
  //         type: "",
  //         label: 'Jurusan SLTA',
  //         class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
  //         field: 'bukti_setoran',
  //         filter: false,
  //         filter_type: "text",
  //         filter_value: null,
  //         sort: false,
  //         sort_type: "",
  //         data: [],
  //       },
  //       {
  //         type: "",
  //         label: 'Handphone',
  //         class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
  //         field: 'id_status_bayar',
  //         filter: false,
  //         filter_type: "text",
  //         filter_value: null,
  //         sort: false,
  //         sort_type: "",
  //         data: [],
  //       },
  //       {
  //         type: "",
  //         label: 'Email',
  //         class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
  //         field: 'bukti_setoran',
  //         filter: false,
  //         filter_type: "text",
  //         filter_value: null,
  //         sort: false,
  //         sort_type: "",
  //         data: [],
  //       }
  //     ],
  //     field: [
  //       {
  //         type: "",
  //         count_field: [],
  //         class: 'text-center border border-black-300',
  //         field: 'no',
  //       },
  //       {
  //         type: "",
  //         count_field: [],
  //         class: 'text-center border border-black-300',
  //         field: 'kode_gelombang',
  //       },
  //       {
  //         type: "",
  //         count_field: [],
  //         class: 'text-left border border-black-300',
  //         field: 'jenis_formulir',
  //       },
  //       {
  //         type: "",
  //         count_field: [],
  //         class: 'text-left border border-black-300',
  //         field: 'id',
  //       },
  //       {
  //         type: "",
  //         count_field: [],
  //         class: 'text-center border border-black-300',
  //         field: 'tanggal_pendaftaran',
  //       },
  //       {
  //         type: "",
  //         count_field: [],
  //         class: 'text-left border border-black-300',
  //         field: 'nama',
  //       },
  //       {
  //         type: "",
  //         count_field: [],
  //         class: 'text-center border border-black-300',
  //         field: 'prodi_pilihan_1',
  //       },
  //       {
  //         type: "",
  //         count_field: [],
  //         class: 'text-center border border-black-300',
  //         field: 'id_jenjang',
  //       },
  //       {
  //         type: "",
  //         count_field: [],
  //         class: 'text-center border border-black-300',
  //         field: 'id_jurusan_sekolah',
  //       },
  //       {
  //         type: "",
  //         count_field: [],
  //         class: 'text-center border border-black-300',
  //         field: 'handphone',
  //       },
  //       {
  //         type: "",
  //         count_field: [],
  //         class: 'text-left border border-black-300',
  //         field: 'email',
  //       },
  //     ],
  //     action: [
  //     {
  //       id_params: "",
  //       route: "",
  //       type: "route",
  //       icon: "fa fa-info-circle text-info",
  //       toolTip: "Informasi Lengkap Peserta"
  //     }],
  //     data: [],
  //     export:[{
  //       type:"csv",
  //       label:"CSV",
  //       label_report:"report-peserta"
  //     },
  //     {
  //       type:"pdf",
  //       label:"PDF",
  //       label_report:"report-peserta"
  //     },
  //     {
  //       type:"excel",
  //       label:"EXCEL",
  //       label_report:"report-peserta"
  //     }]
  //   };
  // }

  inisialisasiTable() {
    this.listData = {
      is_action: true,
      filter: true,
      init_load: true,
      is_role: true,
      is_role_params: {
        prodi: "kode_prodi",
      },
      endpoint: "pmb/peserta",
      action_name: "",
      type: "",
      order: "",
      where:
        "syarat_lengkap = 'Y' AND id_status_seleksi = '7' AND lulus is null",
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
          label: "ID",
          class: "text-sm text-center border border-black-300 bg-gray-400",
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
          label: "Peserta",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "peserta",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Dokumen Persyaratan",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "dokumen_persyaratan",
          filter: false,
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
          field: "handphone",
          filter: false,
          filter_type: "select",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Email",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "email",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Detail Nilai",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "rekap_nilai",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Keterangan",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "catatan_proses",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Kartu",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
          field: "link_kartu",
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
          class: "text-center border border-black-300 w-2",
          field: "no",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-72",
          field: "peserta",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-80 dokumen",
          field: "dokumen_persyaratan",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "handphone",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "email",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-52",
          field: "rekap_nilai",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-72",
          field: "catatan_proses",
        },
        {
          type: "download",
          count_field: [],
          class: "text-center border border-black-300 w-16",
          field: "link_info",
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
          icon: "fa fa-info-circle text-info",
          toolTip: "Informasi Lengkap Peserta",
          condition: [
            {
              params_1: "id",
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
          label_report: "report-peserta",
        },
        {
          type: "pdf",
          label: "PDF",
          label_report: "report-peserta",
        },
        {
          type: "excel",
          label: "XLSX",
          label_report: "report-peserta",
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
