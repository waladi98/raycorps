import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { DataService } from "../../core/services/data.service";
import { NgxSpinnerService } from "ngx-spinner";
import { CustomTable } from "../../components/custom-table/custom-table.interface";
import * as Chartist from "chartist";
import { StorageService } from "../../core/services/storage.service";

declare const $: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private _storageService: StorageService,
  ) {}

  user = this._storageService.get("user_token");

  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  spinnerStatus = "Mohon Tunggu...";

  listDataSalam: {
    kode;
    salam;
  };

  listData: CustomTable;

  eventsLoad: Subject<void> = new Subject<void>();

  loadDataTable() {
    this.eventsLoad.next();
  }

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
    data: [["Satuan Kerja", 164, 120, 208, 218, 185, 103, 154, 132]],
    columnNames: [
      "Jumlah",
      "Universitas Yarsi",
      "Sekolah Pascasarjana",
      "Teknologi Informasi",
      "Hukum",
      "Ekonomi & Bisnis",
      "Kedokteran",
      "Psikologi",
      "Kedokteran Gigi",
    ],
    options: {},
    width: 1200,
    height: 400,
  };
  chartData2 = {
    title: "Population (in millions)",
    type: "ColumnChart",
    data: [["Pendidikan", 10, 120, 208, 218, 185, 103, 154, 132, 50]],
    columnNames: [
      "Jumlah",
      "SMP",
      "SMA",
      "SD",
      "S3",
      "S2",
      "S1",
      "Diploma Tiga",
      "D2",
      "D1",
    ],
    options: {},
    width: 600,
    height: 400,
  };
  chartData3 = {
    title: "Population (in millions)",
    type: "ColumnChart",
    data: [["Golongan", 164, 120, 208, 218, 185, 103, 154, 132]],
    columnNames: [
      "Jumlah",
      "IV/E",
      "IV/D",
      "IV/C",
      "IV/A",
      "III/D",
      "III/B",
      "III/C",
      "III/A",
    ],
    options: {},
    width: 600,
    height: 400,
  };
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

  public ngOnInit() {
    this.loadInitialData();
    this.inisialisasiTable();
  }
  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();
      const request = [
        this.loadDataSalam(),
        this.loadChartDataPendaftaranOnline(),
      ];

      const [listDataSalam, chartDataPeftaranOnline] = await Promise.all(
        request
      );
      this.listDataSalam = listDataSalam.result[0];
      this.setDataChartPendaftaranOnline(chartDataPeftaranOnline.result);

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
          "</b></h6> </br> <b>Selamat datang di SMART CAMPUS YARSI</b> </br><b>Sistem Kelulusan</b>",
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
      seriesBarDistance: 10,
      axisX: {
        showGrid: false,
      },
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
        },
      ],
    ];

    const chartJumPendaftarOnline = new Chartist.Bar(
      "#chartJumPendaftarOnline",
      dataChartJumPendaftarOnline,
      optionsChartJumPendaftarOnline,
      responsiveOptionsChartJumPendaftarOnline
    );
    const chartJumPendaftarOnline2 = new Chartist.Bar(
      "#chartJumPendaftarOnline2",
      dataChartJumPendaftarOnline,
      optionsChartJumPendaftarOnline,
      responsiveOptionsChartJumPendaftarOnline
    );
    const chartJumPendaftarOnline3 = new Chartist.Bar(
      "#chartJumPendaftarOnline3",
      dataChartJumPendaftarOnline,
      optionsChartJumPendaftarOnline,
      responsiveOptionsChartJumPendaftarOnline
    );

    // start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(chartJumPendaftarOnline);
  }
  inisialisasiTable() {
    this.listData = {
      filter: false,
      init_load: true,
      is_role: false,
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
          label: "NIP",
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
          label: "Nama",
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
          label: "Tanggal Masuk",
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
          label: "Pensiun",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "calon_pendaftar",
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
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "no",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "nip",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "nama_pegawai",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "tanggal_lahir",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "pensiun",
        },
      ],
      action: [],
      data: [
        {
          id: "1",
          nip: "531141106017",
          nama_pegawai: "Ummi Azizah Rachmawati",
          tanggal_lahir: "2006-08-25",
          pensiun: "------",
        },
        {
          id: "2",
          nip: "531141106018",
          nama_pegawai: "Herika Hayurani",
          tanggal_lahir: "1979-08-10",
          pensiun: "------",
        },
        {
          id: "3",
          nip: "531148196097",
          nama_pegawai: "Sri Wuryanti",
          tanggal_lahir: "1996-11-01",
          pensiun: "------",
        },
        {
          id: "4",
          nip: "531148102107",
          nama_pegawai: "Lang Yudhi KF",
          tanggal_lahir: "2002-04-08",
          pensiun: "------",
        },
        {
          id: "5",
          nip: "531148103115",
          nama_pegawai: "Imelda",
          tanggal_lahir: "2003-10-06",
          pensiun: "------",
        },
      ],
      // sum: [
      //   {
      //     type: "",
      //     label: "Jumlah",
      //     class: "text-right font-bold  ",
      //     colspan: "3",
      //     field: "",
      //     value: 0,
      //   },
      //   {
      //     type: "",
      //     label: "",
      //     class: "text-center font-bold",
      //     colspan: "1",
      //     field: "batal",
      //     value: 0,
      //   },
      //   {
      //     type: "",
      //     label: "",
      //     class: "text-center font-bold",
      //     colspan: "1",
      //     field: "calon_pendaftar",
      //     value: 0,
      //   },
      // ],
      not_pagination: false,
    };
  }
}
