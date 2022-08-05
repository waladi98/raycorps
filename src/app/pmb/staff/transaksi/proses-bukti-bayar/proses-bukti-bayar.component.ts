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

declare const require: any;

declare const $: any;

@Component({
  selector: "app-proses-bukti-bayar",
  templateUrl: "proses-bukti-bayar.component.html",
  styleUrls: ["./proses-bukti-bayar.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class ProsesBuktiBayarComponent implements OnInit {
  tahun_akademik = [
    { value: "20021", viewValue: "Semester Gasal 2040 - 2041" },
    { value: "20331", viewValue: "Semester Gasal 2033 - 2034" },
    { value: "20330", viewValue: "Semester Transisi 2033 - 2034" },
    { value: "20304", viewValue: "Semester Transisi 2030 - 2031" },
    { value: "20303", viewValue: "Semester Sisipan 2030 - 2031" },
    { value: "20231", viewValue: "Semester Gasal 2023 - 2024" },
    { value: "20221", viewValue: "Semester Gasal 2023 - 2024" },
  ];

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
        title: "Hapus Gelombang",
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
            text: "Referensi Gelombang Telah Dihapuskan.",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false,
          });
        } else {
          swal.fire({
            title: "Dibatalkan",
            text: "Reference Gelombang Tidak Jadi Dihapuskan",
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
  }

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: "#",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-20",
          field: "no",
        },
        {
          label: "NOMOR PMB",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-32",
          field: "no_pmb",
        },
        {
          label: "NAMA",
          class: "text-sm text-left border border-black-300 bg-gray-400 w-48",
          field: "nama",
        },
        {
          label: "PRODI PILIHAN 1",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "program_studi",
        },
        {
          label: "HANDPHONE",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "no_hp",
        },
        {
          label: "STATUS BAYAR",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "status",
        },
        {
          label: "BUKTI BAYAR",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-32",
          field: "bukti_bayar",
        },
        {
          label: "AKSI",
          class:
            "text-sm disabled-sorting text-center border border-black-300 bg-gray-400",
          field: "action",
        },
      ],
      field: [
        {
          class: "text-center border border-black-300",
          field: "no",
        },
        {
          class: "text-center border border-black-300",
          field: "no_pmb",
        },
        {
          class: "text-left border border-black-300",
          field: "nama",
        },
        {
          class: "text-center border border-black-300",
          field: "program_studi",
        },
        {
          class: "text-center border border-black-300",
          field: "no_hp",
        },
        {
          class: "text-center border border-black-300",
          field: "status",
        },
        {
          class: "text-center border border-black-300",
          field: "bukti_bayar",
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
          action_title: "update",
        },
      ],
      data: [
        {
          no_pmb: "3",
          nama: "Fulan A",
          program_studi: "Kedokteran Gigi",
          no_hp: "081212121212",
          status: "Belum Bayar",
          bukti_bayar: "Link Dokumen",
        },
      ],
    };
  }
}
