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
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
// import { TahunAkademikRoutes } from 'src/app/main/master-data/tahun-akademik/tahun-akademik.routing';

import { CustomTable } from "../../../components/custom-table/custom-table.interface";

declare const require: any;

declare const $: any;

@Component({
  selector: "app-skpi-detail-sk3-mahasiswa",
  templateUrl: "detail-sk3-mahasiswa.component.html",
  styleUrls: ["./detail-sk3-mahasiswa.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class DetailSK3MahasiswaComponent implements OnInit {
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

  inisialisasiTable() {
    this.listData = {
      is_action: true,
      filter: true,
      init_load: true,
      is_role: true,
      is_role_params: {
        prodi: "kode_prodi",
      },
      endpoint: "",
      action_name: "",
      type: "",
      order: "",
      where: "syarat_lengkap = 'T'",
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
        {
          id: "kode_jenis_formulir",
          label: "Jenis Formulir",
          data_list: [],
          type: "select",
          is_filter: true,
          value: null,
          trigger: false,
          trigger_id: null,
          trigger_params: null,
          first_index_selected: false,
          api: {
            endpoint: "/pmb/master/jenisFormulir",
            where: "id_aktif='Y'",
            prodi_role: {
              param: "kode",
              is_role: false,
            },
            id: "kode",
            label: "nama",
          },
        },
      ],
      header: [
        {
          type: "",
          label: "#",
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
          label: "Data Peserta",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "data_peserta",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Gelombang",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "kode_gelombang",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Jenis Formulir",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
          field: "jenis_formulir",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        // {
        //   type: "",
        //   label: "Status Awal",
        //   class: "text-sm text-center border border-black-300 bg-gray-400 w-30",
        //   field: "id_status_awal",
        //   filter: false,
        //   filter_type: "text",
        //   filter_value: null,
        //   sort: false,
        //   sort_type: "",
        //   data: [],
        // },
        {
          type: "",
          label: "Program",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
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
          label: "Program Studi",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
          field: "bukti_setoran",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },

        {
          type: "",
          label: "Pil. Ke",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
          field: "id_status_bayar",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        // {
        //   type: "",
        //   label: "Jurusan SLTA",
        //   class: "text-sm text-center border border-black-300 bg-gray-400 w-30",
        //   field: "jurusan_sekolah",
        //   filter: false,
        //   filter_type: "text",
        //   filter_value: null,
        //   sort: false,
        //   sort_type: "",
        //   data: [],
        // },
        {
          type: "",
          label: "Handphone",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
          field: "action",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Email",
          class: "text-sm text-center border border-black-300 bg-gray-400",
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
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-2",
          field: "no",
        },
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-left border border-black-300",
        //   field: "id",
        // },
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-left border border-black-300",
        //   field: "formulir_id",
        // },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-72",
          field: "data_peserta",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-16",
          field: "kode_gelombang",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-52",
          field: "jenis_formulir",
        },
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-left border border-black-300",
        //   field: "nama",
        // },
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-center border border-black-300",
        //   field: "id_status_awal",
        // },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "kode_program",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "prodi",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "pilihan_ke",
        },
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-center border border-black-300",
        //   field: "jurusan_sekolah",
        // },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "handphone",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-16",
          field: "email",
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
      data: [],
      export:[{
        type:"csv",
        label:"CSV",
        label_report:"report-calon-peserta"
      },
      {
        type:"pdf",
        label:"PDF",
        label_report:"report-calon-peserta"
      },
      {
        type:"excel",
        label:"XLSX",
        label_report:"report-calon-peserta"
      }]
    };
  }
}
