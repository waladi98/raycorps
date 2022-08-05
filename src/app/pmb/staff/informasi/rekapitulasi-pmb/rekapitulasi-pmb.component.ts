import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import swal from 'sweetalert2';
// import { TahunAkademikRoutes } from 'src/app/main/master-data/tahun-akademik/tahun-akademik.routing';

import { CustomTable } from '../../../../components/custom-table/custom-table.interface';
import { Subject, Subscription, Observable } from "rxjs";

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-rekapitulasi-pmb',
  templateUrl: 'rekapitulasi-pmb.component.html',
  styleUrls: ['./rekapitulasi-pmb.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class RekapitulasiPMBComponent implements OnInit {

  
  listData: CustomTable;

  eventsLoad: Subject<void> = new Subject<void>();

  loadDataTable() {
    this.eventsLoad.next();
  }

  isLoadingTable = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  params: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private router: Router,
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

  verifyData() {
    this.router.navigate(['']);
  }

  manageData() {
    this.router.navigate(['']);
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
    this.listData = {
      filter: false,
      init_load: false,
      is_role: true,
      is_role_params: {
        prodi:'kode_prodi'
      },
      endpoint: 'pmb/rekapPmb',
      action_name: '',
      type: "",  
      order: "",
      where: "",
      group:"",
      dynamic_header_field:"",
      dynamic_header_name:"",
      dynamic_header_value:"",
      dynamic_header_type:"",
      dynamic_header_add_index:0,
      filter_data: [
        {
          id: "tahun_akademik",
          label: "Tahun Akademik",
          data_list: [],
          type: "select",
          is_filter: false,
          value:null,
          trigger:false,
          trigger_id:"kode_gelombang",
          trigger_params:null,
          api: {
            endpoint: "/master/tahunAkademik",
            where: "id_aktif='Y' ",
            id: "kode",
            label: "tahun_akademik",
          },
        },
        {
          id: "kode_gelombang",
          label: "Gelombang",
          data_list: [],
          type: "select",
          is_filter: true,
          value:null,
          trigger:true,
          trigger_id:null,
          trigger_params:"kode_tahun_akademik",
          api: {
            endpoint: "/pmb/master/gelombang",
            where: "",
            id: "kode",
            label: "nama",
          },
        },
        /*{
          id: "prodi",
          label: "Prodi",
          data_list: [],
          type: "select",
          value:null,
          trigger:false,
          trigger_id:null,
          trigger_params:null,
          api: {
            endpoint: "/master/prodi",
            where: "id_aktif='Y' ",
            id: "kode",
            label: "prodi",
          },
        }*/
      ],
      header: [
        {
          type:"",
          label: '#',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
          field: 'no',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Fakultas',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'formulir_id',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Prodi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'nama',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Calon Pendaftar',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'syarat_lengkap',
          filter: false,
          filter_type: "select",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [
            {
              id: "",
              label: "Clear",
            },
            {
              id: "Y",
              label: "Y",
            },
            {
              id: "T",
              label: "T",
            },
          ],
        },
        {
          type:"",
          label: 'Pendaftar',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'keterangan_disablitas',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Calon Peserta',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'formulir_id',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Peserta',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'formulir_id',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Camaba',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'formulir_id',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Maba',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'formulir_id',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        
        {
          type:"",
          label: 'Batal',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'formulir_id',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        
        {
          type:"",
          label: 'Jumlah',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'formulir_id',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        }
      ],
      field: [
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'fakultas',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'prodi',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'calon_pendaftar',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'pendaftar',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'calon_peserta',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'peserta',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'camaba',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'maba',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'batal',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'jumlah',
        },],
      action: [{
        id_params: "formulir_id",
        route: "/pmb/staff/penyaringan-pmb/verifikasi-dokumen/verifikasi-peserta",
        type: "route",
        icon: "fa fa-edit text-warning",
        toolTip: "Verifikasi Kelulusan Peserta"
      },
      {
        id_params: "",
        route:"",
        type: "route",
        icon: "fa fa-info-circle text-info",
        toolTip: "Informasi Lengkap Peserta"
      }],
      data: [{
        no: '1',
        nopmb: '123',
        nama: 'PMB202101080',
        verifikasidokumen: '1',
      }]
    };
  }
}