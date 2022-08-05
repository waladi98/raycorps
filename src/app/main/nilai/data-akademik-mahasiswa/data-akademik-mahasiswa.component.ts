import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-master-data-akademik-mahasiswa',
  templateUrl: 'data-akademik-mahasiswa.component.html',
  styleUrls: ['./data-akademik-mahasiswa.component.scss'],
})
export class DataAkademikMahasiswaComponent implements OnInit {
  public focus;
  public dataTable: DataTable;

  listData = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.listData = [
      {
        tahun_akademik: 'Ganjil 2033/2034',
        npm: '183040093',
        nama_mahasiswa: 'MAYA NINDYA NUGRAHINI',
        prodi: '304',
        status: 'Aktif',
        kartu_uts: 'remove',
        kartu_uas: 'remove',
        sunting: 'edit',
      },
    ];
  }

  ngAfterViewInit() {}
}
