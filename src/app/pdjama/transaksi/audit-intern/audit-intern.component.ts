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
import { FormDialogEditComponent } from "./form-dialog-edit/form-dialog-edit.component";
import { FormDialogDeleteComponent } from "./form-dialog-delete/form-dialog-delete.component";
//untuk memanggil base url
import { DataService } from "../../../core/services/data.service";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { CustomTable } from "../../../components/custom-table/custom-table.interface";

declare const require: any;

declare const $: any;

@Component({
  selector: "app-audit-intern",
  templateUrl: "audit-intern.component.html",
  styleUrls: ["./audit-intern.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class AuditInternComponent implements OnInit {
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
  FormDialogEditComponent = FormDialogEditComponent;
  FormDialogDeleteComponent = FormDialogDeleteComponent;
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
      endpoint: "pdjama/auditInternal",
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
      filter_data: [],
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
          field: "nama_tahun_periode",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Nama Audit",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "nama_audit",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Bidang",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "nama_bidang",
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
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "nama_tahun_periode",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "nama_audit",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "nama_bidang",
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
          route: "/pdjama/transaksi/audit-internall/kriteria-penilaian",
          type: "route",
          icon: "fa fa-cog text-info",
          toolTip: "Butir Penilaian",
          condition: [
            {
              params_1: "id",
              operator: "!=",
              params_2: null,
            },
          ],
        },
        {
          id_params: "id",
          route: "",
          type: "dialog",
          controller: "FormDialogEditComponent",
          toolTip: "Edit Data",
          icon: "fa fa-edit text-warning",
          // condition: [
          //   {
          //     params_1: "kode",
          //     operator: "!=",
          //     params_2: null,
          //   },
          // ],
        },
        {
          id_params: "id",
          route: "",
          type: "dialog",
          controller: "FormDialogDeleteComponent",
          toolTip: "Delete Data",
          icon: "fa fa-trash text-danger",
          // condition: [
          //   {
          //     params_1: "kode",
          //     operator: "!=",
          //     params_2: null,
          //   },
          // ],
        },
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
