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
  selector: 'app-akd-pengajuan-ujian-susulan',
  templateUrl: 'pengajuan-ujian-susulan.component.html',
  styleUrls: ['./pengajuan-ujian-susulan.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PengajuanUjianSusulanComponent implements OnInit {

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
          label: 'Nama',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
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
          label: 'Tanggal Ujian',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'tgl_ujian',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Jam Ujian',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'jam_ujian',
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
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'matkul',
          filter: true,
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
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Nama Dosen',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'nama_dosen',
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
        },
        {
          type:"",
          label: 'Status Presensi',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'status_presensi',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Alasan',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'alasan',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Bukti Dukung',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'bukti_dukung',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Aksi',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'aksi',
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
          field: 'nama',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'tgl_ujian',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'jam_ujian',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
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
          class: 'text-left border border-black-300',
          field: 'nama_dosen',
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
          class: 'text-center border border-black-300',
          field: 'status_presensi',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'alasan',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'bukti_dukung',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'action',
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
        nama: 'nama 1',
        tgl_ujian: '22-02-2022',
        jam_ujian: '09.00 ~ 10.00',
        matkul: 'Matkul 1',
        kelas: 'Kelas 1',
        nama_dosen: 'Nama Dosen',
        status: 'status',
        status_presensi: '1status',
        alasan: 'alasan 1',
        bukti_dukung: 'bukti dukung 1',
      },
      {
        nama: 'nama 2',
        tgl_ujian: '24-02-2022',
        jam_ujian: '09.00 ~ 10.00',
        matkul: 'Matkul 2',
        kelas: 'Kelas 2',
        nama_dosen: 'Nama Dosen',
        status: 'status',
        status_presensi: 'status',
        alasan: 'alasan 2',
        bukti_dukung: 'bukti dukung 2',
      },
      {
        nama: 'nama 3',
        tgl_ujian: '23-02-2022',
        jam_ujian: '09.00 ~ 10.00',
        matkul: 'Matkul 3',
        kelas: 'Kelas 3',
        nama_dosen: 'Nama Dosen',
        status: 'status',
        status_presensi: 'status',
        alasan: 'alasan 3',
        bukti_dukung: 'bukti dukung 3',
      },
      {
        nama: 'nama 4',
        tgl_ujian: '12-12-2022',
        jam_ujian: '09.00 ~ 10.00',
        matkul: 'Matkul 4',
        kelas: 'Kelas 4',
        nama_dosen: 'Nama Dosen',
        status: 'status',
        status_presensi: 'status',
        alasan: 'alasan 4',
        bukti_dukung: 'bukti dukung 4',
      }]
    };
  }
}
