import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-master-penyetaraan-nilai',
  templateUrl: 'penyetaraan-nilai.component.html',
})
export class PenyetaraanNilaiComponent implements OnInit {
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

  listData = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.listData = [
      {
        no: '1',
        kode: 'IF161301',
        matakuliah: 'ALGORITMA & PEMROGRAMAN',
        sks: '3',
        nilai: 'B',
        bobot: '3.00',
        tahun_akademik: '20181',
      },
      {
        no: '2',
        kode: 'IF165107',
        matakuliah: 'AGAMA',
        sks: '2',
        nilai: 'A',
        bobot: '4.00',
        tahun_akademik: '20201',
      },
    ];
  }

  manageData(module) {
    if (module) {
      this.router.navigate(['/master-data/manage-data-akademik-mahasiswa/' + module.kode]);
    } else {
      this.router.navigate(['/master-data/manage-data-akademik-mahasiswa']);
    }
  }

  ngAfterViewInit() {}
}
