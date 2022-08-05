import { Component, OnInit } from '@angular/core';
import { TableData } from '../../../../md/md-table/md-table.component';

@Component({
  selector: 'app-jadwal-kuliah',
  templateUrl: './jadwal-kuliah.component.html',
  styleUrls: ['./jadwal-kuliah.component.scss'],
})
export class JadwalKuliahComponent implements OnInit {
  // public dataTable: DataTable;
  public tableJadwal: TableData;
  public tableJadwalSementara: TableData;

  tahun_akademik = [
    { value: '20021', viewValue: 'Semester Gasal 2040 - 2041' },
    { value: '20331', viewValue: 'Semester Gasal 2033 - 2034' },
    { value: '20330', viewValue: 'Semester Transisi 2033 - 2034' },
    { value: '20304', viewValue: 'Semester Transisi 2030 - 2031' },
    { value: '20303', viewValue: 'Semester Sisipan 2030 - 2031' },
    { value: '20231', viewValue: 'Semester Gasal 2023 - 2024' },
    { value: '20221', viewValue: 'Semester Gasal 2023 - 2024' },
  ];

  programs = [
    { value: 'null', viewValue: '' },
    { value: 'KER', viewValue: 'KER - Kerjasama' },
    { value: 'NON', viewValue: 'NON - Reguler Sore' },
    { value: 'REG', viewValue: 'REG - Reguler Pagi' },
    { value: 'TES', viewValue: 'TES - Program Tes' },
  ];

  prodis = [
    { value: '110', viewValue: '110 - Kedokteran' },
    { value: '111', viewValue: '111 - Pendidikan Dokter Gigi' },
    { value: '160', viewValue: '160 - Psikologi' },
    { value: '301', viewValue: '301 - Teknik Kimia' },
    { value: '303', viewValue: '303 - Teknik Sipil' },
    { value: '304', viewValue: '304 - Teknik Informatika' },
    { value: '444', viewValue: '444 - Prodi Tes' },
  ];

  hari = [
    { value: 'minggu', viewValue: 'Minggu' },
    { value: 'senin', viewValue: 'Senin' },
    { value: 'selasa', viewValue: 'Selasa' },
    { value: 'rabu', viewValue: 'Rabu' },
    { value: 'kamis', viewValue: 'Kamis' },
    { value: 'jumat', viewValue: "Jum'at" },
    { value: 'sabtu', viewValue: 'Sabtu' },
    { value: 'na', viewValue: 'N/A' },
  ];

  jenis_jadwal = [
    { value: 'K', viewValue: 'K - Kuliah' },
    { value: 'P', viewValue: 'P - Praktikum' },
    { value: 'R', viewValue: 'R - Responsi' },
  ];

  ruang_kuliah = [
    { value: 'blended', viewValue: 'Blended - Blended Learning' },
    { value: 'full', viewValue: 'Full - Fully Online' },
    { value: 'L2.OLC', viewValue: 'L2.OLC - Ruang Optima Language Center' },
    { value: 'L4LabPer', viewValue: 'L4LabPer - Laboratorium Perpustakaan' },
  ];

  listData = [];
  listDataJadwalSementara = [];
  constructor() {}

  ngOnInit(): void {
    this.listData = [
      {
        waktu: '07:00-08:40',
        ruang: 'SB 408',
        kode: 'ME19103',
        nama: 'BAHASA INDONESIA',
        sks: '2',
        kelas: 'A',
        nama_dosen: 'DR. SUPIAN, S.Pd., M.Pd.',
        kk: '44',
        pk: '0',
        pp: '44',
        fp: ' ',
        pres: '14',
        lms: 'X',
        wag: 'X',
      },
    ];

    this.listDataJadwalSementara = [
      {
        kode: 'ME19103',
        nama: 'BAHASA INDONESIA',
        smst: '1',
        sks: '2',
        kk: '0',
        pk: '0',
        pp: '0',
        jk: '3 / 136',
        estimasi: '0 / 0',
        teralokasi: '136 / 136',
      },
    ];

    this.tableJadwal = {
      headerRow: ['Ubah', 'Waktu', 'Ruang', 'Kode', 'Nama Mahasiswa', 'SKS', 'Pra', 'Kelas', 'Serial', 'Tambah', 'Nama Dosen', 'KK', 'PK', 'PP', 'Hitung', 'FP', 'Pres', 'LMS', 'WAG', 'Hapus', 'Reset'],
      dataRows: [
        ['', '07:00-08:40', 'SB 408', 'ME19103', 'BAHASA INDONESIA', '2', '', 'A', '', '', 'DR. SUPIAN, S.Pd., M.Pd.', '44', '0', '44', '', '', '14', 'X', 'X', ''],
        ['', '07:00-09:30', 'SB 205', 'ME19105', 'FISIKA I (STATIKA & DINAMIKA)', '3', '', 'B', '', '', 'IR. SYAHBARDIA, MT.', '39', '0', '39', '', '', '14', 'X', 'X', ''],
        ['', '07:00-08:40', 'SB 306', 'ME19108', 'GAMBAR TEKNIK', '2', '', 'C', '', '', 'IR. WIDIYANTI KWINTARINI, MT.', '52', '0', '52', '', '', '14', 'X', 'X', ''],
        ['', '07:00-09:30', 'SB 407', 'ME19105', 'MEKANIKA FLUIDA I', '3', '', 'B', '', '', 'DR. IR. HERY SONAWAN, MT.', '50', '0', '50', '', '', '14', 'X', 'X', ''],
      ],
    };

    this.tableJadwalSementara = {
      headerRow: ['Ubah', 'Kode', 'Nama', 'Semester', 'SKS', 'KK', 'PK', 'PP', 'JK / Kap', 'Estimasi', 'Teralokasi', 'Hitung', 'Bagi', 'Reset', 'Print', 'Hapus'],
      dataRows: [
        ['', 'ME19103', 'BAHASA INDONESIA', '1', '2', '0', '0', '0', '3 / 136', '0 / 0', '136 / 136', '', '', '', '', ''],
        ['', 'ME19104', 'BAHASA INGGRIS', '1', '2', '0', '0', '0', '3 / 147', '0 / 0', '147 / 147', '', '', '', '', ''],
        ['', 'ME19105', 'FISIKA I (STATIKA & DINAMIKA)', '1', '3', '0', '0', '0', '4 / 164', '0 / 0', '164 / 164', '', '', '', '', ''],
        ['', 'ME19108', 'GAMBAR TEKNIK', '1', '2', '0', '0', '0', '3 / 132', '0 / 0', '132 / 132', '', '', '', '', ''],
      ],
    };
  }
}
