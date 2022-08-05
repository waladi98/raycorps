import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-master-pengajuan-0-sks',
    templateUrl: 'pengajuan-0-sks.component.html'
})

export class PengajuanSKSComponent implements OnInit {
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
            this.router.navigate(['/registrasi/pengajuan-0-sks/' + module.kode]);
        } else {
            this.router.navigate(['/registrasi/pengajuan-0-sks']);
        }
    }

    ngAfterViewInit() {
       
    }
}
