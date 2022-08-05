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
import { DataService } from "../../../../core/services/data.service";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";

declare const require: any;

declare const $: any;

@Component({
  selector: "app-gelombang",
  templateUrl: "jenis-disabilitas.component.html",
  styleUrls: ["./jenis-disabilitas.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class JenisDisabilitasComponent implements OnInit {
  listData = {
    header: [],
    field: [],
    action: [],
    data: [],
  };

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
      .getPostRequest<any>("/pmb/referensi/jenisDisabilitas", {
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
        title: "Hapus Jenis Disabilitas",
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
            text: "Referensi Jenis Disabilitas Berhasil dihapus!.",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false,
          });
        } else {
          swal.fire({
            title: "Dibatalkan",
            text: "Referensi Jenis Disabilitas Gagal dihapus!.",
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
      header: [
        {
          label: "ID",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-20",
          field: "id",
        },
        {
          label: "Jenis Disabilitas",
          class: "text-sm text-left border border-black-300 bg-gray-400 w-30",
          field: "jenis_disabilitas",
        },
        {
          label: "AKTIF",
          class: "text-sm text-left border border-black-300 bg-gray-400 w-30",
          field: "aktif",
        },
        {
          label: "DIBUAT OLEH",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: "dibuat_oleh",
        },
        {
          label: "WAKTU UBAH",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: "waktu_ubah",
        },
        {
          label: "AKSI",
          class:
            "text-sm disabled-sorting text-center w-25 border border-black-300 bg-gray-400",
          field: "action",
        },
      ],
      field: [
        {
          class: "text-center border border-black-300",
          field: "id",
        },
        {
          class: "text-left border border-black-300",
          field: "jenis_disabilitas",
        },
        {
          class: "text-left border border-black-300",
          field: "id_aktif",
        },
        {
          class: "text-left border border-black-300",
          field: "diubah_oleh",
        },
        {
          class: "text-left border border-black-300",
          field: "waktu_ubah",
        },
        {
          class: "text-center border border-black-300",
          field: "action",
        },
      ],
      action: [
        {
          action_name: "manageData",
          icon: "fa fa-edit text-warning",
          toolTip: "Edit Data",
        },
        {
          action_name: "deleteData",
          icon: "fa fa-trash text-danger",
          toolTip: "Delete Data",
        },
      ],
      data: [],
    };
  }
}
