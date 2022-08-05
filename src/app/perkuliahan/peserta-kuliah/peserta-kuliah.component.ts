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
    selector: 'app-master-peserta-kuliah',
    templateUrl: 'peserta-kuliah.component.html'
})

export class PesertaKuliahComponent implements OnInit {
    public dataTable: DataTable;
    public tableJadwal: TableData;

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
    ProgramKuliah = [
        { value: 'REG-0', viewValue: 'REG - Regular Pagi' },
        { value: 'REG-1', viewValue: 'NON - Regular Sore' },
        { value: 'REG-2', viewValue: 'KER - Kerjasama' },


    ];
    ProgramStudi = [
        { value: '301-0', viewValue: '301 - Teknik Kimia' },
        { value: '302-0', viewValue: '302 - Teknik Mesin' },
        { value: '303-0', viewValue: '303 - Teknik Elektro' },
        { value: '304-0', viewValue: '304 - Teknik Industri' },
        { value: '305-0', viewValue: '305 - Teknik Informatika' },
        { value: '306-0', viewValue: '306 - Teknik Sipil' },
        { value: '307-0', viewValue: '307 - Teknik Lingkungan' },
        { value: '308-0', viewValue: '308 - Teknik Arsitektur' },
        { value: '309-0', viewValue: '309 - Teknik Geodesi' },
        { value: '310-0', viewValue: '310 - Teknik Geomatika' },
        { value: '311-0', viewValue: '311 - Teknik Geofisika' },
        { value: '312-0', viewValue: '312 - Teknik Geologi' },
        { value: '313-0', viewValue: '313 - Teknik Pangan' },
        { value: '314-0', viewValue: '314 - Teknik Kimia Industri' },
        { value: '315-0', viewValue: '315 - Teknik Perawatan Mesin' },
        { value: '316-0', viewValue: '316 - Teknik Perkapalan' },
        { value: '317-0', viewValue: '317 - Teknik Perminyakan' },
        { value: '318-0', viewValue: '318 - Teknik Pertambangan' },
        { value: '319-0', viewValue: '319 - Teknik Pertanian' },
        { value: '320-0', viewValue: '320 - Teknik Petir' },
        


    ];

    constructor(
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.tableJadwal = {
            headerRow: ['No', 'Waktu', 'Kode', 'Nama', 'SKS', 'Kelas', 'Ruang', 'Nama Dosen', 'KK', 'PK', 'PP', 'TM', 'Gambar Printer', 'Gambar Printer', 'Gambar Printer', 'Gambar Printer', 'Gambar Printer', 'Gambar Printer'],
            dataRows: [
                ['1', '07:00 - 09:30', 'TI917', 'PENGANTAR TEKNIK INDUSTRI', '3', 'A', 'A-1','PROF. DR. IR. H. SUTARMAN, M.SC.','43','43','43','14','PESERTA','BAP','Pra UTS','Pra UAS','-','-'],
                ['2', '09:30 - 12:00', 'TI917', 'PENGANTAR TEKNIK INDUSTRI', '3', 'A', 'A-1','PROF. DR. IR. H. SUTARMAN, M.SC.','43','43','43','14','PESERTA','BAP','Pra UTS','Pra UAS','DHK 1','DHK 2'],
                ['3', '12:00 - 14:30', 'TI917', 'PENGANTAR TEKNIK INDUSTRI', '3', 'A', 'A-1','PROF. DR. IR. H. SUTARMAN, M.SC.','43','43','43','14','PESERTA','BAP','Pra UTS','Pra UAS','-','-'],
                ['4', '14:30 - 17:00', 'TI917', 'PENGANTAR TEKNIK INDUSTRI', '3', 'A', 'A-1','PROF. DR. IR. H. SUTARMAN, M.SC.','43','43','43','14','PESERTA','BAP','Pra UTS','Pra UAS','DHK 1','DHK 2'],

            ]
        };
    }

    manageData(module) {
        if (module) {
            this.router.navigate(['/master-data/manage-peserta-kuliah/' + module.kode]);
        } else {
            this.router.navigate(['/master-data/manage-peserta-kuliah']);
        }
    }

    ngAfterViewInit() {
       
    }
}
