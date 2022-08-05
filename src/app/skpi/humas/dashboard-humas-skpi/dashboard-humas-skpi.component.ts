import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DataService } from "../../../core/services/data.service";
import * as Chartist from "chartist";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { Router, Route, ActivatedRoute } from "@angular/router";
import { finalize, map, takeUntil } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
import { CustomTable } from "../../../components/custom-table/custom-table.interface";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { StorageService } from '../../../core/services/storage.service';
import ChartistTooltip from 'chartist-plugin-tooltip';
import { ExcelService } from '../../../core/services/excel.service';

declare const $: any;

@Component({
  selector: "app-skpi-dashboard-humas-skpi",
  templateUrl: "./dashboard-humas-skpi.component.html",
})
export class DashboardHumasSkpiComponent implements OnInit, AfterViewInit {
  listDataGelombangPeriode: {
    id_gelombang;
    nama;
    mulai_pendaftaran;
    selesai_pendaftaran_online;
    mulai_pengumuman;
    selesai_pengumuman;
    mulai_registrasi;
    selesai_registrasi;
  };
  listDataRekapPmb: {
    batal;
    calon_pendaftar;
    pendaftar;
    calon_peserta;
    peserta;
    camaba;
    maba;
    tidak_lulus;
    undur_diri;
    dipindah;
    cadangan;
    jumlah;
  };
  listDataRekapPmbHarian: {
    calon_pendaftar;
    pendaftar;
    calon_peserta;
    peserta;
    camaba;
    maba;
    batal;
    undur_diri;
    tidak_lulus;
    jumlah;
  };
  listDataSalam: {
    kode;
    salam;
  };
  salam: any;
  dateObj = new Date();
  month = this.dateObj.getUTCMonth() + 1; //months from 1-12
  day = this.dateObj.getUTCDate();
  year = this.dateObj.getUTCFullYear();

  newdate = this.month + "/" + this.day;
  today = new Date();
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
  pageSize = 12;
  pageSizeOptions: number[] = [10, 10, 15];

  isScreenSmall: boolean;

  params: any;

  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  spinnerStatus = "Mohon Tunggu...";
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

  showSwal(basic) {
    swal.fire({
      title: "Gelombang PMB",
      html:
        "<ol>" +
        '<li><span class="badge badge-info">Gelombang 1</span> 04 Jan 22 - 24 Apr 22</li>' +
        '<li><span class="badge badge-primary">Gelombang 2</span> 26 Apr 22 - 03 Jul 22</li>' +
        '<li><span class="badge badge-warning">Gelombang 3</span> 06 Jul 22 - 14 Agu 22</li>' +
        "</ol>",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  }

  constructor(
    private dataService: DataService,
    private router: Router,
    public breakpointObserver: BreakpointObserver,
    private spinner: NgxSpinnerService,
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
    this.loadDataRekapPmb(0);
    this.loadInitialData();

    /*  **************** Simple Bar Chart - barchart ******************** */

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
  ngAfterViewInit() {}

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();
      const request = [
        this.loadGelombangPeriode(),
        this.loadRekapPmbTahunAkademik(),
        this.loadRekapPmbHarian(),
        this.loadChartDataPendaftaranOnline(),
        this.loadDataSalam(),
      ];

      const [
        gelombangPeriode,
        rekapPmbAktif,
        rekapPmbHarian,
        chartDataPeftaranOnline,
        listDataSalam,
      ] = await Promise.all(request);

      this.listDataGelombangPeriode = gelombangPeriode.result;
      this.listDataRekapPmb = rekapPmbAktif.result[0];
      this.listDataRekapPmbHarian = rekapPmbHarian.result[0];

      this.setDataChartPendaftaranOnline(chartDataPeftaranOnline.result);
      this.listDataSalam = listDataSalam.result[0];
      this.hideSpinner();
      this.helloShow();
    } catch (error) {
      console.log(error);
    }
  }

  setDataChartPendaftaranOnline(data) {
    const dataChartJumPendaftarOnline = {
      labels: [],
      series: [[]],
    };

    for (let i = 0; i < data.length; i++) {
      dataChartJumPendaftarOnline.labels.push(data[i].bulan);
      dataChartJumPendaftarOnline.series[0].push(data[i].jumlah);
    }

    const optionsChartJumPendaftarOnline = {
      seriesBarDistance: 20,
      axisX: {
        showGrid: true,
      },
        plugins: [
          ChartistTooltip()
        ]
    };

    const responsiveOptionsChartJumPendaftarOnline: any = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value: any) {
              return value[0];
            },
          },
          plugins: [
          ChartistTooltip()
        ]
        },
      ],
    ];

    const chartJumPendaftarOnline = new Chartist.Bar(
      "#chartJumPendaftarOnline",
      dataChartJumPendaftarOnline,
      optionsChartJumPendaftarOnline,
      responsiveOptionsChartJumPendaftarOnline
    );

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(chartJumPendaftarOnline);
  }

  helloShow() {
    var welcome =this._storageService.get('welcome');
    if(welcome == '1'){
      return false;
    }else{
      this._storageService.set('welcome','1');
    }
    // this.isLoading = true;
    swal
      .fire({
        imageUrl: "../../assets/img/faces/ava.png",
        imageHeight: 100,
        html:
          "<h5> <b>" +
          this.listDataSalam.salam +
          "</b></h5> </br> <b>Selamat Datang di SMART CAMPUS YARSI</b> </br><b>Sistem Penerimaan Mahasiswa Baru</b>",
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
  loadGelombangPeriode(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/master/gelombang", {
        where: "id_aktif='Y' ",
      })
      .toPromise();
  }
  loadRekapPmbTahunAkademik(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/rekapPmbTahunAkademik", {})
      .toPromise();
  }
  loadRekapPmbHarian(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/rekapPmbHarian", {})
      .toPromise();
  }

  loadChartDataPendaftaranOnline(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/penjualanFormulirBulan", {})
      .toPromise();
  }
  loadDataSalam(): Promise<any> {
    return this.dataService
      .getRequest<any>("/master/salam", {
        where: "kode='" + this._storageService.get("username") + "'",
      })
      .toPromise();
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  loadDataRekapPmb(page: number): void {
    this.isLoadingTable = true;
    this.dataService
      .getPostRequest<any>("/pmb/rekapPmbAktif", {
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
  inisialisasiTable() {
    this.listData = {
      filter: false,
      init_load: true,
      is_role: false,
      is_role_params: {
        prodi: "kode_prodi",
      },
      endpoint: "pmb/rekapPmbAktif",
      action_name: "",
      type: "",
      order: "",
      where: "",
      group: "",
      pageSize:14,
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
          type: "",
          label: "#",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-10",
          field: "no",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Program Studi",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "prodi",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Fakultas",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "fakultas",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          tooltip:
            "Calon pendaftar yang batal dikarenakan data ganda atau data testing",
          type: "",
          label: "Batal",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "batal",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip: "Pendaftar yang belum melakukan pembayaran",
          type: "",
          label: "Calon Pendaftar",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "calon_pendaftar",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip:
            "Pendaftar yang sudah melakukan pembayaran namun belum mengisi formulir.",
          type: "",
          label: "Pendaftar",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "pendaftar",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip:
            "Peserta yang sudah mengisi formulir namun persyaratannya BELUM LENGKAP",
          type: "",
          label: "Calon Peserta",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "calon_peserta",
          filter: true,
          filter_type: "select",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip: "Peserta yang peryaratannya sudah diverifikasi",
          type: "",
          label: "Peserta",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "peserta",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip: "Peserta yang dinyatakan TIDAK LULUS",
          type: "",
          label: "Tidak Lulus",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "tidak_lulus",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip:
            "Peserta menjadi cadangan untuk Peserta yang mengundurkan diri",
          type: "",
          label: "Cadangan",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "cadangan",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip: "Peserta ditawarkan ke Prodi pilihan 2 atau 3",
          type: "",
          label: "Dipindahkan",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "dipindah",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip: "Peserta yang sudah dinyatakan LULUS",
          type: "",
          label: "Camaba",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "camaba",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip: "Peserta LULUS yang mengundurkan diri",
          type: "",
          label: "Undur Diri",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "undur_diri",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          tooltip: "Peserta Lulus yang sudah melakukan registrasi",
          type: "",
          label: "Maba",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "maba",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },

        {
          type: "",
          label: "Jumlah",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "jumlah",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
      ],
      field: [
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "no",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "prodi",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "fakultas",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "batal",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "calon_pendaftar",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "pendaftar",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "calon_peserta",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "peserta",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "tidak_lulus",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "cadangan",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "dipindah",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "camaba",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "undur_diri",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "maba",
        },

        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "jumlah",
        },
      ],
      action: [],
      data: [],
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
          field: "batal",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "calon_pendaftar",
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
          field: "calon_peserta",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "peserta",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "tidak_lulus",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "cadangan",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "dipindah",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "camaba",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "undur_diri",
          value: 0,
        },
        {
          type: "",
          label: "",
          class: "text-center font-bold",
          colspan: "1",
          field: "maba",
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
      not_pagination: false,
      export:[{
        type:"csv",
        label:"CSV",
        label_report:"summary-dashboard"
      },
      {
        type:"pdf",
        label:"PDF",
        label_report:"summary-dashboard"
      },
      {
        type:"excel",
        label:"XLSX",
        label_report:"summary-dashboard"
      }]
    };
  }
  // inisialisasiTable() {
  //   this.listData = {
  //     header: [
  //       {
  //         label: "Program Studi",
  //         class: "text-sm text-center border border-black-300 bg-gray-400 w-72",
  //         field: "pendaftar",
  //       },
  //       {
  //         label: "Fakultas",
  //         class: "text-sm text-center border border-black-300 bg-gray-400",
  //         field: "lulus_pmdk",
  //       },
  //       {
  //         label: "Calon Pendaftar",
  //         class: "text-sm text-center border border-black-300 bg-gray-400",
  //         field: "lulus_ujian",
  //       },
  //       {
  //         label: "Pendaftar",
  //         class: "text-sm text-center border border-black-300 bg-gray-400",
  //         field: "total",
  //       },
  //       {
  //         label: "Calon Peserta",
  //         class: "text-sm text-center border border-black-300 bg-gray-400",
  //         field: "total",
  //       },
  //       {
  //         label: "Camaba",
  //         class: "text-sm text-center border border-black-300 bg-gray-400",
  //         field: "total",
  //       },
  //       {
  //         label: "Maba",
  //         class: "text-sm text-center border border-black-300 bg-gray-400",
  //         field: "total",
  //       },
  //       {
  //         label: "Batal",
  //         class: "text-sm text-center border border-black-300 bg-gray-400",
  //         field: "total",
  //       },
  //       {
  //         label: "Jumlah",
  //         class: "text-sm text-center border border-black-300 bg-gray-400",
  //         field: "total",
  //       },
  //     ],
  //     field: [
  //       {
  //         class: "text-left border border-black-300",
  //         field: "prodi",
  //       },
  //       {
  //         class: "text-left border border-black-300",
  //         field: "fakultas",
  //       },
  //       {
  //         class: "text-center border border-black-300",
  //         field: "calon_pendaftar",
  //       },
  //       {
  //         class: "text-center border border-black-300",
  //         field: "pendaftar",
  //       },
  //       {
  //         class: "text-center border border-black-300",
  //         field: "peserta",
  //       },
  //       {
  //         class: "text-center border border-black-300",
  //         field: "camaba",
  //       },
  //       {
  //         class: "text-center border border-black-300",
  //         field: "maba",
  //       },
  //       {
  //         class: "text-center border border-black-300",
  //         field: "batal",
  //       },
  //       {
  //         class: "text-center border border-black-300",
  //         field: "jumlah",
  //       },
  //     ],
  //     data: [],
  //   };
  // }
}
