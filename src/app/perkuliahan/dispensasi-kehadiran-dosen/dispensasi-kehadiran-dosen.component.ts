import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TableData } from '../../md/md-table/md-table.component';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-master-dispensasi-kehadiran-dosen',
    templateUrl: 'dispensasi-kehadiran-dosen.component.html'
})

export class DispensasiKehadiranDosenComponent implements OnInit {
    public dataTable: DataTable;

    listData = [];
    
    public tableData1: TableData;

    constructor(
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.tableData1 = {
            headerRow: [ 'No.', 'ID', 'NIM', 'Nama Dosen', 'Prodi','Perihal','Alasan','Dispensasi','Status','Cetak','Actions'],
            dataRows: [
                ['1', 'id_01', 'nim_dosen', 'nama_dosen', 'prodi_dosen', 'perihal', 'alasan', 'dispensasi', 'status'],
                ['2', 'id_02', 'nim_dosen', 'nama_dosen', 'prodi_dosen', 'perihal', 'alasan', 'dispensasi', 'status'],
                ['3', 'id_03', 'nim_dosen', 'nama_dosen', 'prodi_dosen', 'perihal', 'alasan', 'dispensasi', 'status'],
                ['4', 'id_04', 'nim_dosen', 'nama_dosen', 'prodi_dosen', 'perihal', 'alasan', 'dispensasi', 'status'],
                ['5', 'id_05', 'nim_dosen', 'nama_dosen', 'prodi_dosen', 'perihal', 'alasan', 'dispensasi', 'status'],
                ['6', 'id_06', 'nim_dosen', 'nama_dosen', 'prodi_dosen', 'perihal', 'alasan', 'dispensasi', 'status'],
            
            ]
         };
    }

    manageData(module) {
        if (module) {
            this.router.navigate(['/master-data/manage-dispensasi-kehadiran-dosen/' + module.kode]);
        } else {
            this.router.navigate(['/master-data/manage-dispensasi-kehadiran-dosen']);
        }
    }

    ngAfterViewInit() {
       
    }
}
