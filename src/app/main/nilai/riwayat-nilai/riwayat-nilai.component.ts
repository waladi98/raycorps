import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-master-Riwayat-nilai',
  templateUrl: 'riwayat-nilai.component.html',
})
export class RiwayatNilaiComponent implements OnInit {
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

  angkatan = [
    { value: '2011', viewValue: '2011' },
    { value: '2012', viewValue: '2012' },
    { value: '2013', viewValue: '2013' },
    { value: '2014', viewValue: '2014' },
    { value: '2015', viewValue: '2015' },
    { value: '2016', viewValue: '2016' },
    { value: '2017', viewValue: '2017' },
    { value: '2018', viewValue: '2018' },
    { value: '2019', viewValue: '2019' },
    { value: '2020', viewValue: '2020' },
    { value: '2021', viewValue: '2021' },
    { value: '2022', viewValue: '2022' },
    { value: '2023', viewValue: '2023' },
    { value: '2024', viewValue: '2024' },
  ];

  programs = [
    { value: 'all', viewValue: 'Tampilkan Semua' },
    { value: 'KER', viewValue: 'KER - Kerjasama' },
    { value: 'NON', viewValue: 'NON - Reguler Sore' },
    { value: 'REG', viewValue: 'REG - Reguler Pagi' },
    { value: 'TES', viewValue: 'TES - Program Tes' },
  ];

  prodis = [
    { value: 'all', viewValue: 'Tampilkan Semua' },
    { value: '110', viewValue: '110 - Kedokteran' },
    { value: '111', viewValue: '111 - Pendidikan Dokter Gigi' },
    { value: '160', viewValue: '160 - Psikologi' },
    { value: '301', viewValue: '301 - Teknik Kimia' },
    { value: '303', viewValue: '303 - Teknik Sipil' },
    { value: '304', viewValue: '304 - Teknik Informatika' },
    { value: '444', viewValue: '444 - Prodi Tes' },
  ];

  listData = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.listData = [
      {
        no: '1',
        kode: 'EL182',
        nama: 'CAHYONO, S.PD., M.PD.',
        status: 'Tidak Tetap',
        mk: '1',
        kelas: '2',
        ratarata: '4.07',
      },
    ];
  }

  manageData(module) {
    if (module) {
      this.router.navigate(['/master-data/manage-surat-hasil-umpan-balik/' + module.kode]);
    } else {
      this.router.navigate(['/master-data/manage-surat-hasil-umpan-balik']);
    }
  }

  ngAfterViewInit() {}
}
