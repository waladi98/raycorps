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

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-dosen-kegiatan',
  templateUrl: 'kegiatan.component.html',
  styleUrls: ['./kegiatan.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class KegiatanComponent implements OnInit {
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
    public dialog: MatDialog
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
        /*{
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
        {
          id: "kode_prodi",
          label: "Prodi",
          data_list: [],
          type: "select",
          is_filter: true,
          value:null,
          trigger:false,
          trigger_id:null,
          trigger_params:null,
          api: {
            endpoint: "/master/prodi",
            where: "id_aktif='Y'",
            prodi_role:{
              param:"kode",
              is_role:true
            },
            id: "kode",
            label: "prodi",
          },
        }
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
          label: 'Edit',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'aksi',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Nama Kegiatan',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'nama_kegiatan',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Jenis Kegiatan',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'jenis_kegiatan',
          filter: false,
          filter_type: "select",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Hasil',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'hasil',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Peran',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'peran',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Nama Forum',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'nama_forum',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Bidang',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'bidang',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Tahun',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'tahun',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Sumber Dana',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'sumber_dana',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        
        {
          type:"",
          label: 'Besar Dana',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'besar_dana',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        
        {
          type:"",
          label: 'SK',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'sk',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'NA',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'na',
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
          class: 'text-left border border-black-300',
          field: 'action',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'nama_kegiatan',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'jenis_kegiatan',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'peran',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'nama_forum',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'bidang',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'tahun',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'sumber_dana',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'besar_dana',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'action',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'action',
        }],
      action: [
      {
        id_params: "",
        route:"",
        type: "route",
        icon: "fa fa-info-circle text-info",
        toolTip: "Informasi Lengkap Peserta"
      }],
      data: [{
        nama_kegiatan: 'Computing Game and Learning State in Serious Game for Learning',
        jenis_kegiatan: 'Menulis',
        hasil: 'Jurnal',
        peran: 'Penulis Utama',
        nama_forum: 'Telkomnika Volume 13 Nomor 4',
        bidang: '',
        tahun: '2015',
        sumber_dana: 'Pribadi',
        besar_dana: '',
      },
      {
        nama_kegiatan: 'PENGUKURAN KESIAPAN PERGURUAN TINGGI UNTUK MEMPUBLIKASIKAN HASIL KARYA ILMIAH INTERNAL CIVITAS AKADEMIKA SECARA ONLINE',
        jenis_kegiatan: 'Menulis',
        hasil: 'Jurnal',
        peran: 'Penulis Anggota',
        nama_forum: 'JURNAL ILMIAH TEKNOLOGI INFORMASI TERAPAN Volume II Nomor 1',
        bidang: '',
        tahun: '2015',
        sumber_dana: 'Pribadi',
        besar_dana: '',
      },
      {
        nama_kegiatan: 'Nama Kegiatan 3',
        jenis_kegiatan: 'Menulis',
        hasil: 'Jurnal',
        peran: 'Penulis Utama',
        nama_forum: 'Telkomnika Volume 13 Nomor 4',
        bidang: '',
        tahun: '2015',
        sumber_dana: 'Pribadi',
        besar_dana: '',
      },
      {
        nama_kegiatan: 'Nama Kegiatan 4',
        jenis_kegiatan: 'Menulis',
        hasil: 'Jurnal',
        peran: 'Penulis Utama',
        nama_forum: 'Telkomnika Volume 13 Nomor 4',
        bidang: '',
        tahun: '2015',
        sumber_dana: 'Pribadi',
        besar_dana: '',
      }]
    };
  }
}
