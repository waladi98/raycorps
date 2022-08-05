import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-master-riwayat-pembayaran-dpp',
  templateUrl: 'riwayat-pembayaran-dpp.component.html',
  styleUrls: ['./riwayat-pembayaran-dpp.component.scss'],
})
export class RiwayatPembayaranDppComponent implements OnInit {
  public dataTable: DataTable;

  tahun_akademik = [
    { value: '20021', viewValue: 'Semester Gasal 2040 - 2041' },
    { value: '20331', viewValue: 'Semester Gasal 2033 - 2034' },
    { value: '20330', viewValue: 'Semester Transisi 2033 - 2034' },
    { value: '20304', viewValue: 'Semester Transisi 2030 - 2031' },
    { value: '20303', viewValue: 'Semester Sisipan 2030 - 2031' },
    { value: '20231', viewValue: 'Semester Gasal 2023 - 2024' },
    { value: '20221', viewValue: 'Semester Gasal 2023 - 2024' },
  ];

  program = [
    { value: 'null', viewValue: '' },
    { value: 'KER', viewValue: 'KER - Kerjasama' },
    { value: 'NON', viewValue: 'NON - Reguler Sore' },
    { value: 'REG', viewValue: 'REG - Reguler Pagi' },
    { value: 'TES', viewValue: 'TES - Program Tes' },
  ];

  program_studi = [
    { value: '110', viewValue: '110 - Kedokteran' },
    { value: '111', viewValue: '111 - Pendidikan Dokter Gigi' },
    { value: '160', viewValue: '160 - Psikologi' },
    { value: '301', viewValue: '301 - Teknik Kimia' },
    { value: '303', viewValue: '303 - Teknik Sipil' },
    { value: '304', viewValue: '304 - Teknik Informatika' },
    { value: '444', viewValue: '444 - Prodi Tes' },
  ];

  dosen_wali = [
    { value: 'uts', viewValue: 'UTS' },
    { value: 'uas', viewValue: 'UAS' },
  ];

  listData = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.listData = [
      {
        no: 1,
        npm: '183040001',
        nama_mahasiswa: 'TEDY YUDA FERNANDO',
        dpp: '25 %',
        wali_akademik: 'ALIF02 - RIZAL NUR AGUSTIAN,',
      },
      {
        no: 2,
        npm: '183040002',
        nama_mahasiswa: 'MOCHAMAD RIZKY AJI PANGESTU',
        dpp: '100 %',
        wali_akademik: 'ALIF02 - RIZAL NUR AGUSTIAN,',
      },
    ];
  }

  manageData(module) {
    if (module) {
      this.router.navigate(['/master-data/manage-jadwal-ujian/' + module.kode]);
    } else {
      this.router.navigate(['/master-data/manage-jadwal-ujian']);
    }
  }

  ngAfterViewInit() {
    $('#datatables').DataTable({
      pagingType: 'full_numbers',
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'All'],
      ],
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search records',
      },
    });

    const table = $('#datatables').DataTable();

    // Edit record
    table.on('click', '.edit', function (e) {
      let $tr = $(this).closest('tr');
      if ($($tr).hasClass('child')) {
        $tr = $tr.prev('.parent');
      }

      var data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + "'s row.");
      e.preventDefault();
    });

    // Delete a record
    table.on('click', '.remove', function (e) {
      const $tr = $(this).closest('tr');
      table.row($tr).remove().draw();
      e.preventDefault();
    });

    //Like record
    table.on('click', '.like', function (e) {
      alert('You clicked on Like button');
      e.preventDefault();
    });

    $('.card .material-datatables label').addClass('form-group');
  }
}
