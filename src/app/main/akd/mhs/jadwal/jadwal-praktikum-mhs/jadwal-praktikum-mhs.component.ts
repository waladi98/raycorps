import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-akd-jadwal-praktikum-mhs',
  templateUrl: 'jadwal-praktikum-mhs.component.html',
  styleUrls: ['./jadwal-praktikum-mhs.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class JadwalPraktikumMhsComponent implements OnInit {

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
          label: 'No',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'no',
        },
        {
          label: 'Jam',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'jam',
        },
        {
          label: 'Kode MK',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'kode_mk',
        },
        {
          label: 'Matakuliah',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-52',
          field: 'matakuliah',
        },
        {
          label: 'SKS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'sks',
        },
        {
          label: 'Kelas',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'kelas',
        },
        {
          label: 'Ruang',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'ruang',
        },
        {
          label: 'Dosen',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'dosen',
        },
        {
          label: 'Presensi',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'presensi',
        },
        // {
        //   label: 'Pindah Kelas',
        //   class: 'text-sm text-center border border-black-300 bg-header-table text-white',
        //   field: 'pindah_kelas',
        // },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jam',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kode_mk',
        },
        {
          class: 'text-center border border-black-300',
          field: 'matakuliah',
        },
        {
          class: 'text-center border border-black-300',
          field: 'sks',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kelas',
        },
        {
          class: 'text-center border border-black-300',
          field: 'ruang',
        },
        {
          class: 'text-center border border-black-300',
          field: 'dosen',
        },
        {
          class: 'text-center border border-black-300',
          field: 'presensi',
        },
        // {
        //   class: 'text-center border border-black-300',
        //   field: 'pindah_kelas',
        // },
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
          jam: '13:00 - 14:00',
          kode_mk: 'IF162801',
          matakuliah: 'APLIKASI ENTERPRISE',
          sks: '3 (3)',
          kelas: 'V',
          ruang: 'eLearning',
          dosen: 'Asisten Lab IF',
          presensi: '3.00 dari 7 pertemuan (42.86%)',
        },
        {
          jam: '13:00 - 14:00',
          kode_mk: 'IF162801',
          matakuliah: 'INPA',
          sks: '3 (3)',
          kelas: 'V',
          ruang: 'eLearning',
          dosen: 'Asisten Lab IF',
          presensi: '3.00 dari 7 pertemuan (42.86%)',
        },
        {
          jam: '13:00 - 14:00',
          kode_mk: 'IF162801',
          matakuliah: 'IOT',
          sks: '3 (3)',
          kelas: 'V',
          ruang: 'eLearning',
          dosen: 'Asisten Lab IF',
          presensi: '3.00 dari 7 pertemuan (42.86%)',
        },
        {
          jam: '13:00 - 14:00',
          kode_mk: 'IF162801',
          matakuliah: 'APSI',
          sks: '3 (3)',
          kelas: 'V',
          ruang: 'eLearning',
          dosen: 'Asisten Lab IF',
          presensi: '3.00 dari 7 pertemuan (42.86%)',
        },
      ],
    };
  }
}
