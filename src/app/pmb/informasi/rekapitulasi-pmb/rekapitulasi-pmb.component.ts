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
  selector: "app-rekapitulasi-pmb",
  templateUrl: "rekapitulasi-pmb.component.html",
  styleUrls: ["./rekapitulasi-pmb.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class RekapitulasiPMBComponent implements OnInit {
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
    private router: Router
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

  verifyData() {
    this.router.navigate([
      "/pmb/staff/penyaringan-pmb/verifikasi-dokumen/verifikasi-peserta",
    ]);
  }

  manageData() {
    this.router.navigate([
      "/pmb/staff/penyaringan-pmb/verifikasi-dokumen/informasi-lengkap-peserta",
    ]);
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
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
      filter: false,
      init_load: true,
      is_role: true,
      is_role_params: {
        prodi: "kode_prodi",
      },
      endpoint: "pmb/rekapPmb",
      action_name: "",
      type: "",
      order: "kode_gelombang desc",
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
          label: "Periode",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "kode_gelombang",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Program Studi",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "prodi",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Fakultas",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "fakultas",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip:
            "Calon pendaftar yang batal dikarenakan data ganda atau data testing",
          type: "",
          label: "Batal",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "batal",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip: "Pendaftar yang belum melakukan pembayaran",
          type: "",
          label: "Peminat",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "calon_pendaftar",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip:
            "Pendaftar yang sudah melakukan pembayaran namun belum mengisi formulir.",
          type: "",
          label: "Pendaftar",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "pendaftar",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip:
            "Peserta yang sudah mengisi formulir namun persyaratannya BELUM LENGKAP",
          type: "",
          label: "Calon Peserta",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "calon_peserta",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip: "Peserta yang peryaratannya sudah diverifikasi",
          type: "",
          label: "Peserta",
          // colspan: "2",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "peserta",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip: "Peserta yang dinyatakan TIDAK LULUS",
          type: "",
          label: "Tidak Lulus",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "tidak_lulus",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip:
            "Peserta menjadi cadangan untuk Peserta yang mengundurkan diri",
          type: "",
          label: "Cadangan",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "cadangan",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip: "Peserta ditawarkan ke Prodi pilihan 2 atau 3",
          type: "",
          label: "Dipindahkan",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "dipindah",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip: "Peserta yang sudah dinyatakan LULUS",
          type: "",
          label: "Camaba",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "camaba",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip: "Peserta LULUS yang mengundurkan diri",
          type: "",
          label: "Undur Diri",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "undur_diri",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip: "Peserta Lulus yang sudah melakukan registrasi",
          type: "",
          label: "Maba",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "maba",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },

        {
          type: "",
          label: "Jumlah",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "jumlah",
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
          class: "text-center border border-black-300",
          field: "kode_gelombang",
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
          class: "text-left border border-black-300",
          field: "fakultas",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "batal",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "calon_pendaftar",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "pendaftar",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "calon_peserta",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "peserta",
        },
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-center border border-black-300",
        //   field: "peserta",
        // },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "tidak_lulus",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "cadangan",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "dipindah",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "camaba",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "undur_diri",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "maba",
        },

        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "jumlah",
        },
      ],
      action: [],
      data: [],
      sum: [
        {
          type: "",
          label: "Jumlah",
          class: "text-right font-bold  ",
          colspan: "4",
          field: "",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "batal",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "calon_pendaftar",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "pendaftar",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "calon_peserta",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "peserta",
          value: 0,
        },
        // {
        //   type: "",
        //   label: "",
        //   class: "text-center font-bold",
        //   colspan: "1",
        //   field: "peserta",
        //   value: 0,
        // },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "tidak_lulus",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "cadangan",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "dipindah",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "camaba",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "undur_diri",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "maba",
          value: 0,
        },

        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "jumlah",
          value: 0,
        },
      ],
      not_pagination: false,
    };
  }
}
