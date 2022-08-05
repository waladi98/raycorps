import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DataService } from "../../core/services/data.service";
import * as Chartist from "chartist";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { PageEvent } from "@angular/material/paginator";
import { Router, Route, ActivatedRoute } from "@angular/router";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { NgxSpinnerService } from "ngx-spinner";
import { StorageService } from "../../core/services/storage.service";

declare const $: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  listData = {
    header: [],
    field: [],
    data: [],
  };

  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  spinnerStatus = "Mohon Tunggu...";

  listDataSalam: {
    kode;
    salam;
  };

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
    title : 'Browser market shares at a specific website, 2014',
    type : 'PieChart',
    data : [
        ['Spidol', 45.0],
        ['Pulpen', 26.8],
        ['Kapur', 12.8],
        ['Penghapus', 8.5],
        ['Kertas', 6.2],
        ['Amplop', 0.7] 
    ],
    columnNames : ['Browser', 'Percentage'],
    options : {},
    width : 400,
    height : 400,
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
    private spinner: NgxSpinnerService,
    private _storageService: StorageService,
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
  user = localStorage.getItem("username");

  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {
    this.loadInitialData();
    this.inisialisasiTable();

    /*  **************** Public Preferences - Pie Chart ******************** */

    const dataPreferences = {
      labels: ["62%", "32%"],
      series: [62, 32],
    };

    const optionsPreferences = {
      height: "180px",
    };

    new Chartist.Pie("#chartPreferences", dataPreferences, optionsPreferences);

    /*  **************** Coloured Rounded Line Chart - Line Chart ******************** */

    const dataColouredBarsChart = {
      labels: [
        "'Gelombang1",
        "'Gelombang 2",
        "'Gelombang 3",
        "'Gelombang 4",
        "'Gelombang 5",
        "'Gelombang 6",
      ],
      series: [
        [250, 300, 350, 400, 450, 500],
        [12, 13, 17, 14, 10, 11],
        [167, 252, 202, 320, 260, 380],
      ],
    };

    const optionsColouredBarsChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 10,
      }),
      axisY: {
        showGrid: true,
      },
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 500,
      showPoint: true,
      height: "300px",
    };

    const colouredBarsChart = new Chartist.Line(
      "#colouredBarsChart",
      dataColouredBarsChart,
      optionsColouredBarsChart
    );

    this.startAnimationForLineChart(colouredBarsChart);

    /*  **************** Simple Bar Chart - barchart ******************** */

    const dataSimpleBarChart = {
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
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]],
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
  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();
      const request = [this.loadDataSalam()];

      const [listDataSalam] = await Promise.all(request);
      this.listDataSalam = listDataSalam.result[0];

      this.hideSpinner();
      this.helloShow();
    } catch (error) {
      console.log(error);
    }
  }
  ngAfterViewInit() {}

  helloShow() {
    var welcome =this._storageService.get('welcome');
    if(welcome == '1'){
      return false;
    }else{
      this._storageService.set('welcome','1');
    }
    swal
      .fire({
        imageUrl: "../../assets/img/faces/ava.png",
        imageHeight: 100,

        html:
          "<h6> <b>" +
          this.listDataSalam.salam +
          "</b></h6> </br> <b>Selamat datang di SMART CAMPUS YARSI</b> </br><b>Sistem Sarana dan Prasarana</b>",
        width: 470,
        // icon: "success",
        customClass: {
          confirmButton: "btn btn-success",
        },
        buttonsStyling: false,
        showCancelButton: false,
        confirmButtonText: "Teruskan",
      })
      .then((result) => {
        // this.router.navigate(["/pmb/dashboarda"]);
        //this.ngAfterViewInit();
      });
  }
  showSpinner(): void {
    this.isLoading = true;
    this.spinner.show(this.spinnerName);
  }

  hideSpinner(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.spinner.hide(this.spinnerName);
    }, 2000);
  }
  loadDataSalam(): Promise<any> {
    return this.dataService
      .getRequest<any>("/master/salam", {
        where: "kode='" + localStorage.getItem("username") + "'",
      })
      .toPromise();
  }
  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: "Program Studi",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-36",
          field: "prodi",
        },
        {
          label: "Pendaftar",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-36",
          field: "pendaftar",
        },
        {
          label: "Lulus PMDK",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "lulus_pmdk",
        },
        {
          label: "Lulus Ujian",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "lulus_ujian",
        },
        {
          label: "Total",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "total",
        },
      ],
      field: [
        {
          class: "text-center border border-black-300",
          field: "prodi",
        },
        {
          class: "text-center border border-black-300",
          field: "pendaftar",
        },
        {
          class: "text-center border border-black-300",
          field: "lulus_pmdk",
        },
        {
          class: "text-center border border-black-300",
          field: "lulus_ujian",
        },
        {
          class: "text-center border border-black-300",
          field: "total",
        },
      ],
      data: [
        {
          prodi: "Kedokteran",
          pendaftar: "63",
          lulus_pmdk: "23",
          lulus_ujian: "40",
          total: "63",
        },
        {
          prodi: "Kedokteran Gigi",
          pendaftar: "63",
          lulus_pmdk: "23",
          lulus_ujian: "40",
          total: "63",
        },
        {
          prodi: "Profesi Dokter Gigi",
          pendaftar: "63",
          lulus_pmdk: "23",
          lulus_ujian: "40",
          total: "63",
        },
        {
          prodi: "Manajemen",
          pendaftar: "63",
          lulus_pmdk: "23",
          lulus_ujian: "40",
          total: "63",
        },
        {
          prodi: "Akuntansi",
          pendaftar: "63",
          lulus_pmdk: "23",
          lulus_ujian: "40",
          total: "63",
        },
        {
          prodi: "Ilmu Hukum",
          pendaftar: "63",
          lulus_pmdk: "23",
          lulus_ujian: "40",
          total: "63",
        },
        {
          prodi: "Teknik Informatika",
          pendaftar: "63",
          lulus_pmdk: "23",
          lulus_ujian: "40",
          total: "63",
        },
        {
          prodi: "Ilmu Perpustakaan",
          pendaftar: "63",
          lulus_pmdk: "23",
          lulus_ujian: "40",
          total: "63",
        },
        {
          prodi: "Psikologi",
          pendaftar: "63",
          lulus_pmdk: "23",
          lulus_ujian: "40",
          total: "63",
        },
        {
          prodi: "Magister Manajemen",
          pendaftar: "63",
          lulus_pmdk: "23",
          lulus_ujian: "40",
          total: "63",
        },
        {
          prodi: "Magister Kenotariaan",
          pendaftar: "63",
          lulus_pmdk: "23",
          lulus_ujian: "40",
          total: "63",
        },
        {
          prodi: "Magister Biomedis",
          pendaftar: "63",
          lulus_pmdk: "23",
          lulus_ujian: "40",
          total: "63",
        },
      ],
    };
  }
}
