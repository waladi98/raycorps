import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-master-jadwal-praktikum-mahasiswa',
    templateUrl: 'jadwal-praktikum-mahasiswa.component.html'
})

export class JadwalPraktikumMahasiswaComponent implements OnInit {
    public dataTable: DataTable;

    listData = [];

    constructor(
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.listData = [];
    }

    manageData(module) {
        if (module) {
            this.router.navigate(['/master-data/manage-jadwal-praktikum-mahasiswa/' + module.kode]);
        } else {
            this.router.navigate(['/master-data/manage-jadwal-praktikum-mahasiswa']);
        }
    }

    ngAfterViewInit() {
       
    }
}
