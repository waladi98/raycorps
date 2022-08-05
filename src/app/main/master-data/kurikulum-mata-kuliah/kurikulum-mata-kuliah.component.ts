import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { finalize, map, takeUntil } from 'rxjs/operators';
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState
} from '@angular/cdk/layout';
declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-master-kurikulum-mata-kuliah',
    templateUrl: 'kurikulum-mata-kuliah.component.html'
})

export class KurikulumMataKuliahComponent implements OnInit {
    public dataTable: DataTable;

    isLoadingTable = true;

    listData = {
        header: [],
        field: [],
        action: [],
        data: []
    };

    listDataMkSetara = {
        header: [],
        field: [],
        data: []
    };

    listDataKurikulum = {
        header: [],
        field: [],
        data: []
    };

    tabInfo = {
        mk_setara: {
            status: false,
            data: null
        },
        kurikulum: {
            status: false,
            data: null
        }
    }

    isScreenSmall: boolean;

    listTab=[{
        nama:"Mata Kuliah"
    },
    {
        nama:"MK Setara"
    },
    {
        nama:"Kurikulum"
    },
    {
        nama:"Konsenstrasi"
    },
    {
        nama:"Jenis Mata Kuliah"
    },
    {
        nama:"Pilihan Wajib"
    },
    {
        nama:"Jenis Kurikulum"
    },
    {
        nama:"Nilai"
    },
    {
        nama:"Max SKS"
    },
    {
        nama:"Paket Mata Kuliah"
    },
    {
        nama:"Predikat"
    }]


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
        this.changeTab(0);
    }

    manageData(module) {
        if (module) {
            this.router.navigate(['/master-data/manage-kurikulum-mata-kuliah/' + module.kode]);
        } else {
            this.router.navigate(['/master-data/manage-kurikulum-mata-kuliah']);
        }
    }

    changeTab(index) {
        if (index == 0) {
            this.inisialisasiDataMatakuliah();
        }else if (index == 1){
            this.inisialisasiDataMKSetara();
        }else if (index == 2){
            this.inisialisasiDataKurikulum();
        }else if (index == 3){
            this.inisialisasiDataKonsesntrasi();
        }else if (index == 4){
            this.inisialisasiDataJenisMataKuliah();
        }else if (index == 5){
            this.inisialisasiDataPilihanWajib();
        }else if (index == 6){
            this.inisialisasiDataJenisKurikulum();
        }else if (index == 7){
            this.inisialisasiDataJenisNilai();
        }else if (index == 8){
            this.inisialisasiDataMaxSKS();
        }else if (index == 9){
            // this.inisialisasiDataJenisNilai();
        }else if (index == 10){
            this.inisialisasiDataPredikat();
        }
    }

    destroyTable(index) {
        if (this.tabInfo.mk_setara.status && index != 1) {
            this.tabInfo.mk_setara.data.destroy();
        }

        if (this.tabInfo.kurikulum.status && index != 2) {
            this.tabInfo.kurikulum.data.destroy();
        }
    }

    inisialisasiDataMatakuliah() {
        this.listData = {
            header: [
                {
                    label: '#',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'no',
                },
                {
                    label: 'Sesi',
                    class: 'text-sm text-left border border-black-300 bg-gray-400 w-30',
                    field: 'sesi',
                },
                {
                    label: 'Kode',
                    class: 'text-sm text-left border border-black-300 bg-gray-400 w-30',
                    field: 'kode',
                },
                {
                    label: 'Nama',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'mata_kuliah',
                },
                {
                    label: 'SKS',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'sks',
                },
                {
                    label: 'Wajib',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'wajib',
                },
                {
                    label: 'Prasyarat',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'prasyarat',
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
                    field: 'sesi',
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
                    field: 'sks',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'wajib',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'prasyarat',
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

    inisialisasiDataMKSetara() {
        this.listData = {
            header: [
                {
                    label: '#',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'no',
                },
                {
                    label: 'Kode MK',
                    class: 'text-sm text-left border border-black-300 bg-gray-400 w-30',
                    field: 'kode',
                },
                {
                    label: 'Nama',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'mata_kuliah',
                },
                {
                    label: 'SKS',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'sks',
                },
                {
                    label: 'Ekivalensi',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'ekivalensi',
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
                    field: 'sks',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'ekivalensi',
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

    inisialisasiDataKurikulum() {
        this.listData = {
            header: [
                {
                    label: '#',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'no',
                },
                {
                    label: 'Kode',
                    class: 'text-sm text-left border border-black-300 bg-gray-400 w-30',
                    field: 'kode',
                },
                {
                    label: 'Kurikulum',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'kurikulum',
                },
                {
                    label: 'Sesi',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'sesi',
                },
                {
                    label: 'Jumlah/ Tahun',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-30',
                    field: 'jml',
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
                    field: 'kurikulum',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'jml',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'jml',
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

    inisialisasiDataKonsesntrasi() {
        this.listData = {
            header: [
                {
                    label: '#',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'no',
                },
                {
                    label: 'Kode',
                    class: 'text-sm text-left border border-black-300 bg-gray-400 w-30',
                    field: 'kode',
                },
                {
                    label: 'Nama',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'nama',
                },
                {
                    label: 'Keterangan',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'keterangan',
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

    inisialisasiDataJenisMataKuliah() {
        this.listData = {
            header: [
                {
                    label: '#',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'no',
                },
                {
                    label: 'Urutan',
                    class: 'text-sm text-left border border-black-300 bg-gray-400 w-30',
                    field: 'urutan',
                },
                {
                    label: 'Singkatan',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'singkatan',
                },
                {
                    label: 'Jenis Matakuliah',
                    class: 'text-sm text-center border border-black-300 bg-gray-400',
                    field: 'jenis_mata_kuliah',
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
                    field: 'urutan',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'singkatan',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'jenis_mata_kuliah',
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

    inisialisasiDataPilihanWajib() {

        this.listData = {
            header: [
                {
                    label: '#',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'no',
                },
                {
                    label: 'Kode',
                    class: 'text-sm text-left border border-black-300 bg-gray-400 w-30',
                    field: 'kode',
                },
                {
                    label: 'Nama',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'nama',
                },
                {
                    label: 'KP',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'kp',
                },
                {
                    label: 'TA',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'ta',
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
                    field: 'kp',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'ta',
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

    inisialisasiDataJenisKurikulum() {

        this.listData = {
            header: [
                {
                    label: '#',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'no',
                },
                {
                    label: 'Kode',
                    class: 'text-sm text-left border border-black-300 bg-gray-400 w-20',
                    field: 'kode',
                },
                {
                    label: 'Nama',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'nama',
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

    inisialisasiDataJenisNilai() {

        this.listData = {
            header: [
                {
                    label: '#',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'no',
                },
                {
                    label: 'Nilai',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'nilai',
                },
                {
                    label: 'Bobot',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'bobot',
                },
                {
                    label: 'Lulus',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'lulus',
                },
                {
                    label: 'Batas Bawah',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'batas_bawah',
                },
                {
                    label: 'Batas Atas',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'batas_atas',
                },
                {
                    label: 'Max SKS',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'max_sks',
                },
                {
                    label: 'Hitung Dalam IPK',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'hitung_dalam_ipk',
                },
                {
                    label: 'Deskripsi',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'deskripsi',
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
                    field: 'nilai',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'bobot',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'lulus',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'batas_bawah',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'batas_atas',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'max_sks',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'hitung_dalam_ipk',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'deskripsi',
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

    inisialisasiDataMaxSKS() {

        this.listData = {
            header: [
                {
                    label: '#',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'no',
                },
                {
                    label: 'Dari IPS',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'dari_ips',
                },
                {
                    label: 'Sampai IPS',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'sampai_ips',
                },
                {
                    label: 'Max SKS',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'max_sks',
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
                    field: 'dari_ips',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'sampai_ips',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'max_sks',
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

    inisialisasiDataPredikat() {

        this.listData = {
            header: [
                {
                    label: '#',
                    class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
                    field: 'no',
                },
                {
                    label: 'IPK Min',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'ipk_min',
                },
                {
                    label: 'IPK Max',
                    class: 'text-sm text-left border border-black-300 bg-gray-400',
                    field: 'ipk_max',
                },
                {
                    label: 'Predikat',
                    class: 'text-sm text-center border border-black-300 bg-gray-400',
                    field: 'predikat',
                },
                {
                    label: 'Keterangan',
                    class: 'text-sm text-center border border-black-300 bg-gray-400',
                    field: 'keterangan',
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
                    field: 'ipk_min',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'ipk_max',
                },
                {
                    class: 'text-left border border-black-300',
                    field: 'predikat',
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

    // inisialisasiMkSetara() {
    //     this.listDataMkSetara = {
    //         header: [
    //             {
    //                 kolom: [{
    //                     label: 'No',
    //                     class: 'text-sm text-center w-20',
    //                     field: '',
    //                 },
    //                 {
    //                     label: 'Kode MK',
    //                     class: 'text-sm text-center w-30',
    //                     field: '',
    //                 },
    //                 {
    //                     label: 'Nama',
    //                     class: 'text-sm text-left',
    //                     field: '',
    //                 },
    //                 {
    //                     label: 'SKS',
    //                     class: 'text-sm text-center w-30',
    //                     field: '',
    //                 },
    //                 {
    //                     label: 'Ekivalensi',
    //                     class: 'text-sm text-center w-30',
    //                     field: '',
    //                 }]
    //             }
    //         ],
    //         field: [
    //             {
    //                 class: '',
    //                 field: 'no',
    //             },
    //             {
    //                 class: '',
    //                 field: 'kode_mk',
    //             },
    //             {
    //                 class: '',
    //                 field: 'nama',
    //             },
    //             {
    //                 class: '',
    //                 field: 'sks',
    //             },
    //             {
    //                 class: '',
    //                 field: 'ekivalensi',
    //             }],
    //         data: []
    //     };
    //     var mk_setara = setInterval(() => {
    //         var myElement = document.querySelector('#mk-setara');
    //         if (myElement) {
    //             this.inisialisasiTableMkSetara();
    //             clearInterval(mk_setara);
    //         }
    //     }, 1000);
    // }

    // inisialisasiTableMkSetara() {
    //     $('#mk-setara').DataTable({
    //         "pagingType": "full_numbers",
    //         "lengthMenu": [
    //             [10, 25, 50, -1],
    //             [10, 25, 50, "All"]
    //         ],
    //         responsive: true,
    //         language: {
    //             search: "_INPUT_",
    //             searchPlaceholder: "Search records",
    //         }

    //     });

    //     this.tabInfo.mk_setara.data = $('#mk-setara').DataTable();

    //     // Edit record
    //     this.tabInfo.mk_setara.data.on('click', '.edit', function (e) {
    //         let $tr = $(this).closest('tr');
    //         if ($($tr).hasClass('child')) {
    //             $tr = $tr.prev('.parent');
    //         }

    //         var data = this.tabInfo.mk_setara.data.row($tr).data();
    //         alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
    //         e.preventDefault();
    //     });

    //     // Delete a record
    //     this.tabInfo.mk_setara.data.on('click', '.remove', function (e) {
    //         const $tr = $(this).closest('tr');
    //         this.tabInfo.mk_setara.data.row($tr).remove().draw();
    //         e.preventDefault();
    //     });

    //     //Like record
    //     this.tabInfo.mk_setara.data.on('click', '.like', function (e) {
    //         alert('You clicked on Like button');
    //         e.preventDefault();
    //     });

    //     $('.card .material-mk-setara label').addClass('form-group');

    //     this.tabInfo.mk_setara.status = true;
    // }

    // inisialisasiKurikulum() {
    //     this.listDataKurikulum = {
    //         header: [
    //             {
    //                 kolom: [{
    //                     label: 'Kode',
    //                     class: 'text-sm text-center w-20',
    //                     field: '',
    //                 },
    //                 {
    //                     label: 'Kurikulum',
    //                     class: 'text-sm text-left',
    //                     field: '',
    //                 },
    //                 {
    //                     label: 'Sesi',
    //                     class: 'text-sm text-center w-30',
    //                     field: '',
    //                 },
    //                 {
    //                     label: 'Jumlah/ Tahun',
    //                     class: 'text-sm text-center w-30',
    //                     field: '',
    //                 },
    //                 {
    //                     label: 'NA',
    //                     class: 'text-sm text-center w-30',
    //                     field: '',
    //                 }]
    //             }
    //         ],
    //         field: [
    //             {
    //                 class: '',
    //                 field: 'kode',
    //             },
    //             {
    //                 class: '',
    //                 field: 'kurikulum',
    //             },
    //             {
    //                 class: '',
    //                 field: 'sesi',
    //             },
    //             {
    //                 class: '',
    //                 field: 'jumlah_tahun',
    //             },
    //             {
    //                 class: '',
    //                 field: 'na',
    //             }],
    //         data: []
    //     };
    //     var kurikulum = setInterval(() => {
    //         var myElement = document.querySelector('#kurikulum');
    //         if (myElement) {
    //             this.inisialisasiTableKurikulum();
    //             clearInterval(kurikulum);
    //         }
    //     }, 1000);
    // }

    // inisialisasiTableKurikulum() {
    //     $('#kurikulum').DataTable({
    //         "pagingType": "full_numbers",
    //         "lengthMenu": [
    //             [10, 25, 50, -1],
    //             [10, 25, 50, "All"]
    //         ],
    //         responsive: true,
    //         language: {
    //             search: "_INPUT_",
    //             searchPlaceholder: "Search records",
    //         }

    //     });

    //     this.tabInfo.kurikulum.data = $('#kurikulum').DataTable();

    //     // Edit record
    //     this.tabInfo.kurikulum.data.on('click', '.edit', function (e) {
    //         let $tr = $(this).closest('tr');
    //         if ($($tr).hasClass('child')) {
    //             $tr = $tr.prev('.parent');
    //         }

    //         var data = this.tabInfo.kurikulum.data.row($tr).data();
    //         alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
    //         e.preventDefault();
    //     });

    //     // Delete a record
    //     this.tabInfo.kurikulum.data.on('click', '.remove', function (e) {
    //         const $tr = $(this).closest('tr');
    //         this.tabInfo.kurikulum.data.row($tr).remove().draw();
    //         e.preventDefault();
    //     });

    //     //Like record
    //     this.tabInfo.kurikulum.data.on('click', '.like', function (e) {
    //         alert('You clicked on Like button');
    //         e.preventDefault();
    //     });

    //     $('.card .material-kurikulum label').addClass('form-group');

    //     this.tabInfo.kurikulum.status = true;
    // }

    ngAfterViewInit() {

    }

    loadData(page: number): void {
        this.isLoadingTable = true;
        this.dataService
            .getRequest<any>('/kurikulum/master/mataKuliah', {

            })
            .pipe(
                map((response) => response),
                finalize(() =>
                    setTimeout(() => (this.isLoadingTable = false), 1000)
                )
            )
            .subscribe(
                (response) => {
                    // this.data = pagination.aData;
                    // this.length = Number(pagination.iTotalRecords);
                },
                (error) => {
                    console.log(error);
                }
            );
    }


}
