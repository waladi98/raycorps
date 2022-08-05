import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-master-laporan-kehadiran-dosen',
  templateUrl: 'laporan-kehadiran-dosen.component.html',
  styleUrls: ['./laporan-kehadiran-dosen.component.scss'],
})
export class LaporanKehadiranDosenComponent implements OnInit {
  public dataTable: DataTable;
  //   date = new FormControl(moment());

  listData = [];

  tahunAkademik = [
    { value: '1', viewItem: '20231 - Semester Gasal 2023 - 2024' },
    { value: '2', viewItem: '2022 - Semester Gasal 2022 -2023' },
    { value: '3', viewItem: '20212 - Semester Genap 2021 - 2022' },
    { value: '4', viewItem: '20211 - Semester Gasal 2021 - 2022' },
    { value: '5', viewItem: '2020 - Semester Transisi 2020 - 2021' },
  ];

  program = [
    { value: '1', viewItem: 'KER - Kerjasama' },
    { value: '2', viewItem: 'NON - Regular Sore' },
    { value: '3', viewItem: 'REG - Regular Pagi' },
    { value: '4', viewItem: 'TES - Program TES' },
  ];

  programStudi = [
    { value: '1', viewItem: '110 - Kedokteran' },
    { value: '2', viewItem: '111 - Pendidikan Dokter Gigi' },
    { value: '3', viewItem: '113 - Profesi Dokter Gigi' },
    { value: '4', viewItem: '120 - Manajemen' },
    { value: '5', viewItem: '121 - Akuntansi' },
    { value: '6', viewItem: '130 - Ilmu Hukum' },
    { value: '7', viewItem: '140 - Teknik Informatika' },
    { value: '8', viewItem: '150 - Ilmu Perpustakaan' },
    { value: '9', viewItem: '160 - Psikologi' },
    { value: '10', viewItem: '210 - Magister Manajemen' },
    { value: '11', viewItem: '220 - Magister Kenotariatan' },
    { value: '12', viewItem: '230 - Magister Biomedis' },
    { value: '13', viewItem: '301 - Teknik Kimia' },
    { value: '14', viewItem: '302 - Teknologi Pertambangan' },
    { value: '15', viewItem: '444 - Prodi Tes' },
  ];

  statusDosen = [
    { value: '1', viewItem: 'H - Kontrak' },
    { value: '2', viewItem: 'L - Tidak Tetap' },
    { value: '3', viewItem: 'T - Tetap' },
  ];

  statusKerja = [
    { value: '1', viewItem: 'A - Dosen Tetap' },
    { value: '2', viewItem: 'B - Dosen PNS Dipekerjakan' },
    { value: '3', viewItem: 'C - Dosen Honorer PNS-PTN' },
    { value: '3', viewItem: 'D - Dosen Honorer Non-PNS-PTN' },
    { value: '4', viewItem: 'E - Dosen Kontrak' },
    { value: '5', viewItem: 'F - Dosen Kontrak BHMN' },
  ];

  selectedValue = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.listData = [
      {
        kode: 'TI936',
        matakuliah: 'REKAYASA PERANGKAT LUNAK',
        kelas: 'D',
        kr: '213',
        dosen: 'DR. DRS. IMAN FIRMANSYAH, M.SC.,',
        hadirP: '12',
        a: '13',
        b: '21',
        c: '443',
        hadirS: '3',
        rencana: 'rencana',
        persen: '12%',
        presensiMahasiswa: '213',
      },
      {
        kode: 'E232',
        matakuliah: 'REKAYASA PERANGKAT LUNAK',
        kelas: 'B',
        kr: '213',
        dosen: 'DR. DRS. IMAN FIRMANSYAH, M.SC.,',
        hadirP: '12',
        a: '13',
        b: '21',
        c: '443',
        hadirS: '3',
        rencana: 'rencana',
        persen: '12%',
        presensiMahasiswa: '213',
      },
    ];
  }

  manageData(module) {
    if (module) {
      this.router.navigate(['/master-data/manage-laporan-kehadiran-dosen/' + module.kode]);
    } else {
      this.router.navigate(['/master-data/manage-laporan-kehadiran-dosen']);
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
