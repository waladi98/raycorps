import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogProdiPilihanComponent } from './form-dialog-prodi-pilihan/form-dialog-prodi-pilihan.component';
import { FormDialogKomponenNilaiComponent } from './form-dialog-komponen-nilai/form-dialog-komponen-nilai.component';
import swal from 'sweetalert2';

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-prodi-pilihan-dan-komponen-nilai',
  templateUrl: 'prodi-pilihan-dan-komponen-nilai.component.html',
  styleUrls: ['./prodi-pilihan-dan-komponen-nilai.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class ProdiPilihanDanKomponenNilaiComponent implements OnInit {
  listDataProdiPilihan = {
    header: [],
    field: [],
    action: [],
    data: [],
  };

  listDataKomponenNilai = {
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

  manageDataProdiPilihan(type) {
    const dialogRef = this.dialog.open(FormDialogProdiPilihanComponent, {
      data: {
        type: type,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  manageDataKomponenNilai(type) {
    const dialogRef = this.dialog.open(FormDialogKomponenNilaiComponent, {
      data: {
        type: type,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ubahData(action_name) {
    this.router.navigateByUrl('ubah-jenis-formulir');
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
    this.listDataProdiPilihan = {
      header: [
        {
          label: 'JENIS PRODI',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-36',
          field: 'jenis_prodi',
        },
        {
          label: 'PILIHAN KE',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-36',
          field: 'pilihan',
        },
        {
          label: 'PROGRAM STUDI',
          class: 'text-sm text-left border border-black-300 bg-gray-400',
          field: 'program_studi',
        },
        {
          label: 'AKTIF',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'status',
        },
        {
          label: 'AKSI',
          class: 'text-sm disabled-sorting text-center w-56 border border-black-300 bg-gray-400',
          field: 'action',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'jenis_prodi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'pilihan',
        },
        {
          class: 'text-left border border-black-300',
          field: 'program_studi',
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
          action_name: 'manageDataProdiPilihan',
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
          jenis_prodi: 'PMDK-Sarjana',
          pilihan: '1',
          program_studi: 'Kedokteran',
          status: 'Tidak',
        },
        {
          jenis_prodi: 'PMDK-Sarjana',
          pilihan: '3',
          program_studi: 'Teknik Informatika',
          status: 'Aktif',
        },
      ],
    };

    this.listDataKomponenNilai = {
      header: [
        {
          label: 'JENIS PRODI',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-36',
          field: 'jenis_prodi',
        },
        {
          label: 'KOMPONEN TEST / SELEKSI',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-36',
          field: 'komponen_seleksi',
        },
        {
          label: 'NILAI MINIMUM',
          class: 'text-sm text-left border border-black-300 bg-gray-400',
          field: 'nilai_minimum',
        },
        {
          label: 'BOBOT',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'bobot',
        },
        {
          label: 'AKTIF',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'status',
        },
        {
          label: 'AKSI',
          class: 'text-sm disabled-sorting text-center w-56 border border-black-300 bg-gray-400',
          field: 'action',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'jenis_prodi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'komponen_seleksi',
        },
        {
          class: 'text-left border border-black-300',
          field: 'nilai_minimum',
        },
        {
          class: 'text-left border border-black-300',
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
          action_name: 'manageDataKomponenNilai',
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
          jenis_prodi: 'PMDK-Sarjana',
          komponen_seleksi: 'B.Inggris / 4',
          nilai_minimum: '80',
          bobot: '80',
          status: 'Tidak',
        },
      ],
    };
  }
}
