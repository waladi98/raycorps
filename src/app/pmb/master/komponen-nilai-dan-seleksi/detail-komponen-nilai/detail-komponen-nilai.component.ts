import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { FormDialogDetailComponent } from './form-dialog-detail/form-dialog-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-detail-komponen-nilai',
  templateUrl: './detail-komponen-nilai.component.html',
  styleUrls: ['./detail-komponen-nilai.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class DetailKomponenNilaiComponent implements OnInit {
  listData = {
    header: [],
    field: [],
    action: [],
    data: []
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
          console.log(
            'Matches small viewport or handset in portrait mode'
          );
        } else {
          this.isScreenSmall = false;
        }
      });
    this._activatedRoute.params.subscribe((params: any) => (this.params = params));
  }
  ngOnInit() {
    this.inisialisasiTable();
  }

  manageData(type) {
    const dialogRef = this.dialog.open(FormDialogDetailComponent,
      {
        data: {
          type: type
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteData(data) {
    swal
      .fire({
        title: "Delete Data",
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

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: 'Kode',
          class: 'text-sm text-center border border-black-300 bg-gray-400 col-1',
          field: 'kode',
        },
        {
          label: 'Jurusan SLTA',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'jurusan_slta',
        },
        {
          label: 'Nilai Minimum',
          class: 'text-sm text-center border border-black-300 bg-gray-400 col-2',
          field: 'nilai_minimum',
        },
        {
          label: 'Bobot',
          class: 'text-sm text-center border border-black-300 bg-gray-400 col-2',
          field: 'bobot',
        },
        {
          label: 'Aktif',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'status',
        },
        {
          label: 'Aksi',
          class: 'text-sm disabled-sorting text-center border border-black-300 bg-gray-400 col-1',
          field: 'action',
        }
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'kode',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jurusan_slta',
        },
        {
          class: 'text-center border border-black-300',
          field: 'nilai_minimum',
        },
        {
          class: 'text-center border border-black-300',
          field: 'bobot',
        },
        {
          class: 'text-center border border-black-300',
          field: 'status',
        },
        {
          class: 'text-center border border-black-300',
          field: 'action',
        },
      ],
      action: [
        {
          action_name: 'manageData',
          icon: 'fa fa-edit text-warning',
          action_title: 'update',
        },
        {
          action_name: 'deleteData',
          icon: 'fa fa-trash text-danger',
        },
      ],
      data: [
        {
          kode: 'xx',
          jurusan_slta: 'IPA',
          nilai_minimum: '80',
          bobot: '80',
          status: 'Aktif',
        },
        {
          kode: 'xx',
          jurusan_slta: 'IPS',
          nilai_minimum: '70',
          bobot: '70',
          status: 'Tidak',
        }
      ],
    };
  }
}
