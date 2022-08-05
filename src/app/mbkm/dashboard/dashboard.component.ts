import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DataService } from "../../core/services/data.service";
import * as Chartist from "chartist";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { Router, Route, ActivatedRoute } from "@angular/router";
import { CustomTable } from '../../components/custom-table/custom-table.interface';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { StorageService } from '../../core/services/storage.service';

declare const require: any;

declare const $: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {

  listData: CustomTable;

  eventsLoad: Subject<void> = new Subject<void>();

  loadDataTable() {
    this.eventsLoad.next();
  }
  isLoadingTable = false;
  length = 12;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15];

  isScreenSmall: boolean;

  params: any;

  startAnimationForLineChart(chart: any) {
    let seq: number, delays: number, durations: number;
    seq = 0;
    delays = 80;
    durations = 500;
    chart.on("draw", function (data: any) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq = 0;
  }

  startAnimationForBarChart(chart: any) {
    let seq2: number, delays2: number, durations2: number;
    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data: any) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq2 = 0;
  }

  constructor(
    private dataService: DataService,
    private router: Router,
    public breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,private _storageService: StorageService
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
  }
  user = this._storageService.get("username");

  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {
    this.inisialisasiTable();

    /*  **************** Public Preferences - Pie Chart ******************** */

    const dataPreferences = {
      labels: ["62%", "32%"],
      series: [62, 32],
    };

    const optionsPreferences = {
      height: "180px",
    };

    /*  **************** Simple Bar Chart - barchart ******************** */

    const dataSimpleBarChart = {
      labels: [
        "2020",
        "2020",
        "2021",
        "2021",
        "2022",
        "2022",
        "2022",
      ],
      series: [[542, 443, 320, 780, 553, 453, 895]],
    };

    const optionsSimpleBarChart = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false,
      },
    };

    const responsiveOptionsSimpleBarChart: any = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value: any) {
              return value[0];
            },
          },
        },
      ],
    ];

    const simpleBarChart = new Chartist.Bar(
      "#simpleBarChart",
      dataSimpleBarChart,
      optionsSimpleBarChart,
      responsiveOptionsSimpleBarChart
    );

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(simpleBarChart);

    const dataMultipleBarsChart = {
      labels: [
        "2020",
        "2020",
        "2021",
        "2021",
        "2022",
        "2022",
      ],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
        [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695],
      ],
    };

    const optionsMultipleBarsChart = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false,
      },
      height: "300px",
    };

    const responsiveOptionsMultipleBarsChart: any = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value: any) {
              return value[0];
            },
          },
        },
      ],
    ];

    const multipleBarsChart = new Chartist.Bar(
      "#multipleBarsChart",
      dataMultipleBarsChart,
      optionsMultipleBarsChart,
      responsiveOptionsMultipleBarsChart
    );

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(multipleBarsChart);
  }
  ngAfterViewInit() { }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
    this.listData = {
      filter: false,
      init_load: false,
      is_role: true,
      is_role_params: {
        prodi: 'kode_prodi'
      },
      endpoint: '',
      action_name: '',
      type: "",
      order: "",
      where: "",
      group: "",
      dynamic_header_field: "",
      dynamic_header_name: "",
      dynamic_header_value: "",
      dynamic_header_type: "",
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
          type: "",
          label: '#',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-10',
          field: 'no',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Program Studi',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'prodi',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Fakultas',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'fakultas',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Pendaftar',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'pendaftar',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Pertukaran Pelajar',
          class: 'text-sm text-center border border-black-300 bg-gray-400 ',
          field: 'pp',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Magang / Praktik Kerja',
          class: 'text-sm text-center border border-black-300 bg-gray-400 ',
          field: 'pk',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Mengajar Di Sekolah',
          class: 'text-sm text-center border border-black-300 bg-gray-400 ',
          field: 'mds',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Penelitian / Riset',
          class: 'text-sm text-center border border-black-300 bg-gray-400 ',
          field: 'pr',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Proyek Kemanusiaan',
          class: 'text-sm text-center border border-black-300 bg-gray-400 ',
          field: 'pkm',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Kegiatan Wirausaha',
          class: 'text-sm text-center border border-black-300 bg-gray-400 ',
          field: 'pw',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Studi / Proyek Independen',
          class: 'text-sm text-center border border-black-300 bg-gray-400 ',
          field: 'spi',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Membangun Desa / Kuliah Kerja Nyata Tematik',
          class: 'text-sm text-center border border-black-300 bg-gray-400 ',
          field: 'kkn',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'jumlah',
          class: 'text-sm text-center border border-black-300 bg-gray-400 ',
          field: 'jumlah',
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
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          type: "",
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'prodi',
        },
        {
          type: "",
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'fakultas',
        },
        {
          type: "",
          count_field: [],
          class: 'text-left border border-black-300',
          field: 'pendaftar',
        },
        {
          type: "",
          count_field: [],
          class: 'text-left border border-black-300',
          field: 'pp',
        },
        {
          type: "",
          count_field: [],
          class: 'text-left border border-black-300',
          field: 'jumlah',
        },
        // {
        //   type:"",
        //   count_field:[],
        //   class: 'text-left border border-black-300',
        //   field: 'kode_prodi',
        // },
        // {
        //   type:"",
        //   count_field:[],
        //   class: 'text-center border border-black-300',
        //   field: 'handphone',
        // },
        // {
        //   type:"",
        //   count_field:[],
        //   class: 'text-left border border-black-300',
        //   field: 'email',
        // },
      ],
      action: [
        {
          id_params: "",
          route: "",
          type: "route",
          icon: "fa fa-info-circle text-info",
          toolTip: "Informasi Lengkap Peserta"
        }],
      data: [
        {
          no: 1,
          kode_dokumen: 2,
          nama_dokumen: "SOP 1",
          tgl_update: "SOP 1",
          aksi: "Cancel",
        },
        {
          no: 2,
          kode_dokumen: 3,
          nama_dokumen: "SOP 3",
          tgl_update: "SOP 4",
          aksi: "Cancel",
        },
        {
          prodi: "Kedokteran",
          fakultas: "Fakultas Kedokteran",
          pendaftar: "63",
          lulus_pmdk: "23",
          lulus_ujian: "40",
          total: "63",
        }
      ],
      sum: [
        {
          type: "",
          label: "Jumlah",
          class: "text-right font-bold  ",
          colspan: "3",
          field: "",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "pendaftar",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "pp",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "pk",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "mds",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "pr",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "pkm",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "pw",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "psi",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "kkn",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "jumlah",
          value: 0,
        },
      ],

    };
  }
}
