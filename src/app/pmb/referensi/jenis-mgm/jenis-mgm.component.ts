import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
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
import { DataService } from "../../../core/services/data.service";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { CustomTable } from "../../../components/custom-table/custom-table.interface";

declare const require: any;

declare const $: any;

@Component({
  selector: "app-jenis-mgm",
  templateUrl: "jenis-mgm.component.html",
  styleUrls: ["./jenis-mgm.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class JenisMGMComponent implements OnInit {
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
    this.inisialisasiTable();
    this.loadData(0);
  }

  loadData(page: number): void {
    this.isLoadingTable = true;
    this.dataService
      .getPostRequest<any>("/pmb/referensi/jenisMgm", {
        offset: page,
        limit: this.pageSize,
      })
      .pipe(
        map((response) => response),
        finalize(() => setTimeout(() => (this.isLoadingTable = false), 1000))
      )
      .subscribe(
        (response) => {
          this.listData.data = response.result;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  manageData(data) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        type: data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteData(data) {
    swal
      .fire({
        title: "Hapus Referensi Grade",
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
          swal.fire({
            title: "Dihapuskan!",
            text: "Referensi Grade Telah Dihapuskan.",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false,
          });
        } else {
          swal.fire({
            title: "Dibatalkan",
            text: "Reference Grade Tidak Jadi Dihapuskan",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-info",
            },
            buttonsStyling: false,
          });
        }
      });
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
    console.log(event);
    this.loadData(event.pageIndex + 0);
  }

  inisialisasiTable() {
    this.listData = {
      is_action:true,
      filter: false,
      init_load: true,
      is_role: false,
      is_role_params: {
        prodi: "kode_prodi",
      },
      endpoint: "pmb/referensi/jenisMgm",
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
      filter_data: [],
      header: [
        {
          type: "",
          label: "ID",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
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
          label: "Jenis MGM",
          class:
            "text-sm text-center border border-black-300 bg-gray-400 w-max",
          field: "kode",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Aktif ?",
          class:
            "text-sm text-center border border-black-300 bg-gray-400 w-max",
          field: "tahun_akademik",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Diubah Oleh",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "id_gelombang",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Waktu Ubah",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "nama",
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
          class:
            "text-sm disabled-sorting text-center w-40 border border-black-300 bg-gray-400",
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
          class: "text-center border border-black-300",
          field: "id",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "jenis_mgm",
        },
        {
          type: "",
          count_field: [],
          class: "text-center  border border-black-300",
          field: "id_aktif",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "diubah_oleh",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "waktu_ubah",
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
          route:"pmb/referensi/jenis-mgm/ubah-jenis-mgm",
          type: "route",
          icon: "fa fa-edit text-warning",
          toolTip: "Jenis MGM"
        },],
      data: [],
      export:[{
        type:"csv",
        label:"CSV",
        label_report:"report-ref-jenis-mgm"
      },
      {
        type:"pdf",
        label:"PDF",
        label_report:"report-ref-jenis-mgm"
      },
      {
        type:"excel",
        label:"EXCEL",
        label_report:"report-ref-jenis-mgm"
      }]
    };
  }
}
