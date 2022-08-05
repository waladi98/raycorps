import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-master-pengisian-nilai',
  templateUrl: 'pengisian-nilai.component.html',
  styleUrls: ['./pengisian-nilai.component.scss'],
})
export class PengisianNilaiComponent implements OnInit {
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

  dosen = [
    { value: 'IF306', viewValue: 'ACEP HENDRA, ST.,  - IF306' },
    { value: 'IF222', viewValue: 'ADE SUKENDAR,ST.,MT , ST.,MT. - IF222' },
    { value: 'PL166', viewValue: 'AHMAD MULYADI, ST., MT.,  - PL166' },
    { value: 'UV438', viewValue: 'ANGGA MAULANA,SS.,M.PD,  - UV438' },
    { value: 'IF224', viewValue: 'ANGGORO ARI NURCAHYO. ST.,M.KOM, ST., M.KOM - IF224' },
    { value: 'IF309', viewValue: 'ASEP SOMANTRI ST.,MT, ST., MT. - IF309' },
    { value: 'EL175', viewValue: 'ASTRI WIDIASTUTI HASBIAH.,ST.,M.ENV,  - EL175' },
    { value: 'EL147', viewValue: 'DENI RUSMAYA, ST., MT.,  - EL147' },
    { value: 'PL006', viewValue: 'DR. IR. H. BUDI HERI PIRNGADI,MT,  - PL006' },
    { value: 'EI020', viewValue: 'DR. IR. H. CHEVY HERLI SUMERLI, MT,  - EI020' },
    { value: 'EP009', viewValue: 'DR. IR. H. DEDE ZAINAL ARIEF, M.SC.,  - EP009' },
  ];

  matakuliah = [
    { value: 'IF164304', viewValue: '(K) - IF164304 - REKAYASA PERANGKAT LUNAK (C)' },
    { value: 'IF164304', viewValue: '(K) - IF164304 - REKAYASA PERANGKAT LUNAK (L)' },
    { value: 'IF164504', viewValue: '(K) - IF164504 - PEMBANGUNAN SISTEM BERORIENTASI OBJEK (M)' },
    { value: 'IF164505', viewValue: '(K) - IF164505 - PEMROGRAMAN SISTEM INTERAKTIF (A)' },
    { value: 'IF164505', viewValue: '(K) - IF164505 - PEMROGRAMAN SISTEM INTERAKTIF (N)' },
  ];

  listData = [];

  dataNilaiMahasiswa = [
    {
      no: 1,
      npm: 163010015,
      namaMahasiswa: 'HADI NURSYAMSI DARMAWAN',
      tugas_mandiri_1: '0',
      tugas_mandiri_2: '0',
      tugas_mandiri_3: '0',
      tugas_mandiri_4: '0',
      tugas_mandiri_5: '0',
      prestasi: '0',
      uts: '0',
      uas: '0',
      praktikum: '0',
      nilai_akhir_angka: '14',
      nilai_akhir_huruf: 'E',
      status_krs: 'Aktif',
    },
    {
      no: 2,
      npm: 133040257,
      namaMahasiswa: 'MUHAMAD IMAN',
      tugas_mandiri_1: '0',
      tugas_mandiri_2: '0',
      tugas_mandiri_3: '0',
      tugas_mandiri_4: '0',
      tugas_mandiri_5: '0',
      prestasi: '0',
      uts: '0',
      uas: '0',
      praktikum: '0',
      nilai_akhir_angka: '14',
      nilai_akhir_huruf: 'E',
      status_krs: 'Aktif',
    },
  ];

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
