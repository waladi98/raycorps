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
// import { CustomTable } from '../../../components/custom-table/custom-table.module;
// import { DataService } from "../../../../../core/services/data.service";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-status-perwalian',
  templateUrl: 'status-perwalian.component.html',
  styleUrls: ['./status-perwalian.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class StatusPerwalianComponent implements OnInit {
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
    // private dataService: DataService,
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
          label: 'No',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-12',
          field: 'no',
        },
        {
          label: 'NPM',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'npm',
        },
        {
          label: 'Nama Mahasiswa',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-52',
          field: 'nama_mahasiswa',
        },
        {
          label: 'Program',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'program',
        },
        {
          label: 'Angkatan',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-24',
          field: 'angkatan',
        },
        {
          label: 'Total SKS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-28',
          field: 'total_sks',
        },
        {
          label: 'IPK',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'ipk',
        },
        {
          label: 'Status',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'status',
        },
        {
          label: 'Tgl Perwalian',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'tgl_perwalian',
        },
        {
          label: 'Jml MK',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'jml_mk',
        },
        {
          label: 'SKS Belum Divalidasi',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'sks_belum_divalidasi',
        },
        {
          label: 'Jml SKS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'jml_sks',
        },
        {
          label: 'Kontak',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-16',
          field: 'kontak',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'npm',
        },
        {
          class: 'text-left border border-black-300',
          field: 'nama_mahasiswa',
        },
        {
          class: 'text-center border border-black-300',
          field: 'program',
        },
        {
          class: 'text-center border border-black-300',
          field: 'angkatan',
        },
        {
          class: 'text-center border border-black-300',
          field: 'total_sks',
        },
        {
          class: 'text-center border border-black-300',
          field: 'ipk',
        },
        {
          class: 'text-center border border-black-300',
          field: 'status',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tgl_perwalian',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jml_mk',
        },
        {
          class: 'text-center border border-black-300',
          field: 'sks_belum_divalidasi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jml_sks',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kontak',
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
          no:'',
          npm:'193010001',
          nama_mahasiswa:'SULTHON AZIZ AHMADINEJAD',
          program:'REG',
          angkatan:'2019',
          total_sks:'0',
          ipk:'0.00',
          status:'Non-Aktif',
          tgl_perwalian:'00-00-0000',
          jml_mk:'0',
          sks_belum_divalidasi:'0',
          jml_sks:'0',
          kontak:'Hubungi via WhatsApp'
        },
        {
          no:'',
          npm:'173040075',
          nama_mahasiswa:'ABIYYU NUR M',
          program:'REG',
          angkatan:'2019',
          total_sks:'0',
          ipk:'0.00',
          status:'Non-Aktif',
          tgl_perwalian:'00-00-0000',
          jml_mk:'0',
          sks_belum_divalidasi:'0',
          jml_sks:'0',
          kontak:'Hubungi via WhatsApp'
        },
        {
          no:'',
          npm:'173040082',
          nama_mahasiswa:'M GEMA MADANI',
          program:'REG',
          angkatan:'2019',
          total_sks:'0',
          ipk:'0.00',
          status:'Non-Aktif',
          tgl_perwalian:'00-00-0000',
          jml_mk:'0',
          sks_belum_divalidasi:'0',
          jml_sks:'0',
          kontak:'Hubungi via WhatsApp'
        },
        {
          no:'',
          npm:'173040102',
          nama_mahasiswa:'EGY IMALDI',
          program:'REG',
          angkatan:'2019',
          total_sks:'0',
          ipk:'0.00',
          status:'Non-Aktif',
          tgl_perwalian:'00-00-0000',
          jml_mk:'0',
          sks_belum_divalidasi:'0',
          jml_sks:'0',
          kontak:'Hubungi via WhatsApp'
        },
      ],
    };
  }
}
