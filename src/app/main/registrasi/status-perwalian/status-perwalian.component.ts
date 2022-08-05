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
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-master-status-perwalian',
    templateUrl: 'status-perwalian.component.html'
})

export class StatusPerwalianComponent implements OnInit {
    public dataTable: DataTable;

    listDataDosen = [];

    form: FormGroup;

    listDataMahasiswa;

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

    listMahasiswaData=[{
        npm:'112233',
        nama:'Syamsudin Syaeful Ima'
    }]

    constructor(
        private formBuilder: FormBuilder,
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
        this.form = this.formBuilder.group({
            kode: [null],
            kode_dosen: [null],
            status: [null],
            home_base: [null],
        });

        this.inisialisasiTable();
        this.loadData(0);
    }

    doSearchMahasiswa(searchValue: string) {
        if (searchValue.length > 2) {
            // this.listDataMahasiswa = this.searchMahasiswa(searchValue).pipe(map(res => res))
        }
    }

    searchMahasiswa(search) {
        return this.listMahasiswaData.filter(item => item.npm.indexOf(search) !== -1);
    }

    changeMahasiswa(data) {
        this.form.get('data_mahasiswa').setValue(data);
        this.form.get('npm_id').setValue(data.id);
        this.form.get('npm').setValue(data.nama);
    }

    manageData(module) {
        // if (module) {
        //     this.router.navigate(['/master-data/manage-status-perwalian/' + module.kode]);
        // } else {
        //     this.router.navigate(['/master-data/manage-status-perwalian']);
        // }
    }

    ngAfterViewInit() {

    }

    inisialisasiTable() {
        this.listData = {
            header: [
                {
                    label: '#',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'no',
                },
                {
                    label: 'NPM',
                    class: 'text-sm text-left border border-black-300 bg-gray-400 w-30',
                    field: 'kode',
                },
                {
                    label: 'Nama Mahasiswa',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'nama',
                },
                {
                    label: 'Program',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'kode_prodi',
                },
                {
                    label: 'Angkatan',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'status',
                },
                {
                    label: 'Total SKS',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'nip',
                },
                {
                    label: 'IPK',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'nip',
                },
                {
                    label: 'Status',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'nip',
                },
                {
                    label: 'Tgl Perwalian',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'nip',
                },
                {
                    label: 'Jml MK',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'nip',
                },
                {
                    label: 'Jml SKS',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'nip',
                },
                {
                    label: 'Kontak',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'nip',
                },
                {
                    label: 'NA',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'aktif',
                },
                {
                    label: 'Aksi',
                    class: 'text-sm disabled-sorting text-center w-20 border border-black-300 bg-gray-400',
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
                    field: 'nama',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'kode_prodi',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'aktif',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'aktif',
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
            .getPostRequest<any>('/master/status-perwalian', {
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
