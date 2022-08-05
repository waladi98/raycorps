import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { finalize, map, takeUntil } from 'rxjs/operators';
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState
} from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-master-ruang',
    templateUrl: 'ruang.component.html'
})

export class RuangComponent implements OnInit {
    public dataTable: DataTable;

	listData = {
        header: [],
        field: [],
        action: [],
        data: []
    };
    isLoadingTable = true;
    length = 100;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    isScreenSmall: boolean;

    constructor(
        private router: Router,
        private dataService: DataService,
        public breakpointObserver: BreakpointObserver,
    ) {
        this.breakpointObserver
            .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.isScreenSmall = true;
                    console.log(
                        'Matches small viewport or handset in portrait mode'
                    );
                } else {
                    this.isScreenSmall = false;
                }
            });
    }
	
    ngOnInit() {
        this.inisialisasiTable();
        this.loadData(0);
    }
	
	manageData(module) {
		if (module) {
			this.router.navigate(['/master-data/manage-ruang/' + module.kode]);
		} else {
			this.router.navigate(['/master-data/manage-ruang']);
		}
    }
	
	ngAfterViewInit() {
    }


	inisialisasiTable() {
        this.listData = {
			header: [
                {
                    label: 'No',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'no',
                },
                {
                    label: 'Kode',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
                    field: 'kode',
                },
                {
                    label: 'Nama',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'nama',
                },
                {
                    label: 'Prodi',
                    class: 'text-sm text-center border border-black-300 bg-gray-400',
                    field: 'prodi',
                },
                {
                    label: 'Ruang Kelas',
                    class: 'text-sm text-center border border-black-300 bg-gray-400',
                    field: 'ruang_kelas',
                },
                {
                    label: 'Kapasitas Kuliah',
                    class: 'text-sm text-center border border-black-300 bg-gray-400',
                    field: 'kapasitas_kuliah',
                },
                {
                    label: 'Untuk USM',
                    class: 'text-sm text-center border border-black-300 bg-gray-400',
                    field: 'untuk_usm',
                },
                {
                    label: 'Kapasitas Ujian',
                    class: 'text-sm text-center border border-black-300 bg-gray-400',
                    field: 'kapasitas_ujian',
                },
                {
                    label: 'Keterangan',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'keterangan',
                },
                {
                    label: 'NA',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'na',
                },
                {
                    label: 'Aksi',
                    class: 'text-sm disabled-sorting text-center border border-black-300 bg-gray-400 w-20',
                    field: 'action',
                }
            ],
            field: [
                {
                    class: 'text-center border border-black-300',
                    field: 'no',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'kode',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'ruangan',
                },                
				{
                    class: 'text-left border border-black-300',
                    field: 'kode_prodi',
                },				
				{
                    class: 'text-left border border-black-300',
                    field: 'kode_gedung',
                },				
				{
                    class: 'text-left border border-black-300',
                    field: 'kapasitas',
                },				
				{
                    class: 'text-left border border-black-300',
                    field: 'untuk_usm',
                },			
				{
                    class: 'text-left border border-black-300',
                    field: 'kapasitas_ujian',
                },			
				{
                    class: 'text-left border border-black-300',
                    field: 'keterangan',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'aktif',
                },
                {
                    class: 'text-center border border-black-300',
                    field: 'action',
                }],
            action: [{
                action_name: "manageData",
                icon: "fa fa-edit",
            }],
            data: []
        };
    }

    onChangePaginator(event: PageEvent): void {
        this.pageSize = event.pageSize;
        console.log(event);
        this.loadData(event.pageIndex + 1);
    }



    loadData(page: number): void {
        this.isLoadingTable = true;
        this.dataService
            .getPostRequest<any>('/sarpra/master/ruangan', {
                offset: page,
                limit: this.pageSize
            })
            .pipe(
                map((response) => response),
                finalize(() =>
                    setTimeout(() => (this.isLoadingTable = false), 1000)
                )
            )
            .subscribe(
                (response) => {
                    this.listData.data = response.result;
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}
