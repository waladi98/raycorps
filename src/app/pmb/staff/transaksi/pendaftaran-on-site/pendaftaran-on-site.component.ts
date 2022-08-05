import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TambahPesertaComponent } from './tambah-peserta/tambah-peserta.component';
import { UbahPesertaComponent } from './ubah-peserta/ubah-peserta.component';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-pendaftaran-on-site',
  templateUrl: 'pendaftaran-on-site.component.html',
  styleUrls: ['./pendaftaran-on-site.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PendaftaranOnSiteComponent implements OnInit {

  tahun_akademik = [
    { value: '20021', viewValue: 'Semester Gasal 2040 - 2041' },
    { value: '20331', viewValue: 'Semester Gasal 2033 - 2034' },
    { value: '20330', viewValue: 'Semester Transisi 2033 - 2034' },
    { value: '20304', viewValue: 'Semester Transisi 2030 - 2031' },
    { value: '20303', viewValue: 'Semester Sisipan 2030 - 2031' },
    { value: '20231', viewValue: 'Semester Gasal 2023 - 2024' },
    { value: '20221', viewValue: 'Semester Gasal 2023 - 2024' },
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
    private router: Router,
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

  ubahData() {
    this.router.navigate(["ubah-peserta"], {
      relativeTo: this._activatedRoute,
    });
  }


  deleteData(data) {
    swal
      .fire({
        title: "Hapus Peserta",
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
            title: 'Dihapuskan!',
            text: 'Referensi Peserta Telah Dihapuskan.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          });
        } else {
          swal.fire({
            title: 'Dibatalkan',
            text: 'Reference Peserta Tidak Jadi Dihapuskan',
            icon: 'error',
            customClass: {
              confirmButton: "btn btn-info",
            },
            buttonsStyling: false
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
          label: 'Kode Gelombang',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-60px',
          field: 'kode',
        },
        {
          label: 'No. PMB',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'no_pmb',
        },
        {
          label: 'Nama',
          class: 'text-sm text-left border border-black-300 bg-gray-400',
          field: 'nama',
        },
        {
          label: 'Prodi Pilihan 1',
          class: 'text-sm text-left border border-black-300 bg-gray-400',
          field: 'pp01',
        },
        {
          label: 'Handphone',
          class: 'text-sm text-left border border-black-300 bg-gray-400',
          field: 'no_hp',
        },
        {
          label: 'Status Bayar',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'status',
        },
        {
          label: 'Aksi',
          class: 'text-sm disabled-sorting text-center border border-black-300 bg-gray-400',
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
          field: 'no_pmb',
        },
        {
          class: 'text-left border border-black-300',
          field: 'nama',
        },
        {
          class: 'text-left border border-black-300',
          field: 'pp01',
        },
        {
          class: 'text-left border border-black-300',
          field: 'no_hp',
        },
        {
          class: 'text-center border border-black-300',
          field: 'status',
        },
        {
          class: 'text-center border border-black-300',
          field: 'action',
        }],
      action: [{
        action_name: "printData",
        icon: "fa fa-print ",
        toolTip: "Print Data",
      },
      {
        action_name: "ubahData",
        icon: "fa fa-edit text-warning",
        toolTip: "Ubah Data",
      },
      {
        action_name: "deleteData",
        icon: "fa fa-trash text-danger",
        toolTip: "Hapus Data",
      },
      ],
      data: [
        {
          kode: '20211',
          no_pmb: '1',
          nama: 'Fulan A',
          pp01: 'Teknik Informatika',
          no_hp: '081212121212',
          status: 'Belum Bayar',
        },
        {
          kode: '20211',
          no_pmb: '2',
          nama: 'Fulan B',
          pp01: 'Kedokteran',
          no_hp: '081212123333',
          status: 'Sudah Bayar',
        },
        {
          kode: '20211',
          no_pmb: '3',
          nama: 'Fulan C',
          pp01: 'Teknik Mesin',
          no_hp: '081212124444',
          status: 'Belum Bayar',
        },
        {
          kode: '20211',
          no_pmb: '4',
          nama: 'Fulan D',
          pp01: 'Akuntansi',
          no_hp: '081212125555',
          status: 'Sudah Bayar',
        },

      ]
    };
  }
}
