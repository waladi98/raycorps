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
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { CustomTable } from '../../../components/custom-table/custom-table.interface';

declare const require: any;

declare const $: any;

@Component({
  selector: "app-verifikator-prodi",
  templateUrl: "verifikator-prodi.component.html",
  styleUrls: ["./verifikator-prodi.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class VerifikatorProdiComponent implements OnInit {
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
  }

  ubahData() {
    this.router.navigate(["ubah-sekolah"], {
      relativeTo: this._activatedRoute,
    });
  }

  detailData() {
    this.router.navigate(["pengecualian-sekolah"], {
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

  toAdd(){
    var home = localStorage.getItem("home");
    if (home) {
      this.router.navigate(["pmb/master/guru/tambah-guru"]);
    }
  }

  //fungsi pagination data
  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
    console.log(event);
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
//           label: "Kelengkapan",
//           class:
//             "text-sm font-semibold   text-center border border-black-300 bg-gray-400 w-64",
//           field: "kelengkapan",
//         },
//         {
//           label: "Jenjang",
//           class: "text-sm text-center border border-black-300 bg-gray-400",
//           field: "jenjang",
//         },
//         {
//           label: "Wajib",
//           class: "text-sm text-center border border-black-300 bg-gray-400",
//           field: "wajib",
//         },
//         {
//           label: "Aktif",
//           class: "text-sm text-center border border-black-300 bg-gray-400",
//           field: "status",
//         },
//         {
//           label: "Aksi",
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
//           field: "kelengkapan",
//         },
//         {
//           class: "text-center border border-black-300",
//           field: "jenjang",
//         },
//         {
//           class: "text-center border border-black-300",
//           field: "wajib",
//         },
//         {
//           class: "text-center border border-black-300",
//           field: "status",
//         },
//         {
//           class: "text-center border border-black-300",
//           field: "action",
//         },
//       ],
//       action: [
//         {
//           action_name: "detailData",
//           icon: "fa fa-list",
//           toolTip: "Pengecualian Kelengkapan",
//         },
//         {
//           action_name: "ubahData",
//           icon: "fa fa-edit text-warning",
//           toolTip: "Ubah Data",
//         },
//         {
//           action_name: "deleteData",
//           icon: "fa fa-trash text-danger",
//           toolTip: "Hapus Data",
//         },
//       ],
//       data: [
//         {
//           kelengkapan: "KTP",
//           jenjang: "S1",
//           wajib: "Ya",
//           status: "Tidak",
//         },
//         {
//           kelengkapan: "Scan Rapor",
//           jenjang: "S2",
//           wajib: "Tidak",
//           status: "Ya",
//         },
//       ],
//     };
//   }
// }

inisialisasiTable() {
  this.listData = {
    is_action: true,
    filter: true,
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
    filter_builder: true,
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
        label: 'NIP/NIDN',
        class: 'text-sm text-center border border-black-300 bg-gray-400',
        field: 'nip',
        filter: true,
        filter_type: "text",
        filter_value: null,
        sort: false,
        sort_type: "",
        data: [],
      },
      {
        type:"",
        label: 'Nama',
        class: 'text-sm text-center border border-black-300 bg-gray-400',
        field: 'nama',
        filter: true,
        filter_type: "text",
        filter_value: null,
        sort: true,
        sort_type: "",
        data: [],
      },
      {
        type:"",
        label: 'Verifikator Prodi',
        class: 'text-sm text-center border border-black-300 bg-gray-400',
        field: 'ver-prodi',
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
        filter_type: "select",
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
        class: 'text-center border border-black-300 w-2',
        field: 'no',
      },
      {
        type:"",
        count_field:[],
        class: 'text-center border border-black-300 w-10',
        field: 'nip',
      },
      {
        type:"",
        count_field:[],
        class: 'text-left border border-black-300 w-20',
        field: 'nama',
      },
      {
        type:"",
        count_field:[],
        class: 'text-left border border-black-300',
        field: 'ver-prodi',
      },
      {
        type:"",
        count_field:[],
        class: 'text-center border border-black-300',
        field: 'status',
      },],
      action: [
        {
          id_params: "kode",
          route:"pmb/master/guru/ubah-guru",
          type: "route",
          controller: "FormDialogComponent",
          icon: "fa fa-edit text-warning",
          toolTip: "Ubah Data"
        },],
    data: [],
    export:[{
      type:"csv",
      label:"CSV",
      label_report:"report-ref-gelombang"
    },
    {
      type:"pdf",
      label:"PDF",
      label_report:"report-ref-gelombang"
    },
    {
      type:"excel",
      label:"EXCEL",
      label_report:"report-ref-gelombang"
    }]
  };
  };
}

