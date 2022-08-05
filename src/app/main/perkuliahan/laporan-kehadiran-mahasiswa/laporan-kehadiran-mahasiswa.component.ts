import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

declare const $: any;

@Component({
  selector: 'app-master-laporan-kehadiran-mahasiswa',
  templateUrl: 'laporan-kehadiran-mahasiswa.component.html',
  styleUrls: ['./laporan-kehadiran-mahasiswa.component.scss'],
})
export class LaporanKehadiranMahasiswaComponent implements OnInit {
  public dataTable: DataTable;

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

  dosen = [
    { value: '1', viewItem: 'ADE SUKENDAR,ST.,MT , ST.,MT.' },
    { value: '2', viewItem: 'AAN ALBONE,ST.,M.TI.,' },
    { value: '3', viewItem: 'ASEP SOMANTRI ST.,MT, ST., MT.' },
    { value: '4', viewItem: 'CACA EMILE SUPRIANA, S.SI., MT.,' },
    { value: '5', viewItem: 'DODDY FERDIANSYAH, ST., MT., ' },
  ];

  selectedValue = null;

  // Checkbox
  dataMahasiswa = [
    {
      no: '1',
      npm: '193010016',
      namaMahasiswa: 'ANANDA FAJAR MAULANA',
      waliAkademik: 'EI009 - DR. DRS. IMAN FIRMANSYAH, M.SC.,',
    },
    {
      no: '2',
      npm: '193010017',
      namaMahasiswa: 'ANISA AMALIA',
      waliAkademik: 'EI009 - DR. DRS. IMAN FIRMANSYAH, M.SC.,',
    },
    {
      no: '3',
      npm: '193010018',
      namaMahasiswa: 'RIDWAN WIJAYA',
      waliAkademik: 'EI009 - DR. DRS. IMAN FIRMANSYAH, M.SC.,',
    },
    {
      no: '4',
      npm: '193010019',
      namaMahasiswa: 'PRADIPTA DWI BUDIANSYAH',
      waliAkademik: 'EI009 - DR. DRS. IMAN FIRMANSYAH, M.SC.,',
    },
    {
      no: '5',
      npm: '193010020',
      namaMahasiswa: 'ROHMAT',
      waliAkademik: 'EI009 - DR. DRS. IMAN FIRMANSYAH, M.SC.,',
    },
    {
      no: '6',
      npm: '193010021',
      namaMahasiswa: 'AGUS FERDIANSYAH',
      waliAkademik: 'EI009 - DR. DRS. IMAN FIRMANSYAH, M.SC.,',
    },
    {
      no: '7',
      npm: '193010022',
      namaMahasiswa: 'DIMAS PRAYOGI',
      waliAkademik: 'EI009 - DR. DRS. IMAN FIRMANSYAH, M.SC.,',
    },
    {
      no: '8',
      npm: '193010023',
      namaMahasiswa: 'RISKA TRINUGRAHA SEPTIANI',
      waliAkademik: 'EI009 - DR. DRS. IMAN FIRMANSYAH, M.SC.,',
    },
    {
      no: '9',
      npm: '193010024',
      namaMahasiswa: 'NAUFAL SATRIA',
      waliAkademik: 'EI009 - DR. DRS. IMAN FIRMANSYAH, M.SC.,',
    },
    {
      no: '10',
      npm: '193010025',
      namaMahasiswa: 'DEDEN DEDI ISKANDAR',
      waliAkademik: 'EI009 - DR. DRS. IMAN FIRMANSYAH, M.SC.,',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.listData = [];
  }

  manageData(module) {
    if (module) {
      this.router.navigate(['/master-data/manage-laporan-kehadiran-mahasiswa/' + module.kode]);
    } else {
      this.router.navigate(['/master-data/manage-laporan-kehadiran-mahasiswa']);
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
    // table.on('click', '.edit', function (e) {
    //   let $tr = $(this).closest('tr');
    //   if ($($tr).hasClass('child')) {
    //     $tr = $tr.prev('.parent');
    //   }

    //   var data = table.row($tr).data();
    //   alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + "'s row.");
    //   e.preventDefault();
    // });

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

    // $('.card .material-datatables label').addClass('form-group');
  }
}
