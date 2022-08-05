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
  selector: 'app-akd-nilai-perkuliahan-dosen',
  templateUrl: 'nilai-perkuliahan-dosen.component.html',
  styleUrls: ['./nilai-perkuliahan-dosen.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class NilaiPerkuliahanDosenComponent implements OnInit {

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

  uploadData(data) {
    swal
      .fire({
        title: 'Upload Data',
        // text: 'Pilih File',
        // icon: 'warning',
        // showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-success',
        },
        confirmButtonText: 'Pilih File',
        // cancelButtonText: 'Batal',
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
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-16',
          field: 'no',
        },
        {
          label: 'Jam',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'jam',
        },
        {
          label: 'Ruang',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'ruang',
        },
        {
          label: 'Kode MK',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'kode_mk',
        },
        {
          label: 'Matakuliah',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-52',
          field: 'matakuliah',
        },
        {
          label: 'Kelas',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'kelas',
        },
        {
          label: 'SKS',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'sks',
        },
        {
          label: 'Dosen',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'dosen',
        },
        {
          label: 'Asisten',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'asisten',
        },
        {
          label: 'Peserta',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'peserta',
        },
        {
          label: 'Pendaftar',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'pendaftar',
        },
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
          field: 'ruang',
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
          field: 'kelas',
        },
        {
          class: 'text-center border border-black-300',
          field: 'sks',
        },
        {
          class: 'text-center border border-black-300',
          field: 'dosen',
        },
        {
          class: 'text-center border border-black-300',
          field: 'asisten',
        },
        {
          class: 'text-center border border-black-300',
          field: 'peserta',
        },
        {
          class: 'text-center border border-black-300',
          field: 'pendaftar',
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
          jam: '07:00 - 08:40',
          ruang: 'eLearning',
          kode_mk: 'IF164606',
          matakuliah: 'VERIFIKASI & VALIDASI PERANGKAT LUNAK',
          kelas: 'A',
          sks: '2',
          dosen: 'DR. AYI PURBASARI, ST., MT.',
          asisten: '-',
          peserta: '46',
          pendaftar: '46',
        },
      ],
    };
  }
}
