import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import * as Chartist from 'chartist';
import swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { CustomTable } from '../../components/custom-table/custom-table.interface';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { StorageService } from '../../core/services/storage.service';
import { Subject, Subscription, Observable } from "rxjs";

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  // listData = {
  //   header: [],
  //   field: [],
  //   data: [],
  // };

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
    chart.on('draw', function (data: any) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease',
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
    chart.on('draw', function (data: any) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    });

    seq2 = 0;
  }

  showSwal(basic) {
    swal.fire({
      title: 'Gelombang PMB',
      html:
        '<ol>' +
        '<li><span class="badge badge-info">Gelombang 1</span> 04 Jan 22 - 24 Apr 22</li>' +
        '<li><span class="badge badge-primary">Gelombang 2</span> 26 Apr 22 - 03 Jul 22</li>' +
        '<li><span class="badge badge-warning">Gelombang 3</span> 06 Jul 22 - 14 Agu 22</li>' +
        '</ol>',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-success',
      },
    });
  }

  constructor(private dataService: DataService, private router: Router, public breakpointObserver: BreakpointObserver, public dialog: MatDialog, private _storageService: StorageService) {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isScreenSmall = true;
        console.log('Matches small viewport or handset in portrait mode');
      } else {
        this.isScreenSmall = false;
      }
    });
  }
  user = this._storageService.get('username');

  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {
    this.inisialisasiTable();

    /*  **************** Public Preferences - Pie Chart ******************** */

    const dataPreferences = {
      labels: ['62%', '32%'],
      series: [62, 32],
    };

    const optionsPreferences = {
      height: '180px',
    };

    new Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

    /*  **************** Coloured Rounded Line Chart - Line Chart ******************** */

    const dataColouredBarsChart = {
      labels: ["'Gelombang1", "'Gelombang 2", "'Gelombang 3", "'Gelombang 4", "'Gelombang 5", "'Gelombang 6"],
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
      height: '300px',
    };

    const colouredBarsChart = new Chartist.Line('#colouredBarsChart', dataColouredBarsChart, optionsColouredBarsChart);

    this.startAnimationForLineChart(colouredBarsChart);

    /*  **************** Simple Bar Chart - barchart ******************** */

    const dataSimpleBarChart = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
        'screen and (max-width: 640px)',
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

    const simpleBarChart = new Chartist.Bar('#simpleBarChart', dataSimpleBarChart, optionsSimpleBarChart, responsiveOptionsSimpleBarChart);

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(simpleBarChart);

    const dataMultipleBarsChart = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
      height: '300px',
    };

    const responsiveOptionsMultipleBarsChart: any = [
      [
        'screen and (max-width: 640px)',
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

    const multipleBarsChart = new Chartist.Bar('#multipleBarsChart', dataMultipleBarsChart, optionsMultipleBarsChart, responsiveOptionsMultipleBarsChart);

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(multipleBarsChart);
  }
  ngAfterViewInit() {}

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
    this.listData = {
      filter: false,
      init_load: true,
      is_role: false,
      is_role_params: {
        prodi: 'kode_prodi',
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
        //   value: null,
        //   trigger: false,
        //   trigger_id: "kode_gelombang",
        //   trigger_params: null,
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
        //   value: null,
        //   trigger: true,
        //   trigger_id: null,
        //   trigger_params: "kode_tahun_akademik",
        //   api: {
        //     endpoint: "/pmb/master/gelombang",
        //     where: "id_aktif='Y' ",
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
        //   value: null,
        //   trigger: false,
        //   trigger_id: null,
        //   trigger_params: null,
        //   api: {
        //     endpoint: "/master/prodi",
        //     where: "id_aktif='Y'",
        //     prodi_role: {
        //       param: "kode",
        //       is_role: true,
        //     },
        //     id: "kode",
        //     label: "prodi",
        //   },
        // },
      ],
      header: [
        {
          type: '',
          label: '#',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-10',
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
          label: 'Tipe Surat',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'tipe_surat',
          filter: false,
          filter_type: 'text',
          filter_value: null,
          sort: false,
          sort_type: '',
          data: [],
        },
        {
          type: '',
          label: 'Surat',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'surat',
          filter: false,
          filter_type: 'text',
          filter_value: null,
          sort: false,
          sort_type: '',
          data: [],
        },
        {
          type: '',
          label: 'Status',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
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
          label: 'Tembusan',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'tembusan',
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
          field: 'tipe_surat',
        },
        {
          type: '',
          count_field: [],
          class: 'text-left border border-black-300',
          field: 'surat',
        },
        {
          type: '',
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'status',
        },
        {
          type: '',
          count_field: [],
          class: 'text-center border border-black-300',
          field: 'tembusan',
        },
      ],
      action: [],
      data: [
        {
          no: '',
          tipe_surat: 'Pemberitahuan',
          surat: 'Surat Undangan Sosialisasi',
          status: 'Didisposisikan',
          tembusan: '',
        },
        {
          no: '',
          tipe_surat: 'Pemberitahuan',
          surat: 'Surat Undangan Sosialisasi',
          status: 'Didisposisikan',
          tembusan: '',
        },
        {
          no: '',
          tipe_surat: 'Pemberitahuan',
          surat: 'Surat Undangan Sosialisasi',
          status: 'Didisposisikan',
          tembusan: '',
        },
        {
          no: '',
          tipe_surat: 'Pemberitahuan',
          surat: 'Surat Undangan Sosialisasi',
          status: 'Didisposisikan',
          tembusan: '',
        },
        {
          no: '',
          tipe_surat: 'Pemberitahuan',
          surat: 'Surat Undangan Sosialisasi',
          status: 'Didisposisikan',
          tembusan: '',
        },
        {
          no: '',
          tipe_surat: 'Pemberitahuan',
          surat: 'Surat Undangan Sosialisasi',
          status: 'Didisposisikan',
          tembusan: '',
        },
      ],
      // sum: [
      //   {
      //     type: '',
      //     label: 'Jumlah',
      //     class: 'text-right font-bold  ',
      //     colspan: '3',
      //     field: '',
      //     value: 0,
      //   },
      //   {
      //     type: '',
      //     label: '',
      //     class: 'text-center font-bold',
      //     colspan: '1',
      //     field: 'batal',
      //     value: 0,
      //   },
      //   {
      //     type: '',
      //     label: '',
      //     class: 'text-center font-bold',
      //     colspan: '1',
      //     field: 'calon_pendaftar',
      //     value: 0,
      //   },
      //   {
      //     type: '',
      //     label: '',
      //     class: 'text-center font-bold',
      //     colspan: '1',
      //     field: 'pendaftar',
      //     value: 0,
      //   },
      //   {
      //     type: '',
      //     label: '',
      //     class: 'text-center font-bold',
      //     colspan: '1',
      //     field: 'calon_peserta',
      //     value: 0,
      //   },
      //   {
      //     type: '',
      //     label: '',
      //     class: 'text-center font-bold',
      //     colspan: '1',
      //     field: 'peserta',
      //     value: 0,
      //   },
      //   {
      //     type: '',
      //     label: '',
      //     class: 'text-center font-bold',
      //     colspan: '1',
      //     field: 'tidak_lulus',
      //     value: 0,
      //   },
      //   {
      //     type: '',
      //     label: '',
      //     class: 'text-center font-bold',
      //     colspan: '1',
      //     field: 'cadangan',
      //     value: 0,
      //   },
      //   {
      //     type: '',
      //     label: '',
      //     class: 'text-center font-bold',
      //     colspan: '1',
      //     field: 'dipindah',
      //     value: 0,
      //   },
      //   {
      //     type: '',
      //     label: '',
      //     class: 'text-center font-bold',
      //     colspan: '1',
      //     field: 'camaba',
      //     value: 0,
      //   },
      //   {
      //     type: '',
      //     label: '',
      //     class: 'text-center font-bold',
      //     colspan: '1',
      //     field: 'undur_diri',
      //     value: 0,
      //   },
      //   {
      //     type: '',
      //     label: '',
      //     class: 'text-center font-bold',
      //     colspan: '1',
      //     field: 'maba',
      //     value: 0,
      //   },

      //   {
      //     type: '',
      //     label: '',
      //     class: 'text-center font-bold',
      //     colspan: '1',
      //     field: 'jumlah',
      //     value: 0,
      //   },
      // ],
      // not_pagination: false,
      // export: [
      //   {
      //     type: 'csv',
      //     label: 'CSV',
      //     label_report: 'summary-dashboard',
      //   },
      //   {
      //     type: 'pdf',
      //     label: 'PDF',
      //     label_report: 'summary-dashboard',
      //   },
      //   {
      //     type: 'excel',
      //     label: 'EXCEL',
      //     label_report: 'summary-dashboard',
      //   },
      // ],
    };
  }
}
