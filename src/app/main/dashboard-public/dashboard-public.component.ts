import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DataService } from "../../core/services/data.service";
import { TableData } from "../../md/md-table/md-table.component";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { Router, Route, ActivatedRoute } from "@angular/router";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { StorageService } from '../../core/services/storage.service';

declare const $: any;

@Component({
  selector: "app-dashboard-public",
  templateUrl: "./dashboard-public.component.html",
  styleUrls: ['./dashboard-public.component.scss'],
})
export class DashboardPublicComponent implements OnInit, AfterViewInit {
  public tableData: TableData;

  listData = {
    header: [],
    field: [],
    action: [],
    data: [],
  };

  listNilai = {
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
  constructor(private router: Router, private _activatedRoute: ActivatedRoute, public breakpointObserver: BreakpointObserver, public dialog: MatDialog,private _storageService: StorageService) {
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

  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {
    this.inisialisasiTable();
  }
  ngAfterViewInit() {}

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: 'Prodi',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-40',
          field: 'prodi',
        },
        {
          label: 'Wisudawan',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'wisudawan',
        },
        {
          label: 'IPK Tertinggi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'ipk_tinggi',
        },
        {
          label: 'IPK Terendah',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'ipk_rendah',
        },
        {
          label: 'Rerata IPK',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'ipk_rerata',
        },
        {
          label: 'Wisudawan Termuda',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'wisudawan_muda',
        },
        {
          label: 'Wisudawan Tertua',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'wisudawan_tua',
        },
        {
          label: 'TA Terlama',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'ta_lama',
        },
        {
          label: 'TA Tercepat',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'ta_cepat',
        },
        {
          label: 'Rerata Lama TA',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'ta_rerata',
        },
        {
          label: 'Rerata Lama Studi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'studi_rerata',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'prodi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'wisudawan',
        },
        {
          class: 'text-center border border-black-300',
          field: 'ipk_tinggi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'ipk_rendah',
        },
        {
          class: 'text-center border border-black-300',
          field: 'ipk_rerata',
        },
        {
          class: 'text-center border border-black-300',
          field: 'wisudawan_muda',
        },
        {
          class: 'text-center border border-black-300',
          field: 'wisudawan_tua',
        },
        {
          class: 'text-center border border-black-300',
          field: 'ta_lama',
        },
        {
          class: 'text-center border border-black-300',
          field: 'ta_cepat',
        },
        {
          class: 'text-center border border-black-300',
          field: 'ta_rerata',
        },
        {
          class: 'text-center border border-black-300',
          field: 'studi_rerata',
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
          prodi: 'Teknik industri',
          wisudawan: '126',
          ipk_tinggi: '4.00',
          ipk_rendah: '2.56',
          ipk_rerata: '3.31',
          wisudawan_muda: '21 Tahun 6 Bulan',
          wisudawan_tua: '25 Tahun 6 Bulan',
          ta_lama: '4 Tahun 4 Bulan',
          ta_cepat: '1 Tahun 4 Bulan',
          ta_rerata: '2 Tahun 5 Bulan',
          studi_rerata: '4 Tahun 4 Bulan',
        },
      ],
    };

    this.listNilai = {
      header: [
        {
          label: 'No',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-40',
          field: 'no',
        },
        {
          label: 'Periode',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'periode',
        },
        {
          label: 'Mata Kuliah',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'matkul',
        },
        {
          label: 'Program Studi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'prodi',
        },
        {
          label: 'Kelas',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'kelas',
        },
        {
          label: 'A',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'wisudawan_muda',
        },
        {
          label: 'B',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'wisudawan_tua',
        },
        {
          label: 'C',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'ta_lama',
        },
        {
          label: 'D',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'ta_cepat',
        },
        {
          label: 'Waktu Input',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'waktu_input',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'periode',
        },
        {
          class: 'text-center border border-black-300',
          field: 'matkul',
        },
        {
          class: 'text-center border border-black-300',
          field: 'prodi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kelas',
        },
        {
          class: 'text-center border border-black-300',
          field: 'a',
        },
        {
          class: 'text-center border border-black-300',
          field: 'b',
        },
        {
          class: 'text-center border border-black-300',
          field: 'c',
        },
        {
          class: 'text-center border border-black-300',
          field: 'd',
        },
        {
          class: 'text-center border border-black-300',
          field: 'waktu_input',
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
          periode: 'Ganjil 2021/2022',
          matkul: 'Sistem Pengambilan Keputusan',
          prodi: 'Teknik Industri',
          kelas: 'G',
          a: '21',
          b: '4',
          c: '0',
          d: '0',
          waktu_input: '03-03-2022 (18:33:48)',
        },
      ],
    };
  }
}
