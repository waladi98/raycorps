import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';
// import { TahunAkademikRoutes } from 'src/app/main/master-data/tahun-akademik/tahun-akademik.routing';
import { CustomTable } from '../../../../components/custom-table/custom-table.interface';
import { Subject, Subscription, Observable } from "rxjs";

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-persyaratan-per-prodi',
  templateUrl: 'persyaratan-per-prodi.component.html',
  styleUrls: ['./persyaratan-per-prodi.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PersyaratanPerProdiComponent implements OnInit {
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
        prodi:'kode_prodi'
      },
      endpoint: 'pmb/master/persyaratanProdi',
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
          label: 'Persyaratan',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'persyaratan',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Program Studi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'prodi',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Required ?',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'required',
          filter: false,
          filter_type: "select",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Aktif ?',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'aktif',
          filter: true,
          filter_type: "select",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Dibuat Oleh',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'dibuat_oleh',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Waktu Buat',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'waktu_buat',
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Diubah Oleh',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'diubah_oleh',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type:"",
          label: 'Waktu Ubah',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'waktu_ubah',
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
          class: 'text-left border border-black-300',
          field: 'prodi',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'required',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'id_aktif',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'dibuat_oleh',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'waktu_buat',
        },
        {
          type:"",
          count_field:[],
          class: 'text-left border border-black-300',
          field: 'diubah_oleh',
        },
        {
          type:"",
          count_field:[],
          class: 'text-center border border-black-300',
          field: 'waktu_ubah',
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
        no: '1',
        nopmb: '123',
        nama: 'PMB202101080',
        verifikasidokumen: '1',
      }],
      export:[{
        type:"csv",
        label:"CSV",
        label_report:"report-persyaratan-perprodi"
      },
      {
        type:"pdf",
        label:"PDF",
        label_report:"report-persyaratan-perprodi"
      },
      {
        type:"excel",
        label:"EXCEL",
        label_report:"report-persyaratan-perprodi"
      }]
    };
  }
}
