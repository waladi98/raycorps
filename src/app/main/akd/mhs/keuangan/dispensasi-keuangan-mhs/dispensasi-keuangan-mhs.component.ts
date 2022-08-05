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
  selector: 'app-dispensasi-keuangan-mhs',
  templateUrl: 'dispensasi-keuangan-mhs.component.html',
  styleUrls: ['./dispensasi-keuangan-mhs.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class DispensasiKeuanganMhsComponent implements OnInit {
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
          label: 'DATA MAHASISWA',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'data_mahasiswa',
        },
        {
          label: 'SEMESTER',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'semester',
        },
        {
          label: 'PERIHAL',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'perihal',
        },
        {
          label: 'ALASAN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'alasan',
        },
        {
          label: 'STATUS DPP',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'status_dpp',
        },
        {
          label: 'CETAK PENGAJUAN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'cetak_pengajuan',
        },
        {
          label: 'SURAT PERNYATAAN',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'surat_pernyataan',
        },
        {
          label: 'MASA BERLAKU',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'masa_berlaku',
        },
        {
          label: 'STATUS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
          field: 'status',
        },
        {
          label: 'AKSI',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white',
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
          field: 'data_mahasiswa',
        },
        {
          class: 'text-center border border-black-300',
          field: 'semester',
        },
        {
          class: 'text-center border border-black-300',
          field: 'perihal',
        },
        {
          class: 'text-center border border-black-300',
          field: 'alasan',
        },
        {
          class: 'text-center border border-black-300',
          field: 'status_dpp',
        },
        {
          class: 'text-center border border-black-300',
          field: 'cetak_pengajuan',
        },
        {
          class: 'text-center border border-black-300',
          field: 'surat_pernyataan',
        },
        {
          class: 'text-center border border-black-300',
          field: 'masa_berlaku',
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
          icon: 'fa fa-info-circle',

        },
      ],
      data: [
        {
          aktif: '',
          data_mahasiswa: '173040075 ABIYYU NUR MUHAMMAD Teknik Informatika +6281234567890',
          semester: '20211',
          perihal: 'Dispensasi Perwalian',
          alasan: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quam alias eligendi labore laboriosam velit, dolores quis ut earum unde inventore magni ab nobis harum id illum reprehenderit laborum debitis.',
          status_dpp: 'Belum 50% (0%)',
          cetak_pengajuan: '',
          surat_pernyataan: '',
          masa_berlaku: '26.08.2021 sd 31.10.2021',
          status: 'Ditolak',
        },
        {
          aktif: '',
          data_mahasiswa: '173040075 ABIYYU NUR MUHAMMAD Teknik Informatika +6281234567890',
          semester: '20202',
          perihal: 'Dispensasi Perwalian',
          alasan: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quam alias eligendi labore laboriosam velit, dolores quis ut earum unde inventore magni ab nobis harum id illum reprehenderit laborum debitis.',
          status_dpp: 'Sudah 50% (80.56%)',
          cetak_pengajuan: '',
          surat_pernyataan: '',
          masa_berlaku: '20.01.2021 sd 27.01.2021',
          status: 'Berakhir',
        },
        {
          aktif: '',
          data_mahasiswa: '173040075 ABIYYU NUR MUHAMMAD Teknik Informatika +6281234567890',
          semester: '20202',
          perihal: 'Dispensasi UTS',
          alasan: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quam alias eligendi labore laboriosam velit, dolores quis ut earum unde inventore magni ab nobis harum id illum reprehenderit laborum debitis.',
          status_dpp: 'Sudah 50% (80.56%)',
          cetak_pengajuan: '',
          surat_pernyataan: '',
          masa_berlaku: '17.03.2021 sd 29.03.2021',
          status: 'Berakhir',
        },
      ],
    };
  }
}