import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-master-monitoring-kuliah',
    templateUrl: 'monitoring-kuliah.component.html'
})

export class MonitoringKuliahComponent implements OnInit {
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
            this.router.navigate(['/master-data/manage-monitoring-kuliah/' + module.kode]);
        } else {
            this.router.navigate(['/master-data/manage-monitoring-kuliah']);
        }
    }

    ngAfterViewInit() {
       
    }
}
