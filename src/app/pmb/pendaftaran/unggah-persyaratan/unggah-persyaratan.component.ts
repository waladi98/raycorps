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
import { CustomTable } from "../../../components/custom-table/custom-table.interface";
import { DataService } from "../../../../app/core/services/data.service";
import { AuthService } from "../../../core/auth/auth.service";
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription, Observable } from "rxjs";

declare const require: any;
declare const $: any;

@Component({
  selector: "app-unggah-persyaratan",
  templateUrl: "unggah-persyaratan.component.html",
  styleUrls: ["./unggah-persyaratan.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class UnggahPersyaratanComponent implements OnInit {
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

  where_in = [];

  FormDialogComponent=FormDialogComponent;

  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private router: Router,
    private dataService: DataService,
    private _authService: AuthService,
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
      filter: true,
      init_load: true,
      is_role: false,
      where_param: [{
        field: "peserta_id",
        value: "peserta_id",
        type: "local"
      }],
      is_role_params: {
        prodi: "kode_prodi",
      },
      endpoint: "pmb/pesertaPersyaratanProdi",
      action_name: "pmb/pesertaPersyaratanProdi",
      type: "",
      order: "required desc",
      where: "",
      group: "",
      pageSize:11,
      dynamic_header_field: "",
      dynamic_header_name: "",
      dynamic_header_value: "",
      dynamic_header_type: "",
      dynamic_header_add_index: 0,
      filter_data: [],
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
        // {
        //   type: "",
        //   label: "No. Peserta",
        //   class: "text-sm text-center border border-black-300 bg-gray-400 w-40",
        //   field: "peserta",
        //   filter: false,
        //   filter_type: "text",
        //   filter_value: null,
        //   sort: false,
        //   sort_type: "",
        //   data: [],
        // },

        {
          type: "",
          label: "Pesyaratan",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "pilihan_ke",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Required",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-32",
          field: "required",
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
          class: "text-sm text-center border border-black-300 bg-gray-400 w-40",
          field: "dokumen",
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
          class: "text-sm text-center border border-black-300 bg-gray-400 w-32",
          field: "catatan",
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
        // {
        //   type: "",
        //   count_field: [],
        //   class: "text-center border border-black-300",
        //   field: "peserta_id",
        // },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "persyaratan",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "required",
          condition: {
            field: "required",
            is_show_value: false,
            default: "Tidak Ada File",
          },
        },

        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "status_dokumen",
        },
       
        {
          type: "download",
          count_field: [],
          class: "text-center border border-black-300",
          field: "path_to_dokumen_core",
          condition: {
            field: "path_to_dokumen_core",
            is_show_value: true,
            default: "Tidak Ada File",
          },
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
          id_params: "id",
          type: "dialog",
          controller: "FormDialogComponent",
          icon: "fa fa-edit text-warning",
          toolTip: "Unggah Dokumen",
          condition: [{
            params_1: "id_status_dokumen",
            operator: "!=",
            params_2: "4",
          }],
        },
        {
          id_params: "id",
          type: "dialog",
          controller: "FormDialogComponent",
          icon: "fa fa-info text-info",
          toolTip: "Detail Informasi",
          condition: [{
            params_1: "id_status_dokumen",
            operator: "==",
            params_2: "4",
          }],
        }
      
      ],
      data: [],
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
