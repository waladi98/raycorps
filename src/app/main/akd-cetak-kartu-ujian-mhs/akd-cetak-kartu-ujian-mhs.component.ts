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
  selector: 'app-akd-cetak-kartu-ujian-mhs',
  templateUrl: 'akd-cetak-kartu-ujian-mhs.component.html',
  styleUrls: ['./akd-cetak-kartu-ujian-mhs.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class AkdCetakKartuUjianMhsComponent implements OnInit {

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
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'no',
        },
        {
          label: 'Tanggal',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'tanggal',
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
          label: 'Prodi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'prodi',
        },
        {
          label: 'Kode MK',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'kode_mk',
        },
        {
          label: 'Matakuliah',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'matakuliah',
        },
        {
          label: 'Kelas',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'kelas',
        },
        {
          label: 'Adm',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'adm',
        },
        {
          label: 'Kmhs.',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'kmhs',
        },
        {
          label: 'Lab.',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'lab',
        },
        {
          label: 'P B M',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'pbm',
        },
        {
          label: 'No Kursi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'no_kursi',
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
          label: 'Presensi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'presensi',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tanggal',
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
          field: 'prodi',
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
          field: 'adm',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kmhs',
        },
        {
          class: 'text-center border border-black-300',
          field: 'lab',
        },
        {
          class: 'text-center border border-black-300',
          field: 'pbm',
        },
        {
          class: 'text-center border border-black-300',
          field: 'no_kursi',
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
          field: 'presensi',
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
          tanggal: '00-00-0000',
          jam: '00:00 - 00:00',
          ruang: 'eLearning',
          prodi: 'Teknik Informatika',
          kode_mk: 'IF162801',
          matakuliah: 'APLIKASI ENTERPRISE',
          kelas: 'V',
          adm: 'V',
          kmhs: 'V',
          lab: 'V',
          pbm: 'V',
          no_kursi: 'V',
          sks: '3',
          dosen: 'DODDY FERDIANSYAH, ST., MT.',
          presensi: '3.00/7',
        },
      ],
    };
  }
}
