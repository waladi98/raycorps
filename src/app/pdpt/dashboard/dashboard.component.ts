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

  chartData = {
    title: "Population (in millions)",
    type: "ColumnChart",
    data: [["Jabatan", 164, 120, 208, 218, 185, 103, 154, 132]],
    columnNames: [
      "Jumlah",
      "Rektor",
      "Warek I",
      "Warek II",
      "Warek III",
      "Directur",
      "Dekan",
      "Wadir I",
      "Wadir I",
    ],
    options: {},
    width: 1200,
    height: 400,
  };
  chartData1 = {
    title: "Population (in millions)",
    type: "ColumnChart",
    data: [["Per Kampus", 164, 120, 208, 218, 185, 103, 154, 132]],
    columnNames: [
      "Jumlah",
      "Kampus 1",
      "Kampus 2",
      "Kampus 3",
      "Kampus 4",
      "Kampus 5",
      "Kampus 6",
      "Kampus 7",
      "Kampus 8",
    ],
    options: {},
    width: 700,
    height: 400,
  };
  chartData2 = {
    title: "Population (in millions)",
    type: "ColumnChart",
    data: [["Per Ruangan", 10, 120, 208, 218, 185, 103, 154, 132, 50]],
    columnNames: [
      "Jumlah",
      "SB104",
      "SB105",
      "SB106",
      "SB107",
      "SB108",
      "SB304",
      "SB402",
      "SB202",
      "SB109",
    ],
    options: {},
    width: 700,
    height: 400,
  };
  chartData3 = {
    title: 'Browser market shares at a specific website, 2014',
    type: 'PieChart',
    data: [
      ['Spidol', 45.0],
      ['Pulpen', 26.8],
      ['Kapur', 12.8],
      ['Penghapus', 8.5],
      ['Kertas', 6.2],
      ['Amplop', 0.7]
    ],
    columnNames: ['Browser', 'Percentage'],
    options: {},
    width: 400,
    height: 400,
  };

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
    public dialog: MatDialog,
    private _storageService: StorageService
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
        "TI",
        "TP",
        "MS",
        "IF",
        "TL",
        "PWK",
      ],
      series: [[542, 443, 320, 780, 553, 453]],
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
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
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
          type: "",
          label: 'T S',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'ts',
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
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'program_studi',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Unit Binaan',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'unit_binaan',
          filter: false,
          filter_type: "select",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'TJMB(%)',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'tjmb',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'TJL(%)',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'tjl',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'PMA',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'pma',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'NDT',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'ndt',
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'NDS3',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'nds3',
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },

        {
          type: "",
          label: 'JADT',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'jadt',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },

        {
          type: "",
          label: 'RMDT',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'rmdt',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'NDTT',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'ndtt',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'RIPK',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'ripk',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'RMS',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'rms',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'KTW',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'ktw',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'NBS',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'nbs',
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: 'Nilai Tahap',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
          field: 'nilai_tahap',
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
          type: "",
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          type: "",
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'kode_dokumen',
        },
        {
          type: "",
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'nama_dokumen',
        },
        {
          type: "",
          count_field: [],
          class: 'text-left border border-black-300',
          field: 'tgl_update',
        },
        {
          type: "",
          count_field: [],
          class: 'text-left border border-black-300',
          field: 'aksi',
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
        }
      ]
    };
  }
}
