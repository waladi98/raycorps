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
import { CustomTable } from "../../../../components/custom-table/custom-table.interface";
import { DataService } from "../../../../../app/core/services/data.service";
import { AuthService } from "../../../../core/auth/auth.service";
import { Subject, Subscription, Observable } from "rxjs";

declare const require: any;
declare const $: any;

@Component({
  selector: "app-daftar-peserta-pmb",
  templateUrl: "daftar-peserta-pmb.component.html",
  styleUrls: ["./daftar-peserta-pmb.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class DaftarPesertaPMBComponent implements OnInit {
  listData: CustomTable;

  eventsLoad: Subject<void> = new Subject<void>();

  loadDataTable() {
    this.eventsLoad.next();
  }

  isLoadingTable = false;
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  params: any;

  dataList = [
    {
      formulir_id: 123456,
      detail_nilai: [
        {
          komponen: "matkul 1",
          nilai: "A",
        },
        {
          komponen: "matkul 2",
          nilai: "B",
        },
        {
          komponen: "matkul 3",
          nilai: "C",
        },
        {
          komponen: "matkul 4",
          nilai: "C",
        },
      ],
    },
    {
      formulir_id: 654321,
      detail_nilai: [
        {
          komponen: "matkul 1",
          nilai: "A",
        },
        {
          komponen: "matkul 2",
          nilai: "B",
        },
        {
          komponen: "matkul 3",
          nilai: "C",
        },
        {
          komponen: "matkul 4",
          nilai: "C",
        },
      ],
    },
  ];

  where_in = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private router: Router,
    private dataService: DataService,
    private _authService: AuthService
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

  verifyData() {
    this.router.navigate([
      "/pmb/transaksi/proses-cadangan/verifikasi-kelulusan-peserta",
    ]);
  }

  manageData() {
    this.router.navigate([
      "/pmb/transaksi/proses-cadangan/informasi-lengkap-peserta",
    ]);
  }

  async inisialisasiTable(): Promise<any> {
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
      endpoint: "pmb/verifikasiPeserta",
      action_name: "",
      type: "",
      order: "id asc",
      where: "lulus is null AND id_status_seleksi = '3' ",
      group: "",
      dynamic_header_field: "detail_nilai",
      dynamic_header_name: "kd_komponen",
      dynamic_header_value: "nilai",
      dynamic_header_type: "string",
      dynamic_header_add_index: 3,
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
          id: "id_jurusan_sekolah",
          label: "Jurusan Sekolah",
          data_list: [],
          type: "select",
          is_filter: true,
          value: null,
          trigger: false,
          trigger_id: null,
          trigger_params: null,
          first_index_selected: true,
          api: {
            endpoint: "/referensi/jurusanSekolah",
            where: "id_aktif='Y'",
            id: "id",
            label: "jurusan_sekolah",
          },
        },
      ],
      header: [
        {
          type: "",
          label: "#",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-10",
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
          class: "text-sm text-center border border-black-300 bg-gray-400 w-40",
          field: "peserta",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        // {
        //   type: "",
        //   label: "No. PMB",
        //   class: "text-sm text-center border border-black-300 bg-gray-400 w-30",
        //   field: "formulir_id",
        //   filter: true,
        //   filter_type: "text",
        //   filter_value: null,
        //   sort: true,
        //   sort_type: "",
        //   data: [],
        // },
        // {
        //   type: "",
        //   label: "Nama",
        //   class: "text-sm text-center border border-black-300 bg-gray-400",
        //   field: "nama",
        //   filter: true,
        //   filter_type: "text",
        //   filter_value: null,
        //   sort: true,
        //   sort_type: "",
        //   data: [],
        // },
        // {
        //   type: "",
        //   label: "Program Studi",
        //   class: "text-sm text-center border border-black-300 bg-gray-400",
        //   field: "prodi",
        //   filter: true,
        //   filter_type: "text",
        //   filter_value: null,
        //   sort: true,
        //   sort_type: "",
        //   data: [],
        // },
        {
          type: "",
          label: "Pil.Ke",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "pilihan_ke",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        // {
        //   type: "",
        //   label: "Rerata",
        //   class: "text-sm text-center border border-black-300 bg-gray-400",
        //   field: "nilai_ujian",
        //   filter: null,
        //   filter_type: "text",
        //   filter_value: null,
        //   sort: true,
        //   sort_type: "",
        //   data: [],
        // },
        // {
        //   type: "",
        //   label: "Rekap Nilai",
        //   class: "text-sm text-center border border-black-300 bg-gray-400",
        //   field: "rekap_nilai",
        //   filter: null,
        //   filter_type: "text",
        //   filter_value: null,
        //   sort: true,
        //   sort_type: "",
        //   data: [],
        // },
        {
          type: "",
          label: "Dokumen",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-40",
          field: "dokumen_persyaratan",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Catatan",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-32",
          field: "catatan",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        // {
        //   type: "",
        //   label: "Status",
        //   class: "text-sm text-center border border-black-300 bg-gray-400",
        //   field: "status_seleksi",
        //   filter: false,
        //   filter_type: "text",
        //   filter_value: null,
        //   sort: true,
        //   sort_type: "",
        //   data: [],
        // },
        // {
        //   type: "",
        //   label: "Lulus",
        //   class: "text-sm text-center border border-black-300 bg-gray-400",
        //   field: "status_lulus",
        //   filter: false,
        //   filter_type: "text",
        //   filter_value: null,
        //   sort: false,
        //   sort_type: "",
        //   data: [],
        // },
        {
          type: "",
          label: "AKSI",
          class:
            "text-sm disabled-sorting text-center w-10 border border-black-300 bg-gray-400",
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
          class: "text-center border border-black-300",
          field: "no",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "peserta",
        },
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-center border border-black-300",
        //   field: "formulir_id",
        // },
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
        //   field: "prodi",
        // },
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
        //   field: "nilai_ujian",
        // },
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-left border border-black-300",
        //   field: "rekap_nilai",
        // },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 dokumen",
          field: "dokumen_persyaratan",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "catatan",
        },
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-left border border-black-300",
        //   field: "status_seleksi",
        // },
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-center border border-black-300",
        //   field: "lulus",
        // },
        {
          type: "action",
          count_field: [],
          class: "text-center border border-black-300",
          field: "action",
        },
      ],
      action: [
        {
          id_params: "formulir_id",
          route: "/pmb/transaksi/proses-cadangan/verifikasi-cadangan",
          type: "route",
          icon: "fa fa-edit text-warning",
          toolTip: "Verifikasi Kelulusan Peserta",
          condition: [
            {
              params_1: "formulir_id",
              operator: "!=",
              params_2: null,
            },
          ],
        },
        // {
        //   id_params: "formulir_id",
        //   route: "/pmb/transaksi/proses-kelulusan/informasi-lengkap-peserta",
        //   type: "route",
        //   icon: "fa fa-info-circle text-info",
        //   toolTip: "Informasi Lengkap Peserta",
        // },
      ],
      data: [],
    };
  }

  async loadDataRole(): Promise<any> {
    const request = [this._authService.getRole()];

    const [role] = await Promise.all(request);

    this.where_in = [];

    let prodi_role = role.prodi.split(",");

    for (let i = 0; i < prodi_role.length; i++) {
      this.where_in.push(prodi_role[i]);
    }

    this.inisialisasiTable();
  }
}
