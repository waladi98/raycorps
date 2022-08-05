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
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { StorageService } from "../../../../core/services/storage.service";
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
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;
  // snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  durationInSeconds = 10;
  snackBarRef;
  noPmb = this._storageService.get("proses_persyaratan");

  params: any;
  where_in = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private router: Router,
    private dataService: DataService,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _storageService: StorageService
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

    if (this.noPmb) {
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this.snackBarRef = this._snackBar.open(
      "Perubahan Data " + this.noPmb + " sedang diproses...",
      "Tutup",
      {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      }
    );
    this.snackBarRef.afterDismissed().subscribe(() => {
      this._storageService.remove("proses_persyaratan");
    });
  }

  verifyData() {
    this.router.navigate([
      "/pmb/transaksi/proses-persyaratan/verifikasi-peserta",
    ]);
  }

  manageData() {
    this.router.navigate([
      "/pmb/transaksi/proses-persyaratan/informasi-lengkap-peserta",
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
      filter: true,
      init_load: true,
      is_role: true,
      is_role_params: {
        prodi: "kode_prodi",
      },
      endpoint: "pmb/pesertaPersyaratanProdi",
      action_name: "",
      type: "",
      order: "syarat_lengkap asc",
      where:
        "id_status_dokumen = '0' AND kode_komponen IN ( '28c0b70fe5b633c776fdc0c15643d8fe','5371790af331f94199b824d8ba93dae4')",
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
          label: "No. Peserta",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "peserta_id",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "No. PMB",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "formulir_id",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Nama Peserta",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "nama",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Prodi",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "prodi",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Persyaratan",
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
          label: "Dokumen",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-24",
          field: "path_dokumen",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Status Dokumen",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "status_dokumen",
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
          class: "text-center border border-black-300 w-10",
          field: "peserta_id",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-10",
          field: "formulir_id",
        },

        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-10",
          field: "nama",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-16",
          field: "kode_prodi",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-48",
          field: "persyaratan",
        },
        {
          count_field: [],
          type: "download",
          class: "text-center border border-black-300 w-64 dokumen",
          field: "path_dokumen",
          condition: {
            field: "path_dokumen",
            is_show_value: true,
            default: "Tidak Ada File",
          },
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-10",
          field: "status_dokumen",
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
          route: "/pmb/transaksi/unggah-sertifikat-psikotes/verifikasi-peserta",
          type: "route",
          icon: "fa fa-edit text-warning",
          toolTip: "Unggah Dokumen persyaratan",
          condition: [
            {
              params_1: "id",
              operator: "!=",
              params_2: null,
            },
          ],
        },
        // {
        //   id_params: "id",
        //   route:
        //     "/pmb/transaksi/unggah-sertifikat-psikotes/informasi-lengkap-peserta",
        //   type: "route",
        //   icon: "fa fa-info-circle text-info",
        //   toolTip: "Informasi Lengkap Peserta",
        //   condition: [
        //     {
        //       params_1: "id",
        //       operator: "!=",
        //       params_2: null,
        //     },
        //   ],
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
