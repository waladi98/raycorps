import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-master-daftar-hadir-ujian',
    templateUrl: 'daftar-hadir-ujian.component.html'
})

export class DaftarHadirUjianComponent implements OnInit {
    public dataTable: DataTable;

    tahun_akademik = [
        {value: '20021', viewValue: 'Semester Gasal 2040 - 2041'},
        {value: '20331', viewValue: 'Semester Gasal 2033 - 2034'},
        {value: '20330', viewValue: 'Semester Transisi 2033 - 2034'},
        {value: '20304', viewValue: 'Semester Transisi 2030 - 2031'},
        {value: '20303', viewValue: 'Semester Sisipan 2030 - 2031'},
        {value: '20231', viewValue: 'Semester Gasal 2023 - 2024'},
        {value: '20221', viewValue: 'Semester Gasal 2023 - 2024'},
      ];

      jenis_ujians = [
        {value: 'uts', viewValue: 'UTS'},
        {value: 'uas', viewValue: 'UAS'},
      ];

      programs = [
        {value: 'all', viewValue: 'Tampilkan Semua'},
        {value: 'KER', viewValue: 'KER - Kerjasama'},
        {value: 'NON', viewValue: 'NON - Reguler Sore'},
        {value: 'REG', viewValue: 'REG - Reguler Pagi'},
        {value: 'TES', viewValue: 'TES - Program Tes'},
      ];

      prodis = [
        {value: 'all', viewValue: 'Tampilkan Semua'},
        {value: '110', viewValue: '110 - Kedokteran'},
        {value: '111', viewValue: '111 - Pendidikan Dokter Gigi'},
        {value: '160', viewValue: '160 - Psikologi'},
        {value: '301', viewValue: '301 - Teknik Kimia'},
        {value: '303', viewValue: '303 - Teknik Sipil'},
        {value: '304', viewValue: '304 - Teknik Informatika'},
        {value: '444', viewValue: '444 - Prodi Tes'},
      ];

    listData = [];

    constructor(
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.listData = [{
            tanggal: 'x',
            jam: '',
            ruang: '',
            kode: 'ME19044',
            matkul: 'KULIAH KERJA',
            kelas: 'A',
            sks: '1 (1)',
            mahasiswa: '14/250',
            min: '0/0',
            dosen: 'TIM JURUSAN TEKNIK MESIN',
            dhu1: '',
            dhu2: '',
            dhu3: '',
            dhu4: '4',
            dhu5: '',
            dhu6: '',
            dhu7: '',
            dhu8: '',
            dhu9: '',
            dhu10: '',
        }];
    }

    manageData(module) {
        if (module) {
            this.router.navigate(['/master-data/manage-daftar-hadir-ujian/' + module.kode]);
        } else {
            this.router.navigate(['/master-data/manage-daftar-hadir-ujian']);
        }
    }

    ngAfterViewInit() {
       
    }
}
