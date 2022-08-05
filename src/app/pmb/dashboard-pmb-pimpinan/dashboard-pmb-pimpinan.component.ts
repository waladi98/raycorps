import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import * as Chartist from 'chartist';
import swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { StorageService } from '../../core/services/storage.service';

declare const $: any;

@Component({
  selector: 'app-pmb-dashboard-pmb-pimpinan',
  templateUrl: './dashboard-pmb-pimpinan.component.html'
})
export class DashboardPmbPimpinanComponent implements OnInit, AfterViewInit {

  listData = {
    header: [],
    field: [],
    data: [],
  };

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
    chart.on('draw', function (data: any) {

      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
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
    chart.on('draw', function (data: any) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  }

  showSwal(basic) {
    swal.fire({
      title: "Gelombang PMB",
      html: '<ol>' +
        '<li><span class="badge badge-info">Gelombang 1</span> 04 Jan 22 - 24 Apr 22</li>' +
        '<li><span class="badge badge-primary">Gelombang 2</span> 26 Apr 22 - 03 Jul 22</li>' +
        '<li><span class="badge badge-warning">Gelombang 3</span> 06 Jul 22 - 14 Agu 22</li>' +
        '</ol>',
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-success"
      }
    })
  };

  constructor(private dataService: DataService, private router: Router, public breakpointObserver: BreakpointObserver, public dialog: MatDialog,
    private _storageService: StorageService
  ) {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isScreenSmall = true;
        console.log('Matches small viewport or handset in portrait mode');
      } else {
        this.isScreenSmall = false;
      }
    });
  }
  user = this._storageService.get('username');;

  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {

    this.inisialisasiTable();

    /*  **************** Public Preferences - Pie Chart ******************** */

    const dataPreferences = {
      labels: ['62%', '32%'],
      series: [62, 32]
    };

    const optionsPreferences = {
      height: '180px'
    };

    new Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

    /*  **************** Coloured Rounded Line Chart - Line Chart ******************** */


    const dataColouredBarsChart = {
      labels: ['\'Gelombang1', '\'Gelombang 2', '\'Gelombang 3', '\'Gelombang 4', '\'Gelombang 5', '\'Gelombang 6'],
      series: [
        [250, 300, 350, 400, 450, 500],
        [12, 13, 17, 14, 10, 11],
        [167, 252, 202, 320, 260, 380]
      ]
    };

    const optionsColouredBarsChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 10
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
      height: '300px'
    };


    const colouredBarsChart = new Chartist.Line('#colouredBarsChart', dataColouredBarsChart,
      optionsColouredBarsChart);

    this.startAnimationForLineChart(colouredBarsChart);

    /*  **************** Simple Bar Chart - barchart ******************** */

    const dataSimpleBarChart = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
      ]
    };

    const optionsSimpleBarChart = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      }
    };

    const responsiveOptionsSimpleBarChart: any = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value: any) {
            return value[0];
          }
        }
      }]
    ];

    const simpleBarChart = new Chartist.Bar('#simpleBarChart', dataSimpleBarChart, optionsSimpleBarChart,
      responsiveOptionsSimpleBarChart);

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(simpleBarChart);


    const dataMultipleBarsChart = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
        [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
      ]
    };

    const optionsMultipleBarsChart = {
      seriesBarDistance: 10,
      axisX: {
        showGrid: false
      },
      height: '300px'
    };

    const responsiveOptionsMultipleBarsChart: any = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value: any) {
            return value[0];
          }
        }
      }]
    ];

    const multipleBarsChart = new Chartist.Bar('#multipleBarsChart', dataMultipleBarsChart,
      optionsMultipleBarsChart, responsiveOptionsMultipleBarsChart);

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(multipleBarsChart);


  }
  ngAfterViewInit() {

  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: 'Program Studi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'prodi',
        },
        {
          label: 'Pendaftar',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'pendaftar',
        },
        {
          label: 'Total',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'total',
        }
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'prodi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'pendaftar',
        },
        {
          class: 'text-center border border-black-300',
          field: 'total',
        }
      ],
      data: [
        {
          prodi: 'Kedokteran',
          pendaftar: '63',
          total: '63',
        },
        {
          prodi: 'Kedokteran Gigi',
          pendaftar: '63',
          total: '63',
        },
        {
          prodi: 'Profesi Dokter Gigi',
          pendaftar: '63',
          total: '63',
        },
        {
          prodi: 'Manajemen',
          pendaftar: '63',
          total: '63',
        },
        {
          prodi: 'Akuntansi',
          pendaftar: '63',
          total: '63',
        },
        {
          prodi: 'Ilmu Hukum',
          pendaftar: '63',
          total: '63',
        },
        {
          prodi: 'Teknik Informatika',
          pendaftar: '63',
          total: '63',
        },
        {
          prodi: 'Ilmu Perpustakaan',
          pendaftar: '63',
          total: '63',
        },
        {
          prodi: 'Psikologi',
          pendaftar: '63',
          total: '63',
        },
        {
          prodi: 'Magister Manajemen',
          pendaftar: '63',
          total: '63',
        },
        {
          prodi: 'Magister Kenotariaan',
          pendaftar: '63',
          total: '63',
        },
        {
          prodi: 'Magister Biomedis',
          pendaftar: '63',
          total: '63',
        },
      ],
    };
  }
}
