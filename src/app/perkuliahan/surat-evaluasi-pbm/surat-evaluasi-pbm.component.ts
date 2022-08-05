import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-master-surat-evaluasi-pbm',
    templateUrl: 'surat-evaluasi-pbm.component.html'
})

export class SuratEvaluasiPbmComponent implements OnInit {
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
            this.router.navigate(['/master-data/manage-surat-evaluasi-pbm/' + module.kode]);
        } else {
            this.router.navigate(['/master-data/manage-surat-evaluasi-pbm']);
        }
    }

    ngAfterViewInit() {
       
    }
}
