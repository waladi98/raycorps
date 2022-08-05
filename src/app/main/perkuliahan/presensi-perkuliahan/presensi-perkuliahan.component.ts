import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TableData } from '../../../md/md-table/md-table.component';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-master-presensi-perkuliahan',
    templateUrl: 'presensi-perkuliahan.component.html'
})

export class PresensiPerkuliahanComponent implements OnInit {
    public dataTable: DataTable;
    public tableData1: TableData;

    listData = [];
    TahunAkademik = [
        { value: '20192-0', viewValue: '20192 - Semester Genap 2019 - 2020' },
        { value: '20191-0', viewValue: '20191 - Semester Ganjil 2019 - 2020' },
        { value: '20190-0', viewValue: '20190 - Semester Genap 2018 - 2019' },
        { value: '20189-0', viewValue: '20189 - Semester Ganjil 2018 - 2019' },
        { value: '20188-0', viewValue: '20188 - Semester Genap 2017 - 2018' },
        { value: '20187-0', viewValue: '20187 - Semester Ganjil 2017 - 2018' },
        { value: '20186-0', viewValue: '20186 - Semester Genap 2016 - 2017' },
        { value: '20185-0', viewValue: '20185 - Semester Ganjil 2016 - 2017' },
        { value: '20184-0', viewValue: '20184 - Semester Genap 2015 - 2016' },
        { value: '20183-0', viewValue: '20183 - Semester Ganjil 2015 - 2016' },
        { value: '20182-0', viewValue: '20182 - Semester Genap 2014 - 2015' },
        { value: '20181-0', viewValue: '20181 - Semester Ganjil 2014 - 2015' },
    ];
    Dosen = [
        { value: 'IF121-0', viewValue: 'IF121 - SALI ALAS MAJAPAHIT, S.ST.,M.KOM.,' },
        { value: 'IF122-0', viewValue: 'IF122 - ALEXANDER, S.ST.,M.KOM.,' },
        { value: 'IF123-0', viewValue: 'IF123 - ALBERT EINSTAIN, S.ST.,M.KOM.,' },
        { value: 'IF124-0', viewValue: 'IF124 - NICOLA TESLA, S.ST.,M.KOM.,' },
        { value: 'IF125-0', viewValue: 'IF125 - ELON MUSK, S.ST.,M.KOM.,' },
    ];
    Matkul = [
        { value: 'IF164106-0', viewValue: '(K) - IF164106 - PENGAKSESAN BASIS DATA - D' },
    ];
    tablePresensi: { headerRow: string[]; dataRows: string[][]; };



    constructor(
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.tablePresensi = {
            headerRow: ['Ke', 'Tanggal', 'Dosen', 'Jumlah', 'Hadir','Presentasi', 'Presensi', 'Cetak', 'Hapus'],
            dataRows: [
                ['1', '12/12/2019', 'IF121 - SALI ALAS MAJAPAHIT, S.ST.,M.KOM.,', '38', '24', '63.16 %', '', '', ''],
                


            ]
        };
    }

    manageData(module) {
        if (module) {
            this.router.navigate(['/master-data/manage-presensi-perkuliahan/' + module.kode]);
        } else {
            this.router.navigate(['/master-data/manage-presensi-perkuliahan']);
        }
    }

    ngAfterViewInit() {

    }
}
