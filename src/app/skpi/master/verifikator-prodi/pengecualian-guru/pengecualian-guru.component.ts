import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import swal from 'sweetalert2';

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-pengecualian-guru',
  templateUrl: 'pengecualian-guru.component.html',
  styleUrls: ['./pengecualian-guru.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PengecualianGuruComponent implements OnInit {
  listPengecualianKelengkapan = {
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
  constructor(private _activatedRoute: ActivatedRoute, private router: Router, public breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isScreenSmall = true;
        console.log('Matches small viewport or handset in portrait mode');
      } else {
        this.isScreenSmall = false;
      }
    });
    this._activatedRoute.params.subscribe((params: any) => (this.params = params));
  }
  ngOnInit() {
    this.inisialisasiTable();
  }

  managePengecualianKelengkapan(type) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        type: type,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ubahData(action_name) {
    this.router.navigateByUrl('ubah-kelengkapan');
  }

  deleteData(data) {
    swal
      .fire({
        title: 'Delete Data',
        text: 'Apakah Yakin Akan Menghapus Data Ini?',
        icon: 'warning',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal',
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
    this.listPengecualianKelengkapan = {
      header: [
        {
          label: '#',
          class: 'text-sm text-center border border-black-300 bg-gray-400 col-1',
          field: 'no',
        },
        {
          label: 'Kode Except',
          class: 'text-sm text-center border border-black-300 bg-gray-400 col-2',
          field: 'kode_except',
        },
        {
          label: 'Program Studi',
          class: 'text-sm text-center border border-black-300 bg-gray-400 col-3',
          field: 'program_studi',
        },
        {
          label: 'Wajib',
          class: 'text-sm text-center border border-black-300 bg-gray-400 col-2',
          field: 'wajib',
        },
        {
          label: 'Aktif',
          class: 'text-sm text-center border border-black-300 bg-gray-400 col-2',
          field: 'status',
        },
        {
          label: 'Aksi',
          class: 'text-sm disabled-sorting text-center border border-black-300 bg-gray-400',
          field: 'action',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kode_except',
        },
        {
          class: 'text-center border border-black-300',
          field: 'program_studi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'wajib',
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
          action_name: 'managePengecualianKelengkapan',
          icon: 'fa fa-edit text-warning',
          action_title: 'update',
          toolTip: "Ubah Data",
        },
        {
          action_name: 'deleteData',
          icon: 'fa fa-trash text-danger',
          toolTip: "Hapus Data"
        },
      ],
      data: [
        {
          kode_except: '1',
          program_studi: 'Kedokteran',
          wajib: 'Ya',
          status: 'Aktif',
        },
        {
          kode_except: '2',
          program_studi: 'Teknik Informatika',
          wajib: 'Tidak',
          status: 'Tidak',
        },
      ],
    };
  }
}
