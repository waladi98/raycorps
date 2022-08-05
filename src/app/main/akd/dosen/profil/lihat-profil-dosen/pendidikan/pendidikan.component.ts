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
  selector: 'app-pendidikan',
  templateUrl: 'pendidikan.component.html',
  styleUrls: ['./pendidikan.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PendidikanComponent implements OnInit {

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
          label: '#',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-16',
          field: 'no',
        },
        {
          label: 'Edit',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'action',
        },
        {
          label: 'Gelar',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'gelar',
        },
        {
          label: 'Jenjang',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-52',
          field: 'jenjang',
        },
        {
          label: 'Tanggal Lulus',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'tgl_lulus',
        },
        {
          label: 'Ijazah',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'ijazah',
        },
        {
          label: 'Nama Perguruan Tinggi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'nama_pt',
        },
        {
          label: 'Negara',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'negara',
        },
        {
          label: 'Bidang Ilmu',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'bidang_ilmu',
        },
        {
          label: 'Prodi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'prodi',
        },
        {
          label: 'DIKTI',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'dikti',
        },
        {
          label: 'Na',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'na',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'action',
        },
        {
          class: 'text-center border border-black-300',
          field: 'gelar',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jenjang',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tgl_lulus',
        },
        {
          class: 'text-center border border-black-300',
          field: 'ijazah',
        },
        {
          class: 'text-center border border-black-300',
          field: 'nama_pt',
        },
        {
          class: 'text-center border border-black-300',
          field: 'negara',
        },
        {
          class: 'text-center border border-black-300',
          field: 'bidang_ilmu',
        },
        {
          class: 'text-center border border-black-300',
          field: 'prodi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'dikti',
        },
        {
          class: 'text-center border border-black-300',
          field: 'na',
        },
      ],
      action: [
        {
          action_name: "ubahData",
          icon: "fa fa-edit text-warning",
          toolTip: "Ubah Data",
        },
      ],
      data: [
        {
          no: 1,
          action: "ubahData",
          gelar: "S.Kom",
          jenjang: "S1",
          tgl_lulus: "01-01-2020",
          ijazah: "ijazah",
          nama_pt: "PTN",
          negara: "Indonesia",
          bidang_ilmu: "Ilmu Komputer",
          prodi: "Informatika",
          dikti: "Dikti",
          na: "NA",
        },
      ],
    };
  }
}
