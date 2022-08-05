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

import { CustomTable } from '../../../../../components/custom-table/custom-table.interface';
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { DataService } from "../../../../../core/services/data.service";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-dispensasi-ujian-mhs',
  templateUrl: 'dispensasi-ujian-mhs.component.html',
  styleUrls: ['./dispensasi-ujian-mhs.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class DispensasiUjianMhsComponent implements OnInit {
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

  manageData(data) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        type: data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: '',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'checkbox',
        },
        {
          label: '#',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'no',
        },
        {
          label: 'NPM',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'npm',
        },
        {
          label: 'NAMA',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'nama',
        },
        {
          label: 'HANDPHONE',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'handphone',
        },
        {
          label: 'TGL. UJIAN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'tgl_ujian',
        },
        {
          label: 'STATUS DPP',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'status_dpp',
        },
        {
          label: 'ALASAN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'alasan',
        },
        {
          label: 'STATUS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'status',
        },
        {
          label: 'AKSI',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-40',
          field: 'action',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'aktif',
        },
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'npm',
        },
        {
          class: 'text-center border border-black-300',
          field: 'nama',
        },
        {
          class: 'text-center border border-black-300',
          field: 'handphone',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tgl_ujian',
        },
        {
          class: 'text-center border border-black-300',
          field: 'status_dpp',
        },
        {
          class: 'text-center border border-black-300',
          field: 'alasan',
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
          action_name: 'manageData',
          icon: 'fa fa-info-circle text-info',
        },
        {
          action_name: 'manageData',
          icon: 'fa fa-edit text-warning',
        },
      ],
      data: [
        {
          aktif: '',
          npm: '173040075',
          nama: 'ABIYYU NUR MUHAMMAD',
          handphone: '+6281234567890',
          tgl_ujian: '04-11-2020',
          status_dpp: 'Sudah 50%',
          alasan: 'status dpp belum mencapai 35%',
          status: 'Diproses',
        },
        {
          aktif: '',
          npm: '173040075',
          nama: 'ABIYYU NUR MUHAMMAD',
          handphone: '+6281234567890',
          tgl_ujian: '07-11-2020',
          status_dpp: 'Sudah 50%',
          alasan: 'status dpp belum mencapai 35%',
          status: 'Diproses',
        },
        {
          aktif: '',
          npm: '173040075',
          nama: 'ABIYYU NUR MUHAMMAD',
          handphone: '+6281234567890',
          tgl_ujian: '10-11-2020',
          status_dpp: 'Sudah 50%',
          alasan: 'status dpp belum mencapai 35%',
          status: 'Diproses',
        },
        {
          aktif: '',
          npm: '173040075',
          nama: 'ABIYYU NUR MUHAMMAD',
          handphone: '+6281234567890',
          tgl_ujian: '09-01-2021',
          status_dpp: 'Sudah 50%',
          alasan: 'status dpp belum mencapai 35%',
          status: 'Diproses',
        },
      ],
    };
  }
}