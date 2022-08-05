import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import swal from 'sweetalert2';
// import { TahunAkademikRoutes } from 'src/app/main/master-data/tahun-akademik/tahun-akademik.routing';

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-peserta',
  templateUrl: 'peserta.component.html',
  styleUrls: ['./peserta.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PesertaComponent implements OnInit {
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
          label: 'KODE GELOMBANG',
          class: 'text-sm text-center border border-black-300 bg-gray-400 ',
          field: 'kode_gelombang',
        },
        {
          label: 'JENIS FORMULIR',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'jenis_formulir',
        },
        {
          label: 'NO PENDAFTAR',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'no_pendaftar',
        },
        {
          label: 'TANGGAL DAFTAR',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'tanggal_daftar',
        },
        {
          label: 'NAMA',
          class: 'text-sm text-left border border-black-300 bg-gray-400 w-52',
          field: 'nama',
        },
        {
          label: 'PRODI PILIHAN 1',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'prodi_pilihan_1',
        },
        {
          label: 'JENJANG',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'jenjang',
        },
        {
          label: 'JURUSAN SLTA',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'jurusan_slta',
        },
        {
          label: 'HANDPHONE',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'handphone',
        },
        {
          label: 'EMAIL',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'email',
        },
        {
          label: 'AKSI',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'action',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'id',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kode_gelombang',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jenis_formulir',
        },
        {
          class: 'text-center border border-black-300',
          field: 'no_pendaftar',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tanggal_daftar',
        },
        {
          class: 'text-left border border-black-300',
          field: 'nama',
        },
        {
          class: 'text-center border border-black-300',
          field: 'prodi_pilihan_1',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jenjang',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jurusan_slta',
        },
        {
          class: 'text-center border border-black-300',
          field: 'handphone',
        },
        {
          class: 'text-center border border-black-300',
          field: 'email',
        },
        {
          class: 'text-center border border-black-300',
          field: 'action',
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
          kode_gelombang: 'Gelombang 1',
          jenis_formulir: 'PMDK - Formulir S1-IPA',
          no_pendaftar: 'PMB202101080',
          tanggal_daftar: '22 / 01 / 2022',
          nama: 'Fulan',
          prodi_pilihan_1: 'Kedokteran',
          jenjang: 'S1',
          jurusan_slta: 'SMU',
          handphone: '853204442',
          email: 'mail@mail.com',
        },
        {
          id: '2',
          kode_gelombang: 'Gelombang 1',
          jenis_formulir: 'PMDK - Formulir S1-IPA',
          no_pendaftar: 'PMB202101080',
          tanggal_daftar: '22 / 01 / 2022',
          nama: 'Fulan',
          prodi_pilihan_1: 'Kedokteran',
          jenjang: 'S1',
          jurusan_slta: 'SMK',
          handphone: '853204442',
          email: 'mail@mail.com',
        },
        {
          id: '3',
          kode_gelombang: 'Gelombang 1',
          jenis_formulir: 'PMDK - Formulir S1-IPA',
          no_pendaftar: 'PMB202101080',
          tanggal_daftar: '22 / 01 / 2022',
          nama: 'Fulan',
          prodi_pilihan_1: 'Kedokteran',
          jenjang: 'S1',
          jurusan_slta: 'SMK',
          handphone: '853204442',
          email: 'mail@mail.com',
        },
        {
          id: '4',
          kode_gelombang: 'Gelombang 1',
          jenis_formulir: 'PMDK - Formulir S1-IPA',
          no_pendaftar: 'PMB202101080',
          tanggal_daftar: '22 / 01 / 2022',
          nama: 'Fulan',
          prodi_pilihan_1: 'Kedokteran',
          jenjang: 'S1',
          jurusan_slta: 'SMK',
          handphone: '853204442',
          email: 'mail@mail.com',
        },
        {
          id: '5',
          kode_gelombang: 'Gelombang 1',
          jenis_formulir: 'PMDK - Formulir S1-IPA',
          no_pendaftar: 'PMB202101080',
          tanggal_daftar: '22 / 01 / 2022',
          nama: 'Fulan',
          prodi_pilihan_1: 'Kedokteran',
          jenjang: 'S1',
          jurusan_slta: 'SMK',
          handphone: '853204442',
          email: 'mail@mail.com',
        },
      ],
    };
  }
}
