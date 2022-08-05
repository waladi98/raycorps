import { Component, OnInit } from '@angular/core';
// import PerfectScrollbar from 'perfect-scrollbar';

declare const $: any;

//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  is_collapse?: boolean;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  icontype?: string;
  ab: string;
  type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/master-data',
    title: 'Master Data',
    type: 'sub',
    icontype: 'storagel',
    collapse: 'master-data',
    is_collapse: false,
    children: [
      { path: 'institusi', title: 'Institusi', icontype: 'cottage', ab: 'I' },
      { path: 'kampus', title: 'Kampus', icontype: 'corporate_fare', ab: 'K' },
      { path: 'ruang', title: 'Ruang', icontype: 'weekend', ab: 'R' },
      { path: 'program', title: 'Program', icontype: 'format_list_bulleted', ab: 'P' },
      { path: 'fakultas-prodi', title: 'Fakultas dan Program Studi', icontype: 'format_list_bulleted', ab: 'FP' },
      { path: 'tahun-akademik', title: 'Tahun Akademik', icontype: 'edit_calendar', ab: 'TA' },
      { path: 'dosen', title: 'Dosen', icontype: 'groups', ab: 'D' },
      { path: 'kurikulum-mata-kuliah', title: 'Kurikulum Mata Kuliah', icontype: 'bookmarks', ab: 'KMK' },
      { path: 'pengguna', title: 'Pengguna', icontype: 'groups', ab: 'P' },
      { path: 'pimpinan', title: 'Pimpinan', icontype: 'groups', ab: 'P' },
      { path: 'mahasiswa', title: 'Mahasiswa', icontype: 'groups', ab: 'M' },
      { path: 'dosen-wali', title: 'Dosen Wali', icontype: 'groups', ab: 'DW' },
      { path: 'data-pribadi-mahasiswa', title: 'Data Pribadi Mahasiswa', icontype: 'school', ab: 'DPM' },
      { path: 'prestasi-dan-sanksi', title: 'Prestasi dan Sanksi', icontype: 'military_tech', ab: 'PS' },
      { path: 'export-data-mahasiswa', title: 'Export Data Mahasiswa', icontype: 'file_upload', ab: 'EDM' },
      { path: 'rekening-institusi', title: 'Rekening Institusi', icontype: 'payments', ab: 'RI' },
      { path: 'biaya-dan-potongan', title: 'Biaya dan Potongan', icontype: 'payments', ab: 'BP' },
      { path: 'setup-wisuda', title: 'Setup Wisuda', icontype: 'construction', ab: 'SW' },
      { path: 'jumlah-lulusan', title: 'Jumlah Lulusan', icontype: 'poll', ab: 'JL' },
      { path: 'tracer-study-alumni', title: 'Tracer Study Alumni', icontype: 'reduce_capacity', ab: 'TSA' },
      { path: 'jurnal', title: 'Jurnal', icontype: 'import_contacts', ab: 'J' },
    ],
  },
  {
    path: '/registrasi',
    title: 'Registrasi',
    type: 'sub',
    icontype: 'content_paste',
    collapse: 'registrasi',
    children: [
      { path: 'no', title: 'Pengisian KRS', icontype: 'edit_note', ab: 'P' },
      { path: 'no', title: 'Status Perwalian', icontype: 'verified_user', ab: 'SP' },
      { path: 'no', title: 'Cuti Akademik', icontype: 'content_cut', ab: 'CA' },
      { path: 'no', title: 'Lulus /Keluar', icontype: 'change_circle', ab: 'LK' },
      { path: 'drop-out', title: 'Drop Out', icontype: 'follow_the_signs', ab: 'DO' },
      { path: 'pengajuan-0-sks', title: 'Pengajuan 0 SKS', icontype: 'difference', ab: 'PS' },
      { path: 'rekap-perwalian-per-kelas', title: 'Rekap Perwalian Perkelas', icontype: 'library_books', ab: 'RP' },
      { path: 'rekap-perwalian-per-mk', title: 'Rekap Perwalian Per MK', icontype: 'library_books', ab: 'RP' },
      { path: 'rekap-perwalian-per-prodi', title: 'Rekap Perwalian Per Prodi', icontype: 'library_books', ab: 'RP' },
      { path: 'rekap-perwalian-per-dosen-wali', title: 'Rekap Perwalian Per Dosen Wali', icontype: 'library_books', ab: 'RP' },
    ],
  },
  {
    path: '/perkuliahan',
    title: 'Perkuliahan',
    type: 'sub',
    icontype: 'school',
    collapse: 'perkuliahan',
    children: [
      { path: 'jadwal-perkuliahan', title: 'Jadwal Perkuliahan', icontype: 'edit_note', ab: 'P' },
      { path: 'hari-libur-nasional', title: 'Hari Libur Nasional', icontype: 'edit_note', ab: 'P' },
      { path: 'dispensasi-kehadiran-dosen', title: 'Dispensasi Kehadiran Dosen', icontype: 'edit_note', ab: 'P' },
      { path: 'peserta-kuliah', title: 'Peserta Kuliah', icontype: 'edit_note', ab: 'P' },
      { path: 'presensi-perkuliahan', title: 'Presensi Perkuliahan', icontype: 'edit_note', ab: 'P' },
      { path: 'monitoring-kuliah', title: 'Monitoring Kuliah', icontype: 'edit_note', ab: 'P' },
      { path: 'laporan-kehadiran-dosen', title: 'Laporan Kehadiran Dosen', icontype: 'edit_note', ab: 'P' },
      { path: 'laporan-kehadiran-mahasiswa', title: 'Laporan kehadiran mahasiswa', icontype: 'edit_note', ab: 'P' },
      { path: 'rekap-kehadiran-mahasiswa', title: 'Rekap kehadiran mahasiswa', icontype: 'edit_note', ab: 'P' },
      { path: 'surat-presensi-mahasiswa', title: 'Surat presensi mahasiswa', icontype: 'edit_note', ab: 'P' },
      { path: 'surat-pemberitahuan-kuliah', title: 'Surat pemberitahuan kuliah', icontype: 'edit_note', ab: 'P' },
      { path: 'surat-progres-pbm', title: 'Surat Progres PBM', icontype: 'edit_note', ab: 'P' },
      { path: 'surat-evaluasi-pbm', title: 'Surat evaluasi PBM', icontype: 'edit_note', ab: 'P' },
      { path: 'jadwal-praktikum-mahasiswa', title: 'Jadwal praktikum mahasiswa', icontype: 'edit_note', ab: 'P' },
    ],
  },
  {
    path: '/ujian',
    title: 'Ujian',
    type: 'sub',
    icontype: 'quiz',
    collapse: 'ujian',
    children: [
      { path: 'dashboard-ujian', title: 'Dashboard Ujian', icontype: 'edit_note', ab: 'P' },
      { path: 'jadwal-ujian', title: 'Jadwal Ujian', icontype: 'edit_note', ab: 'P' },
      { path: 'surat-pemberitahuan-ujian', title: 'Surat Pemberitahuan Ujian', icontype: 'edit_note', ab: 'P' },
      { path: 'daftar-hadir-ujian', title: 'Daftar Hadir Ujian', icontype: 'edit_note', ab: 'P' },
      { path: 'kebutuhan-ruang-ujian', title: 'Kebutuhan Ruang Ujian', icontype: 'edit_note', ab: 'P' },
      { path: 'surat-hasil-umpan-balik', title: 'Surat Hasil Umpan Balik', icontype: 'edit_note', ab: 'P' },
      { path: 'ujian-susulan', title: 'Ujian Susulan', icontype: 'edit_note', ab: 'P' },
    ],
  },
  {
    path: '/kelulusan',
    title: 'Kelulusan',
    type: 'sub',
    icontype: 'quiz',
    collapse: 'kelulusan',
    children: [
      { path: 'kerja-praktek', title: 'Kerja Praktek', icontype: 'edit_note', ab: 'P' },
      { path: 'peserta-kp', title: 'Peserta KP', icontype: 'edit_note', ab: 'P' },
      { path: 'tugas-akhir', title: 'Tugas Akhir', icontype: 'edit_note', ab: 'P' },
      { path: 'peserta-ta', title: 'Peserta TA', icontype: 'edit_note', ab: 'P' },
      { path: 'sk-yudisium', title: 'SK Yudisium', icontype: 'edit_note', ab: 'P' },
      { path: 'status-tugas-akhir', title: 'Status Tugas Akhir', icontype: 'edit_note', ab: 'P' },
      { path: 'persetujuan-pembimbing', title: 'Persetujuan Pembimbing', icontype: 'edit_note', ab: 'P' },
      { path: 'pengajuan-sidang', title: 'Pengajuan Sidang', icontype: 'edit_note', ab: 'P' },
      { path: 'pembuatan-ijazah', title: 'Pembuatan Ijazah', icontype: 'edit_note', ab: 'P' },
      { path: 'no', title: 'Pengambilan Dokumen', icontype: 'edit_note', ab: 'P' },
      { path: 'no', title: 'Survey Kepuasan', icontype: 'edit_note', ab: 'P' },
      { path: 'no', title: 'Lulusan Per Semester', icontype: 'edit_note', ab: 'P' },
      { path: 'no', title: 'Lulusan Per Tahun', icontype: 'edit_note', ab: 'P' },
      { path: 'no', title: 'Pendaftaran Wisuda', icontype: 'edit_note', ab: 'P' },
      { path: 'no', title: 'Peserta Wisuda', icontype: 'edit_note', ab: 'P' },
      { path: 'no', title: 'Pemberitahuan Ke Sekolah', icontype: 'edit_note', ab: 'P' },
      { path: 'no', title: 'Pemberitahuan Ke Orangtua', icontype: 'edit_note', ab: 'P' },
      { path: 'no', title: 'Status Ijazah', icontype: 'edit_note', ab: 'P' },
      { path: 'no', title: 'Asal Sekolah Wisudawan', icontype: 'edit_note', ab: 'P' },
    ],
  },
  {
    path: '/nilai',
    title: 'Nilai',
    type: 'sub',
    icontype: 'quiz',
    collapse: 'nilai',
    children: [
      { path: 'data-akademik-mahasiswa', title: 'Data Akademik Mahasiswa', icontype: 'edit_note', ab: 'P' },
      { path: 'riwayat-pembayaran-dpp', title: 'Riwayat Pembayaran DPP', icontype: 'edit_note', ab: 'P' },
      { path: 'penyetaraan-nilai', title: 'Penyetaraan Nilai', icontype: 'edit_note', ab: 'P' },
      { path: 'pengisian-nilai', title: 'Pengisian Nilai', icontype: 'edit_note', ab: 'P' },
      { path: 'koreksi-nilai-mahasiswa', title: 'Koreksi Nilai Mahasiswa', icontype: 'edit_note', ab: 'P' },
      { path: 'edit-transkrip-nilai', title: 'Edit Transkrip Nilai', icontype: 'edit_note', ab: 'P' },
      { path: 'kartu-hasil-studi', title: 'Kartu Hasil Studi', icontype: 'edit_note', ab: 'P' },
      { path: 'riwayat-nilai', title: 'Riwayat Nilai', icontype: 'edit_note', ab: 'P' },
      { path: 'kartu-kemajuan-studi', title: 'Kartu Kemajuan Studi', icontype: 'edit_note', ab: 'P' },
      { path: 'transkrip-nilai', title: 'Transkrip Nilai', icontype: 'edit_note', ab: 'P' },
      { path: 'sebaran-kemajuan-studi', title: 'Sebaran Kemajuan Nilai', icontype: 'edit_note', ab: 'P' },
    ],
  },
  // {
  //     path: '/forms',
  //     title: 'Forms',
  //     type: 'sub',
  //     icontype: 'content_paste',
  //     collapse: 'forms',
  //     children: [
  //         { path: 'regular', title: 'Regular Forms', icontype: 'content_paste', ab: 'RF' },
  //       { path: 'extended', title: 'Extended Forms', icontype: 'content_paste', ab: 'EF' },
  //         { path: 'validation', title: 'Validation Forms', icontype: 'content_paste', ab: 'VF' },
  //         { path: 'wizard', title: 'Wizard', icontype: 'content_paste', ab: 'W' }
  //     ]
  // }, 
  // {
  //     path: '/tables',
  //     title: 'Tables',
  //     type: 'sub',
  //    icontype: 'grid_on',
  //     collapse: 'tables',
  //     children: [
  //         { path: 'regular', title: 'Regular Tables', icontype: 'content_paste', ab: 'RT' },
  //         { path: 'extended', title: 'Extended Tables', icontype: 'content_paste', ab: 'ET' },
  //         { path: 'datatables.net', title: 'Datatables.net', icontype: 'content_paste', ab: 'DT' }
  //     ]
  // }, 
  // {
  //     path: '/maps',
  //     title: 'Maps',
  //     type: 'sub',
  //     icontype: 'place',
  //     collapse: 'maps',
  //     children: [
  //         { path: 'google', title: 'Google Maps', icontype: 'content_paste', ab: 'GM' },
  //         { path: 'fullscreen', title: 'Full Screen Map', icontype: 'content_paste', ab: 'FSM' },
  //         { path: 'vector', title: 'Vector Map', icontype: 'content_paste', ab: 'VM' }
  //     ]
  // }, {
  //     path: '/widgets',
  //     title: 'Widgets',
  //     type: 'link',
  //     icontype: 'widgets'

  // }, {
  //     path: '/charts',
  //     title: 'Charts',
  //     type: 'link',
  //     icontype: 'timeline'

  // }, {
  //     path: '/calendar',
  //     title: 'Calendar',
  //     type: 'link',
  //     icontype: 'date_range'
  // }, {
  //     path: '/pages',
  //     title: 'Pages',
  //     type: 'sub',
  //     icontype: 'image',
  //     collapse: 'pages',
  //     children: [
  //         { path: 'pricing', title: 'Pricing', icontype: 'content_paste', ab: 'P' },
  //         { path: 'timeline', title: 'Timeline Page', icontype: 'content_paste', ab: 'TP' },
  //         { path: 'login', title: 'Login Page', icontype: 'content_paste', ab: 'LP' },
  //         { path: 'register', title: 'Register Page', icontype: 'content_paste', ab: 'RP' },
  //         { path: 'lock', title: 'Lock Screen Page', icontype: 'content_paste', ab: 'LSP' },
  //         { path: 'user', title: 'User Page', icontype: 'content_paste', ab: 'UP' }
  //     ]
  // }
];
@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ps: any;
  isMobileMenu() {
    if ($(window).width() > 768) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      // const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
      // this.ps = new PerfectScrollbar(elemSidebar);
    }
  }
  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      this.ps.update();
    }
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }
}
