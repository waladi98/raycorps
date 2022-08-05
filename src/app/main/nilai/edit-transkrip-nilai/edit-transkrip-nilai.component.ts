import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: 'app-master-edit-transkrip-nilai',
  templateUrl: 'edit-transkrip-nilai.component.html',
})
export class EditTranskripNilaiComponent implements OnInit {
  public dataTable: DataTable;

  prodis = [
    { value: '110', viewValue: '110 - Kedokteran' },
    { value: '111', viewValue: '111 - Pendidikan Dokter Gigi' },
    { value: '160', viewValue: '160 - Psikologi' },
    { value: '301', viewValue: '301 - Teknik Kimia' },
    { value: '303', viewValue: '303 - Teknik Sipil' },
    { value: '304', viewValue: '304 - Teknik Informatika' },
    { value: '444', viewValue: '444 - Prodi Tes' },
  ];

  listData = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.listData = [
      {
        id: '30891',
        tanggal: '28-10-2019',
        jam: '08:00-10:00',
        ruang: 'SB304:22,SB305:22',
        kode: 'ME19103',
        matkul: 'BAHASA INDONESIA',
        kelas: 'A',
        sks: '2 (2)',
        mahasiswa: '44/44',
        min: '0/14',
        dosen: 'DR. SUPIAN, S.Pd., M.Pd.',
        na: false,
      },
    ];
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
      pagingType: 'full_numbers',
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'All'],
      ],
      responsive: true,
      language: {
        search: '_INPUT_',
        searchPlaceholder: 'Search records',
      },
    });

    const table = $('#datatables').DataTable();

    // Edit record
    table.on('click', '.edit', function (e) {
      let $tr = $(this).closest('tr');
      if ($($tr).hasClass('child')) {
        $tr = $tr.prev('.parent');
      }

      var data = table.row($tr).data();
      alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + "'s row.");
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
