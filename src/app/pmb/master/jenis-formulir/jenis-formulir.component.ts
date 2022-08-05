import { Component, OnInit } from "@angular/core";
import { Router, Route, ActivatedRoute } from "@angular/router";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { finalize, map, takeUntil } from "rxjs/operators";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { DataService } from "../../../core/services/data.service";
import { TambahJenisFormulirComponent } from "./tambah-jenis-formulir/tambah-jenis-formulir.component";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";

import { CustomTable } from '../../../components/custom-table/custom-table.interface';

declare const require: any;

declare const $: any;

@Component({
  selector: "app-jenis-formulir",
  templateUrl: "jenis-formulir.component.html",
  styleUrls: ["./jenis-formulir.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class JenisFormulirComponent implements OnInit {
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
    private router: Router,
    public breakpointObserver: BreakpointObserver,
    //ambil base url api
    private dataService: DataService,
    public dialog: MatDialog
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenSmall = true;
          console.log("Matches small viewport or handset in portrait mode");
        } else {
          this.isScreenSmall = false;
        }
      });
    this._activatedRoute.params.subscribe(
      (params: any) => (this.params = params)
    );
  }
  ngOnInit() {
    //jalankan function
    this.inisialisasiTable();
    this.loadData(0);
  }

  //get list data dari api
  loadData(page: number): void {
    this.isLoadingTable = true;
    this.dataService
      .getPostRequest<any>("/pmb/master/jenisFormulir", {
        offset: page,
        limit: this.pageSize,
      })
      .pipe(
        map((response) => response),
        finalize(() => setTimeout(() => (this.isLoadingTable = false), 1000))
      )
      .subscribe(
        (response) => {
          this.listData.data = response.result;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ubahData() {
    this.router.navigate(["ubah-jenis-formulir"], {
      relativeTo: this._activatedRoute,
    });
  }

  detailData() {
    this.router.navigate(["prodi-pilihan-dan-komponen-nilai"], {
      relativeTo: this._activatedRoute,
    });
  }

  deleteData(data) {
    swal
      .fire({
        title: "Delete Data",
        text: "Apakah Yakin Akan Menghapus Data Ini?",
        icon: "warning",
        showCancelButton: true,
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        buttonsStyling: false,
      })
      .then((result) => {
        if (result.value) {
          console.log(result.value);
        }
      });
  }
  manageData(type) {
    const dialogRef = this.dialog.open(TambahJenisFormulirComponent, {
      data: {
        type: type,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //fungsi pagination data
  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
    console.log(event);
    this.loadData(event.pageIndex + 0);
  }

  //tampilkan data ditabel
//   inisialisasiTable() {
//     this.listData = {
//       header: [
//         {
//           label: "#",
//           class: "text-sm text-center border border-black-300 bg-gray-400 w-20",
//           field: "no",
//         },
//         {
//           label: "FORMULIR",
//           class:
//             "text-sm font-semibold   text-center border border-black-300 bg-gray-400 w-64",
//           field: "formulir",
//         },
//         {
//           label: "JUMLAH PILIHAN",
//           class: "text-sm text-center border border-black-300 bg-gray-400",
//           field: "jumlah_pilihan",
//         },
//         {
//           label: "KETERANGAN",
//           class: "text-sm text-center border border-black-300 bg-gray-400",
//           field: "ket",
//         },
//         {
//           label: "ADA TES",
//           class: "text-sm text-center border border-black-300 bg-gray-400",
//           field: "tes",
//         },
//         {
//           label: "AKTIF",
//           class: "text-sm text-center border border-black-300 bg-gray-400",
//           field: "status",
//         },
//         {
//           label: "AKSI",
//           class:
//             "text-sm disabled-sorting text-center w-56 border border-black-300 bg-gray-400",
//           field: "action",
//         },
//       ],
//       field: [
//         {
//           class: "text-center border border-black-300",
//           field: "no",
//         },
//         {
//           class: "text-left border border-black-300",
//           field: "nama",
//         },
//         {
//           class: "text-center border border-black-300",
//           field: "jumlah_pilihan",
//         },
//         {
//           class: "text-left border border-black-300",
//           field: "keterangan",
//         },
//         {
//           class: "text-center border border-black-300",
//           field: "ada_tes",
//         },
//         {
//           class: "text-center border border-black-300",
//           field: "id_aktif",
//         },
//         {
//           class: "text-center border border-black-300",
//           field: "action",
//         },
//       ],
//       action: [
//         {
//           action_name: "manageData",
//           icon: "fa fa-info-circle text-primary",
//         },
//         {
//           action_name: "detailData",
//           icon: "fa fa-list",
//         },
//         {
//           action_name: "ubahData",
//           icon: "fa fa-edit text-warning",
//         },
//         {
//           action_name: "deleteData",
//           icon: "fa fa-trash text-danger",
//         },
//       ],
//       data: [
//         {
//           formulir: "PMDK-S1",
//           jumlah_pilihan: "3",
//           keterangan: "Semua prodi S1",
//           tes: "Tidak",
//           status: "Aktif",
//         },
//         {
//           action_name: "deleteData",
//           icon: "fa fa-trash text-danger",
//         },
//       ],
//     };
//   }
// }


inisialisasiTable() {
  this.listData = {
    filter: false,
    init_load: true,
    is_role: false,
    is_role_params: {
      prodi:''
    },
    endpoint: '/pmb/master/jenisFormulir',
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
// }
    ],
    header: [
      {
        type:"",
        label: '#',
        class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
        field: 'id',
        filter: false,
        filter_type: "text",
        filter_value: null,
        sort: false,
        sort_type: "",
        data: [],
      },
      {
        type:"",
        label: 'Formulir',
        class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
        field: 'jenis_komponen',
        filter: false,
        filter_type: "text",
        filter_value: null,
        sort: false,
        sort_type: "",
        data: [],
      },
      {
        type:"",
        label: 'Jumlah Pilihan',
        class: 'text-sm text-center border border-black-300 bg-gray-400',
        field: 'aktif',
        filter: false,
        filter_type: "text",
        filter_value: null,
        sort: false,
        sort_type: "",
        data: [],
      },
      {
        type:"",
        label: 'Keterangan',
        class: 'text-sm text-center border border-black-300 bg-gray-400',
        field: 'diubah_oleh',
        filter: false,
        filter_type: "select",
        filter_value: null,
        sort: false,
        sort_type: "",
        data: [],
      },
      {
        type:"",
        label: 'Ada Tes',
        class: 'text-sm text-center border border-black-300 bg-gray-400',
        field: 'waktu_ubah',
        filter: false,
        filter_type: "text",
        filter_value: null,
        sort: false,
        sort_type: "",
        data: [],
      },
      {
        type:"",
        label: 'Aktif',
        class: 'text-sm text-center border border-black-300 bg-gray-400',
        field: 'waktu_ubah',
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
        class: 'text-sm text-center border border-black-300 bg-gray-400',
        field: 'actions',
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
        field: 'nama',
      },
      {
        type:"",
        count_field:[],
        class: 'text-center border border-black-300',
        field: 'jumlah_pilihan',
      },
      {
        type:"",
        count_field:[],
        class: 'text-left border border-black-300',
        field: 'keterangan',
      },
      {
        type:"",
        count_field:[],
        class: 'text-center border border-black-300',
        field: 'ada_tes',
      },
      {
        type:"",
        count_field:[],
        class: 'text-center border border-black-300',
        field: 'id_aktif',
      },
      {
        type:"action",
        count_field:[],
        class: 'text-center border border-black-300',
        field: 'action',
      }],
    action: [
      {
          id_params: "kode",
          route: "/pmb/",
          type: "multi",
          icon: "fa fa-edit text-info",
          toolTip: "tes",
          action_array: [
            {
              id_params: "formulir_id",
              route:
                "/pmb/transaksi/proses-kelulusan/verifikasi-kelulusan-peserta",
              type: "route",
              icon: "fa fa-info text-warning",
              toolTip: "View",
            },
            {
              id_params: "formulir_id",
              route:
                "/pmb/transaksi/proses-kelulusan/verifikasi-kelulusan-peserta",
              type: "route",
              icon: "fa fa-edit text-warning",
              toolTip: "Pilihan Prodi",
            },
            {
              id_params: "formulir_id",
              route:
                "/pmb/transaksi/proses-kelulusan/verifikasi-kelulusan-peserta",
              type: "route",
              icon: "fa fa-edit text-warning",
              toolTip: "Komponen Formulir",
            },
            {
              id_params: "formulir_id",
              route:
                "/pmb/transaksi/proses-kelulusan/verifikasi-kelulusan-peserta",
              type: "route",
              icon: "fa fa-edit text-warning",
              toolTip: "Edit",
            },
            {
              id_params: "formulir_id",
              route:
                "/pmb/transaksi/proses-kelulusan/verifikasi-kelulusan-peserta",
              type: "route",
              icon: "fa fa-edit text-warning",
              toolTip: "Delete",
            },
          ],
        },
    ],
    data: []
  };
}
}