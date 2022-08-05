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
  selector: 'app-dosen-pendidikan',
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
          label: 'Edit',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'edit',
        },
        {
          label: 'Gelar',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-52',
          field: 'gelar',
        },
        {
          label: 'Jenjang',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'jenjang',
        },
        {
          label: 'Tanggal Lulus Ijazah',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-24',
          field: 'tanggal_lulus_ijazah',
        },
        {
          label: 'Nama Perguruan Tinggi',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-28',
          field: 'nama_perguruan_tinggi',
        },
        {
          label: 'Negara',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'negara',
        },
        {
          label: 'Bidang Ilmu',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'bidang_ilmu',
        },
        {
          label: 'Prodi DIKTI',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'prodi_dikti',
        },
        {
          label: 'Ijazah',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'ijazah',
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
          field: 'edit',
        },
        {
          class: 'text-center border border-black-300',
          field: 'gelar',
        },
        {
          class: 'text-left border border-black-300',
          field: 'jenjang',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tanggal_lulus_ijazah',
        },
        {
          class: 'text-center border border-black-300',
          field: 'nama_perguruan_tinggi',
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
          field: 'prodi_dikti',
        },
        {
          class: 'text-center border border-black-300',
          field: 'ijazah',
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
        edit: "Edit",
        gelar: "S1",
        jenjang: "Sarjana",
        tanggal_lulus_ijazah: "2018",
        nama_perguruan_tinggi: "Harvard University",
        negara: "United Kingdom",
        bidang_ilmu: "Informatika",
        prodi_dikti: "Teknik Informatika",
        ijazah: "S1",
        na: ""
      },
        {
          no: "",
          edit: "Edit",
          gelar: "S1",
          jenjang: "Sarjana",
          tanggal_lulus_ijazah: "2019",
          nama_perguruan_tinggi: "Harvard University",
          negara: "United Kingdom",
          bidang_ilmu: "Informatika",
          prodi_dikti: "Teknik Informatika",
          ijazah: "S1",
          na: ""
        },
        {
          no: "",
          edit: "Edit",
          gelar: "S1",
          jenjang: "Sarjana",
          tanggal_lulus_ijazah: "2020",
          nama_perguruan_tinggi: "Harvard University",
          negara: "United Kingdom",
          bidang_ilmu: "Informatika",
          prodi_dikti: "Teknik Informatika",
          ijazah: "S1",
          na: ""
        },
        {
          no: "",
          edit: "Edit",
          gelar: "S1",
          jenjang: "Sarjana",
          tanggal_lulus_ijazah: "2021",
          nama_perguruan_tinggi: "Harvard University",
          negara: "United Kingdom",
          bidang_ilmu: "Informatika",
          prodi_dikti: "Teknik Informatika",
          ijazah: "S1",
          na: ""
        }]
  }
}
}
