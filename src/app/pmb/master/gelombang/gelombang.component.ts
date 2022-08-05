import { Component, OnInit, ViewChild, ComponentFactoryResolver } from "@angular/core";
import { Directive, ViewContainerRef } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl,
} from "@angular/platform-browser";
import { finalize, map, takeUntil } from "rxjs/operators";
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
import { DataService } from "../../../core/services/data.service";
import { TahunAkademikRoutes } from "src/app/main/master-data/tahun-akademik/tahun-akademik.routing";
import { CustomTable } from "../../../components/custom-table/custom-table.interface";
import { Type } from '@angular/core';


declare const require: any;

declare const $: any;

@Component({
  selector: "app-gelombang",
  templateUrl: "gelombang.component.html",
  styleUrls: ["./gelombang.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class GelombangComponent implements OnInit {
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

  FormDialogComponent=FormDialogComponent;

  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private dataService: DataService,
    public dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef
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
    // this.loadData(0, "", "", this.listData.type);
  }
  loadData(page: number, filter, condition, type): void {
    this.isLoadingTable = true;
    this.listData.type = type;

    if (type == "order") {
      this.listData.order = filter;
    } else if (type == "filter") {
      this.listData.where = condition;
    }

    this.dataService
      .getPostRequest<any>("/pmb/master/gelombang", {
        offset: page,
        limit: this.pageSize,
        order: this.listData.order,
        where: this.listData.where,
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

  

  deleteData(i, data) {
    swal
      .fire({
        title: "Delete Data",
        text: "Apakah Yakin Akan Menghapus Data Ini?",
        icon: "warning",
        showCancelButton: true,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn btn-success",
        },
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        buttonsStyling: false,
      })
      .then((result) => {
        if (result.value) {
          this.submitDeleteRequest(data.kode);
          console.log(result.value);
        }
      });
  }

  submitDeleteRequest(kode): void {
    const payload = {
      kode: kode,
    };

    let endpoint = "/pmb/master/gelombang/remove";
    this.dataService.getPostRequest<any>(endpoint, payload).subscribe(
      (success) => {
        if (success.message == "Invalid Parameter") {
          swal.fire({
            title: "Master Gelombang",
            text: "Data Master Gelombang Gagal di Hapus.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-error",
            },
            buttonsStyling: false,
          });
        } else {
          swal
            .fire({
              title: "Master Gelombang",
              text: "Data Master Gelombang Berhasil di Hapus !",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-success",
              },
              buttonsStyling: false,
              showCancelButton: false,
              confirmButtonText: "Ok",
            })
            .then((result) => {
              this.loadData(0, "", "", this.listData.type);
            });
        }
      },
      (error) => {
        swal.fire({
          title: "Master Gelombang",
          text: "Data Master Gelombang Gagal di Hapus.",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-error",
          },
          buttonsStyling: false,
        });
      }
    );
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
    console.log(event);
    this.loadData(event.pageIndex + 0, "", "", this.listData.type);
  }

  inisialisasiTable() {
    this.listData = {
      filter: true,
      init_load: true,
      is_role: false,
      is_role_params: {
        prodi: ''
      },
      endpoint: "pmb/master/gelombang",
      action_name: "",
      type: "order",
      order: "id_aktif asc",
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
          label: "Kode",
          class:
            "text-sm text-center border border-black-300 bg-gray-400 w-10",
          field: "kode",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Tahun Akademik",
          class:
            "text-sm text-center border border-black-300 bg-gray-400 w-32",
          field: "tahun_akademik",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Gelombang",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "id_gelombang",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Nama",
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
          label: "Mulai Pendaftaran",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "mulai_pendaftaran",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Selesai Pendaftaran",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "selesai_pendaftaran",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Selesai Pendaftaran Online",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "selesai_pendaftaran_online",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Aktif?",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "id_aktif",
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
              label: "Aktif",
            },
            {
              id: "T",
              label: "Tidak Aktif",
            },
          ],
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
          field: "no",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "kode",
        },
        {
          type: "",
          count_field: [],
          class: "text-center  border border-black-300",
          field: "tahun_akademik",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "id_gelombang",
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
          class: "text-center border border-black-300",
          field: "mulai_pendaftaran",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "selesai_pendaftaran",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "selesai_pendaftaran_online",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "id_aktif",
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
          id_params: "kode",
          route: "pmb/master/gelombang/detail-gelombang",
          type: "route",
          controller: "FormDialogComponent",
          icon: "fa fa-info-circle",
          toolTip: "Detail",
          condition: [{
            params_1: "kode",
            operator: "!=",
            params_2: null,
          }],
        },
        {
          id_params: "kode",
          route: "pmb/master/gelombang/ubah-gelombang",
          type: "route",
          controller: "FormDialogComponent",
          toolTip: "Ubah Data",
          icon: "fa fa-edit text-warning",
          condition: [{
            params_1: "kode",
            operator: "!=",
            params_2: null,
          }],
        },
        // {
        //   id_params: "",
        //   route: "",
        //   type: "",
        //   toolTip: "Delete Data",
        //   icon: "fa fa-trash text-danger",
        // },
      ],
      data: [],
    };
  }
  ubahData(i, data) {
    this.router.navigate(["ubah-gelombang/" + data.kode], {
      relativeTo: this._activatedRoute,
    });
  }

  detailData(i, data) {
    this.router.navigate(["detail-gelombang/" + data.kode], {
      relativeTo: this._activatedRoute,
    });
  }
  setSortBy(field, type, data) {
    for (let i = 0; i < this.listData.header.length; i++) {
      if (this.listData.header[i].field != field) {
        this.listData.header[i].sort_type = "";
      }
    }

    data.sort_type = type;

    let order = field + " " + type;

    if (type == "") {
      order = "";
    }

    this.loadData(0, order, "", "order");
  }

  setFilterBy(field, filter, data) {
    if (data.filter_type == "text" && filter.length < 2) {
      if (filter == "") {
        for (let i = 0; i < this.listData.header.length; i++) {
          if (
            this.listData.header[i].field == field &&
            this.listData.header[i].filter_value == ""
          ) {
            this.loadData(0, "", "", this.listData.type);
          }
        }
      }
      return true;
    }

    for (let i = 0; i < this.listData.header.length; i++) {
      if (this.listData.header[i].field != field) {
        this.listData.header[i].filter_value = null;
      }
    }

    if (filter == "") {
      for (let i = 0; i < this.listData.header.length; i++) {
        if (
          this.listData.header[i].field == field &&
          this.listData.header[i].filter_value == ""
        ) {
          this.loadData(0, "", "", this.listData.type);
        }
      }
      return true;
    }

    let search = field + " like '%" + filter + "%'";

    this.loadData(0, "", search, "filter");
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
 
