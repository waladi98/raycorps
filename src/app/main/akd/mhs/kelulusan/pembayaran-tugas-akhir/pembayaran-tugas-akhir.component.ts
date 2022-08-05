import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';

import { CustomTable } from '../../../../../components/custom-table/custom-table.interface';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-pembayaran-tugas-akhir',
  templateUrl: 'pembayaran-tugas-akhir.component.html',
  styleUrls: ['./pembayaran-tugas-akhir.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PembayaranTAComponent implements OnInit {
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
      filter: false,
      init_load: true,
      is_role: true,
      is_role_params: {
        prodi:''
      },
      endpoint: '',
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
        // {
        //   id: "tahun_akademik",
        //   label: "Tahun Akademik",
        //   data_list: [],
        //   type: "select",
        //   is_filter: false,
        //   value:null,
        //   trigger:false,
        //   trigger_id:"kode_gelombang",
        //   trigger_params:null,
        //   api: {
        //     endpoint: "/master/tahunAkademik",
        //     where: "id_aktif='Y' ",
        //     id: "kode",
        //     label: "tahun_akademik",
        //   },
        // },
        // {
        //   id: "kode_gelombang",
        //   label: "Gelombang",
        //   data_list: [],
        //   type: "select",
        //   is_filter: true,
        //   value:null,
        //   trigger:true,
        //   trigger_id:null,
        //   trigger_params:"kode_tahun_akademik",
        //   api: {
        //     endpoint: "/pmb/master/gelombang",
        //     where: "",
        //     id: "kode",
        //     label: "nama",
        //   },
        // },
        // {
        //   id: "kode_prodi",
        //   label: "Prodi",
        //   data_list: [],
        //   type: "select",
        //   is_filter: true,
        //   value:null,
        //   trigger:false,
        //   trigger_id:null,
        //   trigger_params:null,
        //   api: {
        //     endpoint: "/master/prodi",
        //     where: "id_aktif='Y'",
        //     prodi_role:{
        //       param:"kode",
        //       is_role:true
        //     },
        //     id: "kode",
        //     label: "prodi",
        //   },
        // }
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
          label: 'Semester',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'semester',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Status',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'status',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Tugas Akhir Syarat',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'syarat',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Tugas Akhir Pembayaran',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'pembayaran',
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'SKS dan IP Lulus',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'lulus',
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'SKS dan IP IPS',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'ips',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'SKS dan IP IPK',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'ipk',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Cetak',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'cetak',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Cetak2',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'cetak2',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
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
          class: 'text-center border border-black-300',
          field: 'semester',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'status',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'syarat',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'pembayaran',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'lulus',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'ips',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'ipk',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'cetak',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'cetak2',
        },],
      action: [
      {
        id_params: "",
        route:"",
        type: "route",
        icon: "fa fa-info-circle text-info",
        toolTip: "Informasi Lengkap Peserta"
      }],
      data: [{
        semester: '20212',
        status: 'Non-Aktif',
        syarat: 'Pembayaran DPP kurang dari : 15%',
        pembayaran: '-',
        lulus: '138',
        ips: '0.00',
        ipk: '2.99',
        cetak: '-',
        cetak2: '-',
      },
      {
        semester: '20211',
        status: 'Non-Aktif',
        syarat: 'Pembayaran DPP kurang dari : 15%',
        pembayaran: '-',
        lulus: '138',
        ips: '0.00',
        ipk: '2.99',
        cetak: '-',
        cetak2: '-',
      },
      {
        semester: '20202',
        status: 'Aktif',
        syarat: '',
        pembayaran: '-',
        lulus: '138',
        ips: '3.38',
        ipk: '2.99',
        cetak: 'Voucher',
        cetak2: 'Pembayaran masih diproses',
      },
      {
        semester: '20202',
        status: 'Aktif',
        syarat: '',
        pembayaran: '-',
        lulus: '138',
        ips: '3.38',
        ipk: '2.99',
        cetak: 'Voucher',
        cetak2: 'Pembayaran masih diproses',
      },]
    };
  }
}
