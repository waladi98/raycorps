import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-master-rekap-perwalian-per-prodi',
    templateUrl: 'rekap-perwalian-per-prodi.component.html'
})

export class RekapPerwalianPerProdiComponent implements OnInit {
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
            prodi: '110',
            angkatan: '20191',
            aktif: 'aktif',
            sks: '3',
            dpp: '2',
            dispensasi: '2',
            krs: '2',
            proses: '2',
            pria: '12',
            wanita: '12',
        }];
    }

    manageData(module) {
        if (module) {
            this.router.navigate(['/registrasi/rekap-perwalian-per-mk/' + module.kode]);
        } else {
            this.router.navigate(['/registrasi/rekap-perwalian-per-mk']);
        }
    }

    ngAfterViewInit() {
       
    }
}
