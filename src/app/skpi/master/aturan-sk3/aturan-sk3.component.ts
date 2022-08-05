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
  selector: "app-aturan-sk3",
  templateUrl: "aturan-sk3.component.html",
  styleUrls: ["./aturan-sk3.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class AturanSK3Component implements OnInit {
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
      this.router.navigate(["skpi/master/aturan-sk3/tambah"]);
    }
  }

  //fungsi pagination data
  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
    console.log(event);
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
      where: "",
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
        label: 'No',
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
        label: 'Tahun Angkatan',
        class: 'text-sm text-center border border-black-300 bg-gray-400',
        field: 'tahun_angkatan',
        filter: true,
        filter_type: "text",
        filter_value: null,
        sort: true,
        sort_type: "",
        data: [],
      },
      {
        type:"",
        label: 'Bobot Minimal SK3',
        class: 'text-sm text-center border border-black-300 bg-gray-400',
        field: 'bobot_minimal',
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
        field: 'action',
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
        class: 'text-center border border-black-300',
        field: 'tahun_angkatan',
      },
      {
        type:"",
        count_field:[],
        class: 'text-center border border-black-300',
        field: 'bobot_minimal',
      },
      {
        type:"action",
        count_field:[],
        class: 'text-center border border-black-300 w-40',
        field: 'action',
      },],
      action: [
        {
          id_params: "",
          route: "skpi/master/kegiatan-wajib",
          type: "route",
          icon: "fa fa-edit text-info",
          toolTip: "Edit Kegiatan Wajib",
        },
        {
          id_params: "",
          route: "skpi/master/?",
          type: "route",
          icon: "fa fa-trash text-info",
          toolTip: "Delete Kegiatan Wajib",
        },],
    data: [
      {
        tahun_angkatan: '2010',
        bobot_minimal: '20',
      },
      {
        tahun_angkatan: '2010',
        bobot_minimal: '20',
      },{
        tahun_angkatan: '2010',
        bobot_minimal: '20',
      },{
        tahun_angkatan: '2010',
        bobot_minimal: '20',
      },
    ],
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

