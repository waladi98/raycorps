import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';

import { CustomTable } from '../../../../../components/custom-table/custom-table.interface';

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-akd-jadwal-perkuliahan-mhs',
  templateUrl: 'jadwal-perkuliahan-mhs.component.html',
  styleUrls: ['./jadwal-perkuliahan-mhs.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class JadwalPerkuliahanMhsComponent implements OnInit {
  listData = {
    header: [],
    field: [],
    action: [],
    data: [],
  };

  // listData: CustomTable;

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
  constructor(private router: Router, private _activatedRoute: ActivatedRoute, public breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
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
  ngOnInit() {
    this.inisialisasiTable();
  }

  // manageData(type) {
  //   const dialogRef = this.dialog.open(FormDialogComponent, {
  //     data: {
  //       type: type,
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  deleteData(data) {
    swal
      .fire({
        title: 'Delete Data',
        text: 'Apakah Yakin Akan Menghapus Data Ini?',
        icon: 'warning',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal',
        buttonsStyling: false,
      })
      .then((result) => {
        if (result.value) {
          console.log(result.value);
        }
      });
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
          label: 'Jam',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-28',
          field: 'jam',
        },
        {
          label: 'Ruang',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'ruang',
        },
        {
          label: 'Kode',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'kode',
        },
        {
          label: 'Matakuliah',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-44',
          field: 'matakuliah',
        },
        {
          label: 'Kelas',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'kelas',
        },
        {
          label: 'SKS',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'sks',
        },
        {
          label: 'Dosen',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-44',
          field: 'dosen',
        },
        {
          label: 'Asisten',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-44',
          field: 'asisten',
        },
        {
          label: 'Peserta',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'peserta',
        },
        {
          label: 'Pendaftar',
          class: 'text-sm text-center border border-black-300 bg-header-table text-white w-20',
          field: 'pendaftar',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jam',
        },
        {
          class: 'text-center border border-black-300',
          field: 'ruang',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kode',
        },
        {
          class: 'text-left border border-black-300',
          field: 'matakuliah',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kelas',
        },
        {
          class: 'text-center border border-black-300',
          field: 'sks',
        },
        {
          class: 'text-left border border-black-300',
          field: 'dosen',
        },
        {
          class: 'text-left border border-black-300',
          field: 'asisten',
        },
        {
          class: 'text-center border border-black-300',
          field: 'peserta',
        },
        {
          class: 'text-center border border-black-300',
          field: 'pendaftar',
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
          no: '',
          jam: '07:00 ~ 08:40',
          ruang: 'eLearning',
          kode: 'IF21W0124',
          matakuliah: 'Metode Berpikir Komputasi',
          kelas: 'A',
          sks: '2',
          dosen: 'FAJAR DARMAWAN, ST., M.Kom',
          asisten: '',
          peserta: '38',
          pendaftar: '38',
        },
        {
          no: '',
          jam: '07:00 ~ 09:30',
          ruang: 'eLearning',
          kode: 'IF21W0302',
          matakuliah: 'Matematika Informatika II',
          kelas: 'A',
          sks: '3',
          dosen: 'MELLIA LIYANTHY, ST., MT.,',
          asisten: '',
          peserta: '38',
          pendaftar: '38',
        },
        {
          no: '',
          jam: '07:00 ~ 08:40',
          ruang: 'eLearning',
          kode: 'IF21W0124',
          matakuliah: 'Metode Berpikir Komputasi',
          kelas: 'A',
          sks: '2',
          dosen: 'FAJAR DARMAWAN, ST., M.Kom',
          asisten: '',
          peserta: '38',
          pendaftar: '38',
        },
        {
          no: '',
          jam: '07:00 ~ 09:30',
          ruang: 'eLearning',
          kode: 'IF21W0302',
          matakuliah: 'Matematika Informatika II',
          kelas: 'A',
          sks: '3',
          dosen: 'MELLIA LIYANTHY, ST., MT.,',
          asisten: '',
          peserta: '38',
          pendaftar: '38',
        },
      ],
    };

    // ========= listData Custom Table ===========
    // this.listData = {
    //   filter: false,
    //   init_load: false,
    //   is_role: true,
    //   is_role_params: {
    //     prodi: 'kode_prodi',
    //   },
    //   endpoint: 'pmb/Peserta',
    //   action_name: '',
    //   type: '',
    //   order: '',
    //   where: "lulus = 'Y'",
    //   group: '',
    //   dynamic_header_field: '',
    //   dynamic_header_name: '',
    //   dynamic_header_value: '',
    //   dynamic_header_type: '',
    //   dynamic_header_add_index: 0,
    //   filter_data: [
    //     /*{
    //       id: "tahun_akademik",
    //       label: "Tahun Akademik",
    //       data_list: [],
    //       type: "select",
    //       is_filter: false,
    //       value:null,
    //       trigger:false,
    //       trigger_id:"kode_gelombang",
    //       trigger_params:null,
    //       api: {
    //         endpoint: "/master/tahunAkademik",
    //         where: "id_aktif='Y' ",
    //         id: "kode",
    //         label: "tahun_akademik",
    //       },
    //     },
    //     {
    //       id: "kode_gelombang",
    //       label: "Gelombang",
    //       data_list: [],
    //       type: "select",
    //       is_filter: true,
    //       value:null,
    //       trigger:true,
    //       trigger_id:null,
    //       trigger_params:"kode_tahun_akademik",
    //       api: {
    //         endpoint: "/pmb/master/gelombang",
    //         where: "",
    //         id: "kode",
    //         label: "nama",
    //       },
    //     },
    //     {
    //       id: "kode_prodi",
    //       label: "Prodi",
    //       data_list: [],
    //       type: "select",
    //       is_filter: true,
    //       value:null,
    //       trigger:false,
    //       trigger_id:null,
    //       trigger_params:null,
    //       api: {
    //         endpoint: "/master/prodi",
    //         where: "id_aktif='Y'",
    //         prodi_role:{
    //           param:"kode",
    //           is_role:true
    //         },
    //         id: "kode",
    //         label: "prodi",
    //       },
    //     }
    //     /*{
    //       id: "prodi",
    //       label: "Prodi",
    //       data_list: [],
    //       type: "select",
    //       value:null,
    //       trigger:false,
    //       trigger_id:null,
    //       trigger_params:null,
    //       api: {
    //         endpoint: "/master/prodi",
    //         where: "id_aktif='Y' ",
    //         id: "kode",
    //         label: "prodi",
    //       },
    //     }*/
    //   ],
    //   header: [
    //     {
    //       type: '',
    //       label: 'No',
    //       class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
    //       field: 'id',
    //       filter: false,
    //       filter_type: 'text',
    //       filter_value: null,
    //       sort: false,
    //       sort_type: '',
    //       data: [],
    //     },
    //     {
    //       type: '',
    //       label: 'Jam',
    //       class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
    //       field: 'id',
    //       filter: false,
    //       filter_type: 'text',
    //       filter_value: null,
    //       sort: false,
    //       sort_type: '',
    //       data: [],
    //     },
    //     {
    //       type: '',
    //       label: 'Ruang',
    //       class: 'text-sm text-center border border-black-300 bg-gray-400',
    //       field: 'nama',
    //       filter: false,
    //       filter_type: 'text',
    //       filter_value: null,
    //       sort: false,
    //       sort_type: '',
    //       data: [],
    //     },
    //     {
    //       type: '',
    //       label: 'Kode',
    //       class: 'text-sm text-center border border-black-300 bg-gray-400',
    //       field: 'kode_gelombang',
    //       filter: false,
    //       filter_type: 'select',
    //       filter_value: null,
    //       sort: false,
    //       sort_type: '',
    //       data: [
    //         {
    //           id: '',
    //           label: 'Clear',
    //         },
    //         {
    //           id: 'Y',
    //           label: 'Y',
    //         },
    //         {
    //           id: 'T',
    //           label: 'T',
    //         },
    //       ],
    //     },
    //     {
    //       type: '',
    //       label: 'Matakuliah',
    //       class: 'text-sm text-center border border-black-300 bg-gray-400',
    //       field: 'keterangan_disablitas',
    //       filter: false,
    //       filter_type: 'text',
    //       filter_value: null,
    //       sort: false,
    //       sort_type: '',
    //       data: [],
    //     },
    //     {
    //       type: '',
    //       label: 'Kelas',
    //       class: 'text-sm text-center border border-black-300 bg-gray-400',
    //       field: 'keterangan_disablitas',
    //       filter: false,
    //       filter_type: 'text',
    //       filter_value: null,
    //       sort: false,
    //       sort_type: '',
    //       data: [],
    //     },
    //     {
    //       type: '',
    //       label: 'SKS',
    //       class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
    //       field: 'formulir_id',
    //       filter: false,
    //       filter_type: 'text',
    //       filter_value: null,
    //       sort: false,
    //       sort_type: '',
    //       data: [],
    //     },
    //     {
    //       type: '',
    //       label: 'Dosen',
    //       class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
    //       field: 'formulir_id',
    //       filter: false,
    //       filter_type: 'text',
    //       filter_value: null,
    //       sort: false,
    //       sort_type: '',
    //       data: [],
    //     },
    //     {
    //       type: '',
    //       label: 'Asisten',
    //       class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
    //       field: 'formulir_id',
    //       filter: false,
    //       filter_type: 'text',
    //       filter_value: null,
    //       sort: false,
    //       sort_type: '',
    //       data: [],
    //     },
    //     {
    //       type: '',
    //       label: 'Peserta',
    //       class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
    //       field: 'formulir_id',
    //       filter: false,
    //       filter_type: 'text',
    //       filter_value: null,
    //       sort: false,
    //       sort_type: '',
    //       data: [],
    //     },

    //     {
    //       type: '',
    //       label: 'Pendaftar',
    //       class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
    //       field: 'formulir_id',
    //       filter: false,
    //       filter_type: 'text',
    //       filter_value: null,
    //       sort: false,
    //       sort_type: '',
    //       data: [],
    //     },
    //   ],
    //   field: [
    //     {
    //       type: '',
    //       count_field: [],
    //       class: 'text-center border border-black-300',
    //       field: 'no',
    //     },
    //     {
    //       type: '',
    //       count_field: [],
    //       class: 'text-left border border-black-300',
    //       field: 'id',
    //     },
    //     {
    //       type: '',
    //       count_field: [],
    //       class: 'text-left border border-black-300',
    //       field: 'formulir_id',
    //     },
    //     {
    //       type: '',
    //       count_field: [],
    //       class: 'text-left border border-black-300',
    //       field: 'gelombang',
    //     },
    //     {
    //       type: '',
    //       count_field: [],
    //       class: 'text-center border border-black-300',
    //       field: 'jenis_formulir',
    //     },
    //     {
    //       type: '',
    //       count_field: [],
    //       class: 'text-left border border-black-300',
    //       field: 'nama',
    //     },
    //     {
    //       type: '',
    //       count_field: [],
    //       class: 'text-center border border-black-300',
    //       field: 'status_seleksi',
    //     },
    //     {
    //       type: '',
    //       count_field: [],
    //       class: 'text-center border border-black-300',
    //       field: 'kode_program',
    //     },
    //     {
    //       type: '',
    //       count_field: [],
    //       class: 'text-center border border-black-300',
    //       field: 'prodi',
    //     },
    //     {
    //       type: '',
    //       count_field: [],
    //       class: 'text-center border border-black-300',
    //       field: 'pilihan_ke',
    //     },
    //     {
    //       type: '',
    //       count_field: [],
    //       class: 'text-center border border-black-300',
    //       field: 'jurusan_sekolah',
    //     },
    //     {
    //       type: '',
    //       count_field: [],
    //       class: 'text-center border border-black-300',
    //       field: 'handphone',
    //     },
    //     {
    //       type: '',
    //       count_field: [],
    //       class: 'text-center border border-black-300',
    //       field: 'email',
    //     },
    //     {
    //       type: '',
    //       count_field: [],
    //       class: 'text-center border border-black-300',
    //       field: 'action',
    //     },
    //   ],
    //   action: [
    //     {
    //       id_params: '',
    //       route: '',
    //       type: 'route',
    //       icon: 'fa fa-info-circle text-info',
    //       toolTip: 'Informasi Lengkap Peserta',
    //     },
    //   ],
    //   data: [
    //     {
    //       no: '1',
    //       nopmb: '123',
    //       nama: 'PMB202101080',
    //       verifikasidokumen: '1',
    //     },
    //   ],
    // };
  }
}
