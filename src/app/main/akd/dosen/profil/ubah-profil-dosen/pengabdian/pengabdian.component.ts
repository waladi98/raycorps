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
import { DataService } from "../../../../../../core/services/data.service";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-dosen-pengabdian',
  templateUrl: 'pengabdian.component.html',
  styleUrls: ['./pengabdian.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PengabdianComponent implements OnInit {

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
          label: 'Nama Pengabdian',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-52',
          field: 'nama_pengabdian',
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
          label: 'Jenis Pengabdian',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-28',
          field: 'jenis_pengabdian',
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
          field: 'nama_pengabdian',
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
          field: 'jenis_pengabdian',
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
      data: [{
        no: "",
        detail: "Belum Mengabdi",
        nama_pengabdian: "Pengabdian Kampus",
        peran: "PKL",
        tempat: "Kampus",
        jenis_pengabdian: "Menjadi Office Boy",
        bidang_kajian: "Pembersih",
        pendanaan: "Kampus",
        tahun: "2019",
        na: "-"
      },
        {
          no: "",
          detail: "Belum Mengabdi",
          nama_pengabdian: "Pengabdian Kampus",
          peran: "PKL",
          tempat: "Kampus",
          jenis_pengabdian: "Menjadi Office Boy",
          bidang_kajian: "Pembersih",
          pendanaan: "Kampus",
          tahun: "2018",
          na: "-"
        },
        {
          no: "",
          detail: "Belum Mengabdi",
          nama_pengabdian: "Pengabdian Kampus",
          peran: "PKL",
          tempat: "Kampus",
          jenis_pengabdian: "Menjadi Office Boy",
          bidang_kajian: "Pembersih",
          pendanaan: "Kampus",
          tahun: "2020",
          na: "-"
        },
        {
          no: "",
          detail: "Belum Mengabdi",
          nama_pengabdian: "Pengabdian Kampus",
          peran: "PKL",
          tempat: "Kampus",
          jenis_pengabdian: "Menjadi Office Boy",
          bidang_kajian: "Pembersih",
          pendanaan: "Kampus",
          tahun: "2021",
          na: "-"
        }
      ],
    };
  }
}
