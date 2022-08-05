import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-master-pembuatan-ijazah',
    templateUrl: 'pembuatan-ijazah.component.html'
})

export class PembuatanIjazahComponent implements OnInit {
    public dataTable: DataTable;

    tahun_akademik = [
        {value: '20021', viewValue: 'Semester Gasal 2040 - 2041'},
        {value: '20331', viewValue: 'Semester Gasal 2033 - 2034'},
        {value: '20330', viewValue: 'Semester Transisi 2033 - 2034'},
        {value: '20304', viewValue: 'Semester Transisi 2030 - 2031'},
        {value: '20303', viewValue: 'Semester Sisipan 2030 - 2031'},
        {value: '20231', viewValue: 'Semester Gasal 2023 - 2024'},
        {value: '20221', viewValue: 'Semester Gasal 2023 - 2024'},
      ];

      programs = [
        {value: 'null', viewValue: ''},
        {value: 'KER', viewValue: 'KER - Kerjasama'},
        {value: 'NON', viewValue: 'NON - Reguler Sore'},
        {value: 'REG', viewValue: 'REG - Reguler Pagi'},
        {value: 'TES', viewValue: 'TES - Program Tes'},
      ];

      prodis = [
        {value: '110', viewValue: '110 - Kedokteran'},
        {value: '111', viewValue: '111 - Pendidikan Dokter Gigi'},
        {value: '160', viewValue: '160 - Psikologi'},
        {value: '301', viewValue: '301 - Teknik Kimia'},
        {value: '303', viewValue: '303 - Teknik Sipil'},
        {value: '304', viewValue: '304 - Teknik Informatika'},
        {value: '444', viewValue: '444 - Prodi Tes'},
      ];

      jenis_ujians = [
        {value: 'uts', viewValue: 'UTS'},
        {value: 'uas', viewValue: 'UAS'},
      ];

    listData = [];
    listData2 = [];

    constructor(
        private router: Router,
    ) {

    }

    ngOnInit() {
        this.listData = [{
            no: '1',
            npm: '1',
            nama_mahasiswa: '1',
            program: '1',
            tgl_ujian: '1',
            lama_studi: '1',
            lama_ta: '1',
            nilai_ta: '1',
            sks: '1',
            ipk: '1',
            yudisium: '1',
            noskyudisium: '1',
            tgl_yudisium: '1',
        }];

        this.listData2 = [{
            ikut: '1',
            tidak_ikut: '1',
            ls_tahun: '1',
            ls_terlama: '1',
            ls_ratarata: '1',
            ls_tercepat: '1',
            lt_bulan: '1',
            lt_terlama: '1',
            lt_ratarata: '1',
            lt_tercepat: '1',
            ipk_terendah: '1',
            ipk_ratarata: '1',
            ipk_tertinggi: '1',
            low: '1',
            average: '1',
            high: '1',
        }];
    }

    manageData(module) {
        if (module) {
            this.router.navigate(['/master-data/manage-jadwal-ujian/' + module.kode]);
        } else {
            this.router.navigate(['/master-data/manage-jadwal-ujian']);
        }
    }

    ngAfterViewInit() {
        $('#datatables').DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records",
            }

        });

        const table = $('#datatables').DataTable();

        // Edit record
        table.on('click', '.edit', function (e) {
            let $tr = $(this).closest('tr');
            if ($($tr).hasClass('child')) {
                $tr = $tr.prev('.parent');
            }

            var data = table.row($tr).data();
            alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
            e.preventDefault();
        });

        // Delete a record
        table.on('click', '.remove', function (e) {
            const $tr = $(this).closest('tr');
            table.row($tr).remove().draw();
            e.preventDefault();
        });

        //Like record
        table.on('click', '.like', function (e) {
            alert('You clicked on Like button');
            e.preventDefault();
        });

        $('.card .material-datatables label').addClass('form-group');
    }

}
