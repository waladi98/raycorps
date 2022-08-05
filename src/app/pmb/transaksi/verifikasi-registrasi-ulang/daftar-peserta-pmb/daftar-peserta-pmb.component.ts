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
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  params: any;
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

  verifyData() {
    this.router.navigate(["/pmb/verifikasi-reg-ulang/verifikasi-reg-ulang"]);
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
      filter: true,
      init_load: false,
      is_role: true,
      is_role_params: {
        prodi: "kode_prodi",
      },
      endpoint: "/pmb/peserta",
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
          value: null,
          trigger: true,
          trigger_id: null,
          trigger_params: "kode_tahun_akademik",
          api: {
            endpoint: "/pmb/master/gelombang",
            where: "id_aktif='Y' ",
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
          value: null,
          trigger: false,
          trigger_id: null,
          trigger_params: null,
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
          class: "text-sm text-center border border-black-300 bg-gray-400 w-20",
          field: "no",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "No. PMB",
          class: "text-sm text-left border border-black-300 bg-gray-400 w-30",
          field: "formulir_id",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Nama",
          class: "text-sm text-left border border-black-300 bg-gray-400",
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
          label: "Program Studi Lulus",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: "prodi_pilihan_1",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Kelengkapan Lengkap",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: "syarat_lengkap",
          filter: true,
          filter_type: "select",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [
            {
              id: "",
              label: "Clear",
            },
            {
              id: "Y",
              label: "Y",
            },
            {
              id: "T",
              label: "T",
            },
          ],
        },
        {
          type: "",
          label: "Status Registrasi Ulang",
          class: "text-sm text-left border border-black-300 bg-gray-400",
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
          label: "AKSI",
          class:
            "text-sm disabled-sorting text-center w-30 border border-black-300 bg-gray-400",
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
          field: "formulir_id",
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
          class: "text-left border border-black-300",
          field: "prodi_pilihan_1",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "syarat_lengkap",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "keterangan_disablitas",
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
          id_params: "formulir_id",
          route: "/pmb/verifikasi-reg-ulang/verifikasi-reg-ulang",
          type: "route",
          icon: "fa fa-edit text-warning",
          toolTip: "Verifikasi Kelulusan Peserta",
        },
        {
          id_params: "formulir_id",
          route:
            "/pmb/staff/penyaringan-pmb/verifikasi-dokumen/informasi-lengkap-peserta",
          type: "route",
          icon: "fa fa-info-circle text-info",
          toolTip: "Informasi Lengkap Peserta",
        },
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
