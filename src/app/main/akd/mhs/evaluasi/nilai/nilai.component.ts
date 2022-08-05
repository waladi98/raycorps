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
  selector: 'app-nilai',
  templateUrl: 'nilai.component.html',
  styleUrls: ['./nilai.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class NilaiComponent implements OnInit {
  listData: CustomTable;

  eventsLoad: Subject<void> = new Subject<void>();

  loadDataTable() {
    this.eventsLoad.next();
  }
  listData2: CustomTable;
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
      is_role: false,
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
          class: 'text-sm text-center border border-black-300 bg-gray-400',
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
          label: 'Kode',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'kode',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Mata Kuliah',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'matkul',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Kelas',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'kelas',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'SKS',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'sks',
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Jenis',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'jenis',
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Tugas 1',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'tugas1',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Tugas 2',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'tugas2',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Tugas 3',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'tugas3',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Tugas 4',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'tugas4',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Tugas 5',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'tugas5',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Pres.',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'presensi',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Prak.',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'praktikum',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'UTS Nilai',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'uts_nilai',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'UTS Index',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'uts_index',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'UAS Nilai',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'uas_nilai',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'UAS Index',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'uas_index',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Nilai Akhir',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'nilai_akhir',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Grade',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'grade',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Bobot',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'bobot',
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
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'status',
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
          field: 'kode',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'matkul',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'kelas',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'sks',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'jenis',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'tugas1',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'tugas2',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'tugas3',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'tugas4',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'tugas5',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'presensi',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'praktikum',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'uts_nilai',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'uts_index',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'uas_index',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'uas_nilai',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'nilai_akhir',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'grade',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'bobot',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'status',
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
        kode: 'kode 1',
        matkul: 'matkul 1',
        kelas: 'B',
        sks: '3',
        jenis: 'kuliah',
        tugas1: '100.00',
        tugas2: '90.00',
        tugas3: '0.00',
        tugas4: '0.00',
        tugas5: '0.00',
        presensi: '100.00',
        praktikum: '0.00',
        uts_nilai: '80.00',
        uts_index: '3.20',
        uas_index: '85.00',
        uas_nilai: '3.58',
        nilai_akhir: '90.00',
        grade: 'A',
        bobot: '4.00',
        status: 'Aktif',
      },{
        kode: 'kode 1',
        matkul: 'matkul 1',
        kelas: 'B',
        sks: '3',
        jenis: 'kuliah',
        tugas1: '100.00',
        tugas2: '90.00',
        tugas3: '0.00',
        tugas4: '0.00',
        tugas5: '0.00',
        presensi: '100.00',
        praktikum: '0.00',
        uts_nilai: '80.00',
        uts_index: '3.20',
        uas_index: '85.00',
        uas_nilai: '3.58',
        nilai_akhir: '90.00',
        grade: 'A',
        bobot: '4.00',
        status: 'Aktif',
      },
      {
        kode: 'kode 2',
        matkul: 'matkul 2',
        kelas: 'V',
        sks: '3',
        jenis: 'Praktikum',
        tugas1: '80.00',
        tugas2: '100.00',
        tugas3: '0.00',
        tugas4: '0.00',
        tugas5: '0.00',
        presensi: '0.00',
        praktikum: '0.00',
        uts_nilai: '0.00',
        uts_index: '0.00',
        uas_index: '0.00',
        uas_nilai: '0.00',
        nilai_akhir: '0.00',
        grade: '-',
        bobot: '0.00',
        status: 'Aktif',
      },
      {
        kode: 'kode 3',
        matkul: 'matkul 3',
        kelas: 'B',
        sks: '3',
        jenis: 'kuliah',
        tugas1: '100.00',
        tugas2: '90.00',
        tugas3: '0.00',
        tugas4: '0.00',
        tugas5: '0.00',
        presensi: '100.00',
        praktikum: '0.00',
        uts_nilai: '80.00',
        uts_index: '3.20',
        uas_index: '85.00',
        uas_nilai: '3.58',
        nilai_akhir: '90.00',
        grade: 'A',
        bobot: '4.00',
        status: 'Aktif',
      },
      {
        kode: 'kode 4',
        matkul: 'matkul 4',
        kelas: 'B',
        sks: '3',
        jenis: 'kuliah',
        tugas1: '100.00',
        tugas2: '90.00',
        tugas3: '0.00',
        tugas4: '0.00',
        tugas5: '0.00',
        presensi: '100.00',
        praktikum: '0.00',
        uts_nilai: '80.00',
        uts_index: '3.20',
        uas_index: '85.00',
        uas_nilai: '3.58',
        nilai_akhir: '90.00',
        grade: 'A',
        bobot: '4.00',
        status: 'Aktif',
      },]
    };

    this.listData2 = {
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
          label: 'Tingkat',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
          field: 'tingkat',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Penilaian Tengah Semester',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'penilaian_tengah_semester',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Penilaian Akhir Semester',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'penilaian_akhir_semester',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Indeks Prestasi Semester',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'indeks_prestasi_semester',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Indeks Prestasi Kumulatif',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'indeks_prestasi_kumulatif',
          filter: true,
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
          field: 'tingkat',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'penilaian_tengah_semester',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'penilaian_akhir_semester',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'indeks_prestasi_semester',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'indeks_prestasi_kumulatif',
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
        tingkat: '',
        penilaian_tengah_semester: '2.86',
        penilaian_akhir_semester: '2.92',
        indeks_prestasi_semester: '3.38',
        indeks_prestasi_kumulatif: '2.99',
      },
      {
        tingkat: 'Fakultas',
        penilaian_tengah_semester: '-',
        penilaian_akhir_semester: '-',
        indeks_prestasi_semester: '-',
        indeks_prestasi_kumulatif: '-',
      },
      {
        tingkat: 'Program Studi',
        penilaian_tengah_semester: '-',
        penilaian_akhir_semester: '-',
        indeks_prestasi_semester: '-',
        indeks_prestasi_kumulatif: '-',
      },
      {
        tingkat: 'Angkatan',
        penilaian_tengah_semester: '-',
        penilaian_akhir_semester: '-',
        indeks_prestasi_semester: '-',
        indeks_prestasi_kumulatif: '-',
      },]
    };
  }
}
