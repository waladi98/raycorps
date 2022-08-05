import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';
// import { TahunAkademikRoutes } from 'src/app/main/master-data/tahun-akademik/tahun-akademik.routing';

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-kalender-akademik',
  templateUrl: 'kalender-akademik.component.html',
  styleUrls: ['./kalender-akademik.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class KalenderAkademikComponent implements OnInit {
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
  constructor(private router: Router, private _activatedRoute: ActivatedRoute, public breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
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

  // manageData(type) {
  //   const dialogRef = this.dialog.open(FormDialogComponent, {
  //     data: {
  //       type: type,
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

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
    this.listData = {
      header: [
        {
          label: 'ID',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-16',
          field: 'id',
        },
        {
          label: 'Nama',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'nama_kelengkapan',
        },
        {
          label: 'Program Studi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'program_studi',
        },
        {
          label: 'Required',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'required',
        },
        {
          label: 'Aktif',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'status',
        },
        {
          label: 'Dibuat Oleh',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'dibuat_oleh',
        },
        {
          label: 'Waktu Buat',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'waktu_Buat',
        },
        {
          label: 'Diubah Oleh',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'diubah_oleh',
        },
        {
          label: 'Waktu Ubah',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'waktu_ubah',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'id',
        },
        {
          class: 'text-center border border-black-300',
          field: 'nama_kelengkapan',
        },
        {
          class: 'text-center border border-black-300',
          field: 'program_studi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'required',
        },
        {
          class: 'text-center border border-black-300',
          field: 'status',
        },
        {
          class: 'text-center border border-black-300',
          field: 'dibuat_oleh',
        },
        {
          class: 'text-center border border-black-300',
          field: 'waktu_buat',
        },
        {
          class: 'text-center border border-black-300',
          field: 'diubah_oleh',
        },
        {
          class: 'text-center border border-black-300',
          field: 'waktu_ubah',
        },
      ],
      action: [
        {
          action_name: 'manageData',
          action_title: 'update',
          icon: 'fa fa-edit text-warning',
        },
      ],
      data: [
        {
          id: '1',
          nama_kelengkapan: 'Bukti Bayar Bank',
          program_studi: 'Kedokteran',
          required: 'Yes',
          status: 'Ya',
          dibuat_oleh: 'pmb_admin',
          waktu_buat: '22/02/2022',
          diubah_oleh: 'pmb_admin',
          waktu_ubah: '22/02/2022',
        },
        {
          id: '2',
          nama_kelengkapan: 'Bukti Bayar Bank',
          program_studi: 'Kedokteran',
          required: 'Yes',
          status: 'Ya',
          dibuat_oleh: 'pmb_admin',
          waktu_buat: '22/02/2022',
          diubah_oleh: 'pmb_admin',
          waktu_ubah: '22/02/2022',
        },
      ],
    };
  }
}
