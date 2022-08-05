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
  selector: 'app-pekerjaan',
  templateUrl: 'pekerjaan.component.html',
  styleUrls: ['./pekerjaan.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PekerjaanComponent implements OnInit {

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
          label: 'Jabatan',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'jabatan',
        },
        {
          label: 'Nama Institusi',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-52',
          field: 'nama_institusi',
        },
        {
          label: 'Bidang Usaha',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'bdg_usaha',
        },
        {
          label: 'Alamat Institusi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'almt_institusi',
        },
        {
          label: 'Kota',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'kota',
        },
        {
          label: 'Kodepos',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'kodepos',
        },
        {
          label: 'Telepon',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'telepon',
        },
        {
          label: 'FAX',
          class: 'text-sm text-center border border-black-300 bg-gray-400 ',
          field: 'fax',
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
          label: 'Edit',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'action',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jabatan',
        },
        {
          class: 'text-center border border-black-300',
          field: 'nama_institusi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'bdg_usaha',
        },
        {
          class: 'text-center border border-black-300',
          field: 'almt_institusi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kota',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kodepos',
        },
        {
          class: 'text-center border border-black-300',
          field: 'telepon',
        },
        {
          class: 'text-center border border-black-300',
          field: 'fax',
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
          jabatan: "REKTOR",
          nama_institusi: "Institusi 1",
          bdg_usaha: "Bidang Usaha 1",
          almt_institusi: "Alamat Institusi 1",
          kota: "Kota 1",
          kodepos: "00000",
          telepon: "0812-1234-1234",
          fax: "022-2009267",
          na: "NA",
        },
      ],
    };
  }
}
