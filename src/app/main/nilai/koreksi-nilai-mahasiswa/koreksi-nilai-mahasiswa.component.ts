import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-master-koreksi-nilai-mahasiswa',
  templateUrl: 'koreksi-nilai-mahasiswa.component.html',
  styleUrls: ['./koreksi-nilai-mahasiswa.component.scss'],
})
export class KoreksiNilaiMahasiswaComponent implements OnInit {
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

  programs = [
    { value: 'null', viewValue: '' },
    { value: 'KER', viewValue: 'KER - Kerjasama' },
    { value: 'NON', viewValue: 'NON - Reguler Sore' },
    { value: 'REG', viewValue: 'REG - Reguler Pagi' },
    { value: 'TES', viewValue: 'TES - Program Tes' },
  ];

  prodis = [
    { value: '110', viewValue: '110 - Kedokteran' },
    { value: '111', viewValue: '111 - Pendidikan Dokter Gigi' },
    { value: '160', viewValue: '160 - Psikologi' },
    { value: '301', viewValue: '301 - Teknik Kimia' },
    { value: '303', viewValue: '303 - Teknik Sipil' },
    { value: '304', viewValue: '304 - Teknik Informatika' },
    { value: '444', viewValue: '444 - Prodi Tes' },
  ];

  jenis_ujians = [
    { value: 'uts', viewValue: 'UTS' },
    { value: 'uas', viewValue: 'UAS' },
  ];

  listData = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.listData = [
      {
        nomor: '1',
        kode: 'IF161102',
        matakuliah: 'MATEMATIKA DASAR',
        grade: 'D',
        bobot: '1.00',
        sk_koreksi: '',
      },
      {
        nomor: '2',
        kode: '	IF161103',
        matakuliah: 'PENGANTAR INFORMATIKA',
        grade: 'C',
        bobot: '2.00',
        sk_koreksi: '',
      },
      {
        nomor: '3',
        kode: 'IF161105',
        matakuliah: 'POLA PIKIR KOMPUTASIONAL',
        grade: 'C',
        bobot: '2.00',
        sk_koreksi: '',
      },
      {
        nomor: '4',
        kode: 'IF161105',
        matakuliah: 'INFRASTRUKTUR TEKNOLOGI INFORMASI',
        grade: '-',
        bobot: '0.00',
        sk_koreksi: '',
      },
    ];
  }

  manageData(module) {
    if (module) {
      this.router.navigate(['/master-data/manage-surat-pemberitahuan-ujian/' + module.kode]);
    } else {
      this.router.navigate(['/master-data/manage-surat-pemberitahuan-ujian']);
    }
  }

  ngAfterViewInit() {}
}
