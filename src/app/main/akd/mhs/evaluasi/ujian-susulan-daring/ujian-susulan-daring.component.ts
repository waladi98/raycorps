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
  selector: 'app-akd-ujian-susulan-daring',
  templateUrl: 'ujian-susulan-daring.component.html',
  styleUrls: ['./ujian-susulan-daring.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class UjianSusulanDaringComponent implements OnInit {
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
      filter: false,
      init_load: true,
      is_role: true,
      is_role_params: {
        prodi: '',
      },
      endpoint: '',
      action_name: '',
      type: '',
      order: '',
      where: '',
      group: '',
      dynamic_header_field: '',
      dynamic_header_name: '',
      dynamic_header_value: '',
      dynamic_header_type: '',
      dynamic_header_add_index: 0,
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
          type: '',
          label: '#',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
          field: 'no',
          filter: false,
          filter_type: 'text',
          filter_value: null,
          sort: false,
          sort_type: '',
          data: [],
        },
        {
          type: '',
          label: 'Matakuliah',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'nama',
          filter: false,
          filter_type: 'text',
          filter_value: null,
          sort: false,
          sort_type: '',
          data: [],
        },
        {
          type: '',
          label: 'SKS',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'tgl_ujian',
          filter: false,
          filter_type: 'text',
          filter_value: null,
          sort: false,
          sort_type: '',
          data: [],
        },
        {
          type: '',
          label: 'Nama Dosen',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'jam_ujian',
          filter: false,
          filter_type: 'text',
          filter_value: null,
          sort: false,
          sort_type: '',
          data: [],
        },
        {
          type: '',
          label: 'Kelas',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'matkul',
          filter: true,
          filter_type: 'text',
          filter_value: null,
          sort: false,
          sort_type: '',
          data: [],
        },
        {
          type: '',
          label: 'Tanggal',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'kelas',
          filter: true,
          filter_type: 'text',
          filter_value: null,
          sort: false,
          sort_type: '',
          data: [],
        },
        {
          type: '',
          label: 'Jam',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'nama_dosen',
          filter: false,
          filter_type: 'text',
          filter_value: null,
          sort: false,
          sort_type: '',
          data: [],
        },
        {
          type: '',
          label: 'Soal',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'status',
          filter: false,
          filter_type: 'text',
          filter_value: null,
          sort: false,
          sort_type: '',
          data: [],
        },
        {
          type: '',
          label: 'Jawaban',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'status_presensi',
          filter: false,
          filter_type: 'text',
          filter_value: null,
          sort: false,
          sort_type: '',
          data: [],
        },
        {
          type: '',
          label: 'Aksi',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'alasan',
          filter: false,
          filter_type: 'text',
          filter_value: null,
          sort: false,
          sort_type: '',
          data: [],
        },
      ],
      field: [
        {
          type: '',
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          type: '',
          count_field: [],
          class: 'text-left border border-black-300',
          field: 'matakuliah',
        },
        {
          type: '',
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'sks',
        },
        {
          type: '',
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'nama_dosen',
        },
        {
          type: '',
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'kelas',
        },
        {
          type: '',
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'tanggal',
        },
        {
          type: '',
          count_field: [],
          class: 'text-left border border-black-300',
          field: 'jam',
        },
        {
          type: '',
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'soal',
        },
        {
          type: '',
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'jawaban',
        },
        {
          type: '',
          count_field: [],
          class: 'text-left border border-black-300',
          field: 'aksi',
        },
      ],
      action: [
        {
          id_params: '',
          route: '',
          type: 'route',
          icon: 'fa fa-info-circle text-info',
          toolTip: 'Informasi Lengkap Peserta',
        },
      ],
      data: [
        {
          nama: 'nama 1',
          matakuliah: 'Algoritma Pemrograman II',
          sks: '3',
          nama_dosen: 'Matkul 1',
          kelas: 'A',
          tanggal: '21 Februari 2022',
          jam: '8:45 ~ 11:00',
          soal: 'Unduh Soal',
          jawaban: 'Unduh Jawaban',
        },
        {
          nama: 'nama 1',
          matakuliah: 'Algoritma Pemrograman II',
          sks: '3',
          nama_dosen: 'Matkul 1',
          kelas: 'A',
          tanggal: '21 Februari 2022',
          jam: '8:45 ~ 11:00',
          soal: 'Unduh Soal',
          jawaban: 'Unduh Jawaban',
        },
        {
          nama: 'nama 1',
          matakuliah: 'Algoritma Pemrograman II',
          sks: '3',
          nama_dosen: 'Matkul 1',
          kelas: 'A',
          tanggal: '21 Februari 2022',
          jam: '8:45 ~ 11:00',
          soal: 'Unduh Soal',
          jawaban: 'Unduh Jawaban',
        },
        {
          nama: 'nama 1',
          matakuliah: 'Algoritma Pemrograman II',
          sks: '3',
          nama_dosen: 'Matkul 1',
          kelas: 'A',
          tanggal: '21 Februari 2022',
          jam: '8:45 ~ 11:00',
          soal: 'Unduh Soal',
          jawaban: 'Unduh Jawaban',
        },
      ],
    };
  }
}
