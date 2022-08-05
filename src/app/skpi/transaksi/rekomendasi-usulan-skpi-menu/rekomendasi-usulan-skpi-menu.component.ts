import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';

import { CustomTable } from "../../../components/custom-table/custom-table.interface";
import { Subject, Subscription, Observable } from "rxjs";

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-rekomendasi-usulan-skpi-menu',
  templateUrl: 'rekomendasi-usulan-skpi-menu.component.html',
  styleUrls: ['./rekomendasi-usulan-skpi-menu.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class MenuRekomendasiUsulanSKPIComponent implements OnInit {

  listData: CustomTable;

  eventsLoad: Subject<void> = new Subject<void>();

  loadDataTable() {
    this.eventsLoad.next();
  }

  isScreenSmall: boolean;

  agama = [
    { value: 'B', viewValue: 'Budha' },
    { value: 'H', viewValue: 'Hindu' },
    { value: 'I', viewValue: 'Islam' },
    { value: 'K', viewValue: 'Katholik' },
    { value: 'P', viewValue: 'Protestan' },
    { value: 'L', viewValue: 'Lain-lain' },
  ];

  program = [
    { value: 'KER', viewValue: 'Kerjasama' },
    { value: 'NON', viewValue: 'Regular Sore' },
    { value: 'REG', viewValue: 'Regular Pagi' },
    { value: 'TES', viewValue: 'Program Tes' },
  ];

  jurusan = [
    { value: 'SMAIPA', viewValue: 'SMA - IPA' },
    { value: 'SMAIPS', viewValue: 'SMA - IPS' },
    { value: 'SMKKES', viewValue: 'SMK - Kesehatan' },
  ];

  pilihan1 = [
    { value: '110', viewValue: '110 - Kedokteran' },
    { value: '111', viewValue: '111 - Pendidikan Dokter Gigi' },
    { value: '113', viewValue: '113 - Profesi Dokter Gigi' },
    { value: '140', viewValue: '140 - Teknik Informatika' },
  ];

  pilihan2 = [
    { value: '110', viewValue: '110 - Kedokteran' },
    { value: '111', viewValue: '111 - Pendidikan Dokter Gigi' },
    { value: '113', viewValue: '113 - Profesi Dokter Gigi' },
    { value: '140', viewValue: '140 - Teknik Informatika' },
  ];

  pilihan3 = [
    { value: '110', viewValue: '110 - Kedokteran' },
    { value: '111', viewValue: '111 - Pendidikan Dokter Gigi' },
    { value: '113', viewValue: '113 - Profesi Dokter Gigi' },
    { value: '140', viewValue: '140 - Teknik Informatika' },
  ];

  pendidikan_ortu = [
    { value: '1', viewValue: '1 - Tidak Tamat SD' },
    { value: '2', viewValue: '2 - Tamat SD' },
    { value: '3', viewValue: '3 - Tamat SMP' },
    { value: '4', viewValue: '4 - Tamat SMTA' },
    { value: '5', viewValue: '5 - Diploma' },
    { value: '6', viewValue: '6 - Sarjana Muda' },
    { value: '7', viewValue: '7 - Sarjana' },
    { value: '8', viewValue: '8 - Pasca Sarjana' },
    { value: '9', viewValue: '9 - Doktor' },
  ];

  pekerjaan_ortu = [
    { value: '0', viewValue: '0 - Belum diisi' },
    { value: '1', viewValue: '1 - Pegawai Negeri' },
    { value: '2', viewValue: '2 - ABRI' },
    { value: '3', viewValue: '3 - Pegawai Swasta' },
    { value: '4', viewValue: '4 - Usaha Sendiri' },
    { value: '5', viewValue: '5 - Tidak Bekerja' },
    { value: '6', viewValue: '6 - Pensiun' },
    { value: '7', viewValue: '7 - Lain-lain' },
    { value: '8', viewValue: '8 - Nelayan' },
    { value: '9', viewValue: '9 - Petani' },
    { value: '10', viewValue: '10 - Peternak' },
    { value: '11', viewValue: '11 - Pedagang Kecil' },
    { value: '12', viewValue: '12 - Pedagang Besar' },
    { value: '13', viewValue: '13 - Wiraswasta' },
    { value: '14', viewValue: '14 - Buruh' },
    { value: '15', viewValue: '15 - Sudah Meninggal' },
  ];

  status_ortu = [
    { value: '1', viewValue: '1 - Masih Hidup' },
    { value: '2', viewValue: '2 - Sudah Meninggal' },
  ];

  formulir = [
    { value: '1', viewValue: 'IPA - Rp.300.0000' },
    { value: '2', viewValue: 'IPS - Rp.300.0000' },
  ];

  simpleSlider = 40;
  doubleSlider = [20, 60];

  regularItems = ['Pizza', 'Pasta', 'Parmesan'];
  touch: boolean;

  selectedValue: string;
  currentCity: string[];

  selectTheme = 'primary';
  cities = [
    { value: 'ipa-0', viewValue: 'IPA - Rp.300.000' },
    { value: 'ips-1', viewValue: 'IPS - Rp.300.000' },
  ];

  srcdoc = null;

  @ViewChild('iframe') iframe: ElementRef;

  params: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
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
  myFunc(val: any) {
    // code here
  }

  inisialisasiTable() {
    this.listData = {
      is_action: true,
      filter: true,
      init_load: true,
      is_role: true,
      is_role_params: {
        prodi: "kode_prodi",
      },
      endpoint: "",
      action_name: "",
      type: "",
      order: "",
      where: "syarat_lengkap = 'T'",
      group: "",
      dynamic_header_field: "",
      dynamic_header_name: "",
      dynamic_header_value: "",
      dynamic_header_type: "",
      dynamic_header_add_index: 0,
      filter_builder: true,
      filter_data: [
        // {
        //   id: "tahun_akademik",
        //   label: "Tahun Akademik",
        //   data_list: [],
        //   type: "select",
        //   is_filter: false,
        //   value: null,
        //   trigger: false,
        //   trigger_id: "kode_gelombang",
        //   trigger_params: null,
        //   api: {
        //     endpoint: "/master/tahunAkademik",
        //     where: "id_aktif='Y' ",
        //     id: "tahun",
        //     label: "tahun_akademik",
        //   },
        // },
        // {
        //   id: "kode_gelombang",
        //   label: "Gelombang",
        //   data_list: [],
        //   type: "select",
        //   is_filter: true,
        //   value: null,
        //   trigger: true,
        //   trigger_id: null,
        //   trigger_params: "kode_tahun_akademik",
        //   api: {
        //     endpoint: "/pmb/master/gelombang",
        //     where: "",
        //     id: "kode",
        //     label: "nama",
        //     concat: [
        //       {
        //         type: "string",
        //         field: "Gelombang",
        //       },
        //       {
        //         type: "string",
        //         field: " ",
        //       },
        //       {
        //         type: "value",
        //         field: "id_gelombang",
        //       },
        //     ],
        //   },
        // },
        // {
        //   id: "kode_prodi",
        //   label: "Prodi",
        //   data_list: [],
        //   type: "select",
        //   is_filter: true,
        //   value: null,
        //   trigger: false,
        //   trigger_id: null,
        //   trigger_params: null,
        //   first_index_selected: true,
        //   api: {
        //     endpoint: "/master/prodi",
        //     where: "id_aktif='Y'",
        //     prodi_role: {
        //       param: "kode",
        //       is_role: true,
        //     },
        //     id: "kode",
        //     label: "prodi",
        //   },
        // },
        // {
        //   id: "kode_jenis_formulir",
        //   label: "Jenis Formulir",
        //   data_list: [],
        //   type: "select",
        //   is_filter: true,
        //   value: null,
        //   trigger: false,
        //   trigger_id: null,
        //   trigger_params: null,
        //   first_index_selected: false,
        //   api: {
        //     endpoint: "/pmb/master/jenisFormulir",
        //     where: "id_aktif='Y'",
        //     prodi_role: {
        //       param: "kode",
        //       is_role: false,
        //     },
        //     id: "kode",
        //     label: "nama",
        //   },
        // },
      ],
      header: [
        {
          type: "",
          label: "No",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "no",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        
        {
          type: "",
          label: "NPM",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "npm",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Nama",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "nama",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Prodi",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "prodi",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Tanggal Usulan",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "tgl_usulan",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Tanggal Rekomendasi",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "tgl_rekomendasi",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Aksi",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "action",
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
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-2",
          field: "no",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-16",
          field: "npm",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-72",
          field: "nama",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-52",
          field: "tanggal_usulan",
        },
        {
          type: "action",
          count_field: [],
          class: "text-center border border-black-300 w-16",
          field: "action",
        },
      ],
      action: [
        {
          id_params: "",
          route: "",
          type: "route",
          icon: "fa fa-info-circle text-info",
          toolTip: "Informasi Lengkap Peserta",
        },
      ],
      data: [
        {
          npm: '12345',
          nama: 'Fulan',
          tanggal_usulan: '22 May 2022',
        },
        {
          npm: '12345',
          nama: 'Fulan',
          tanggal_usulan: '22 May 2022',
        },
      ],
      export:[{
        type:"csv",
        label:"CSV",
        label_report:"report-calon-peserta"
      },
      {
        type:"pdf",
        label:"PDF",
        label_report:"report-calon-peserta"
      },
      {
        type:"excel",
        label:"XLSX",
        label_report:"report-calon-peserta"
      }]
    };
  }
}