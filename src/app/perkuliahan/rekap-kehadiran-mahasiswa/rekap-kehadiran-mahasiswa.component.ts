import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-master-rekap-kehadiran-mahasiswa',
  templateUrl: 'rekap-kehadiran-mahasiswa.component.html',
  styleUrls: ['./rekap-kehadiran-mahasiswa.component.scss'],
})
export class RekapKehadiranMahasiswaComponent implements OnInit {
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

  dataMahasiswa = [
    {
      no: 1,
      npm: 163010015,
      namaMahasiswa: 'HADI NURSYAMSI DARMAWAN',
      dosenWali: 'EI009 - DR. DRS. IMAN FIRMANSYAH, M.SC.,',
      ips: '0.00',
      rerata: '9.94',
      kode_matkul: {
        kode_mk1: '	TI936',
        kode_mk2: '	TI936',
        kode_mk3: '	TI936',
        kode_mk4: '	TI936',
        kode_mk5: '	TI936',
        kode_mk6: '	TI936',
        kode_mk7: '	TI936',
        kode_mk8: '	TI936',
        kode_mk9: '	TI936',
        kode_mk10: 'TI936',
      },
      nilai_matkul: {
        nilai_mk1: '81.43',
        nilai_mk2: '81.43',
        nilai_mk3: '81.43',
        nilai_mk4: '81.43',
        nilai_mk5: '81.43',
        nilai_mk6: '81.43',
        nilai_mk7: '81.43',
        nilai_mk8: '81.43',
        nilai_mk9: '81.43',
        nilai_mk10: '81.43',
      },
    },
    {
      no: 2,
      npm: 163010016,
      namaMahasiswa: 'NUGROHO SURYA PRAWIRA REDJA',
      dosenWali: 'EI009 - DR. DRS. IMAN FIRMANSYAH, M.SC.,',
      ips: '0.00',
      rerata: '9.94',
      kode_matkul: {
        kode_mk1: '	TI936',
        kode_mk2: '	TI936',
        kode_mk3: '	TI936',
        kode_mk4: '	TI936',
        kode_mk5: '	TI936',
        kode_mk6: '	TI936',
        kode_mk7: '	TI936',
        kode_mk8: '	TI936',
        kode_mk9: '	TI936',
        kode_mk10: 'TI936',
      },
      nilai_matkul: {
        nilai_mk1: '81.43',
        nilai_mk2: '81.43',
        nilai_mk3: '81.43',
        nilai_mk4: '81.43',
        nilai_mk5: '81.43',
        nilai_mk6: '81.43',
        nilai_mk7: '81.43',
        nilai_mk8: '81.43',
        nilai_mk9: '81.43',
        nilai_mk10: '81.43',
      },
    },
    {
      no: 3,
      npm: 163010016,
      namaMahasiswa: 'NUGROHO SURYA PRAWIRA REDJA',
      dosenWali: 'EI009 - DR. DRS. IMAN FIRMANSYAH, M.SC.,',
      ips: '0.00',
      rerata: '9.94',
      kode_matkul: {
        kode_mk1: '	TI936',
        kode_mk2: '	TI936',
        kode_mk3: '	TI936',
        kode_mk4: '	TI936',
        kode_mk5: '	TI936',
        kode_mk6: '	TI936',
        kode_mk7: '	TI936',
        kode_mk8: '	TI936',
        kode_mk9: '	TI936',
        kode_mk10: 'TI936',
      },
      nilai_matkul: {
        nilai_mk1: '81.43',
        nilai_mk2: '81.43',
        nilai_mk3: '81.43',
        nilai_mk4: '81.43',
        nilai_mk5: '81.43',
        nilai_mk6: '81.43',
        nilai_mk7: '81.43',
        nilai_mk8: '81.43',
        nilai_mk9: '81.43',
        nilai_mk10: '81.43',
      },
    },
    {
      no: 4,
      npm: 163010016,
      namaMahasiswa: 'NUGROHO SURYA PRAWIRA REDJA',
      dosenWali: 'EI009 - DR. DRS. IMAN FIRMANSYAH, M.SC.,',
      ips: '0.00',
      rerata: '9.94',
      kode_matkul: {
        kode_mk1: '	TI936',
        kode_mk2: '	TI936',
        kode_mk3: '	TI936',
        kode_mk4: '	TI936',
        kode_mk5: '	TI936',
        kode_mk6: '	TI936',
        kode_mk7: '	TI936',
        kode_mk8: '	TI936',
        kode_mk9: '	TI936',
        kode_mk10: 'TI936',
      },
      nilai_matkul: {
        nilai_mk1: '81.43',
        nilai_mk2: '81.43',
        nilai_mk3: '81.43',
        nilai_mk4: '81.43',
        nilai_mk5: '81.43',
        nilai_mk6: '81.43',
        nilai_mk7: '81.43',
        nilai_mk8: '81.43',
        nilai_mk9: '81.43',
        nilai_mk10: '81.43',
      },
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.listData = [];
  }

  manageData(module) {
    if (module) {
      this.router.navigate(['/master-data/manage-rekap-kehadiran-mahasiswa/' + module.kode]);
    } else {
      this.router.navigate(['/master-data/manage-rekap-kehadiran-mahasiswa']);
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
