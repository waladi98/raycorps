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

import { CustomTable } from '../../../../../../components/custom-table/custom-table.interface';
// import { TambahPekerjaanComponent } from "./tambah-pekerjaan/tambah-pekerjaan.component";
import { DataService } from "../../../../../../core/services/data.service";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-dosen-penelitian',
  templateUrl: 'penelitian.component.html',
  styleUrls: ['./penelitian.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PenelitianComponent implements OnInit {
  // listData: CustomTable;

  eventsLoad: Subject<void> = new Subject<void>();

  loadDataTable() {
    this.eventsLoad.next();
  }

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
    public breakpointObserver: BreakpointObserver,
    private dataService: DataService,
    public dialog: MatDialog,
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

  // manageData(data) {
  //   const dialogRef = this.dialog.open(TambahPekerjaanComponent, {
  //     data: {
  //       type: data,
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: '#',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-12',
          field: 'no',
        },
        {
          label: 'Detail',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'detail',
        },
        {
          label: 'Judul Penelitian',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-52',
          field: 'judul_penelitian',
        },
        {
          label: 'Peran',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'peran',
        },
        {
          label: 'Tempat',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-24',
          field: 'tempat',
        },
        {
          label: 'Jenis Penelitian',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-28',
          field: 'jenis_penelitian',
        },
        {
          label: 'Bidang Penelitian',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'bidang_penelitian',
        },
        {
          label: 'Bidang Kajian',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'bidang_kajian',
        },
        {
          label: 'Pendanaan',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'pendanaan',
        },
        {
          label: 'Tahun',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'tahun',
        },
        {
          label: 'File Penelitian',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'file_penelitian',
        },
        {
          label: 'NA',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
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
          field: 'detail',
        },
        {
          class: 'text-left border border-black-300',
          field: 'judul_penelitian',
        },
        {
          class: 'text-center border border-black-300',
          field: 'peran',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tempat',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jenis_penelitian',
        },
        {
          class: 'text-center border border-black-300',
          field: 'bidang_penelitian',
        },
        {
          class: 'text-center border border-black-300',
          field: 'bidang_kajian',
        },
        {
          class: 'text-center border border-black-300',
          field: 'pendanaan',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tahun',
        },
        {
          class: 'text-center border border-black-300',
          field: 'file_penelitian',
        },
        {
          class: 'text-center border border-black-300',
          field: 'na',
        },
      ],
      action: [
        {
          action_name: 'manageData',
          action_title: 'delete',
          icon: 'fa fa-trash text-danger',
        },
      ],
      data: [
        {
          no: "",
          detail: "Belum Selesai",
          judul_penelitian: "Sejarah Kampung Naga",
          peran: "Aktor",
          tempat: "Kampus",
          jenis_penelitian: "Penelitian Kampung",
          bidang_penelitian: "Mahasiswa",
          bidang_kajian: "Hubungan Masyarakat",
          pendanaan: "Dari Kampus",
          tahun: "2018",
          file_penelitian: "UNDUH FILE",
          na: "-"
        },
        {
          no: "",
          detail: "Belum Selesai",
          judul_penelitian: "Sejarah Kampung Tiger",
          peran: "Aktor",
          tempat: "Kampus",
          jenis_penelitian: "Penelitian Kampung",
          bidang_penelitian: "Mahasiswa",
          bidang_kajian: "Hubungan Masyarakat",
          pendanaan: "Dari Kampus",
          tahun: "2018",
          file_penelitian: "UNDUH FILE",
          na: "-"
        },
        {
          no: "",
          detail: "Belum Selesai",
          judul_penelitian: "Sejarah Kampung Dragon",
          peran: "Aktor",
          tempat: "Kampus",
          jenis_penelitian: "Penelitian Kampung",
          bidang_penelitian: "Mahasiswa",
          bidang_kajian: "Hubungan Masyarakat",
          pendanaan: "Dari Kampus",
          tahun: "2018",
          file_penelitian: "UNDUH FILE",
          na: "-"
        },
        {
          no: "",
          detail: "Belum Selesai",
          judul_penelitian: "Sejarah Kampung Macan",
          peran: "Aktor",
          tempat: "Kampus",
          jenis_penelitian: "Penelitian Kampung",
          bidang_penelitian: "Mahasiswa",
          bidang_kajian: "Hubungan Masyarakat",
          pendanaan: "Dari Kampus",
          tahun: "2018",
          file_penelitian: "UNDUH FILE",
          na: "-"
        },
      ],
    };
  }
}
