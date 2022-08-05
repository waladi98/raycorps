import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-akd-jadwal-ujian',
  templateUrl: 'jadwal-ujian.component.html',
  styleUrls: ['./jadwal-ujian.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class JadwalUjianComponent implements OnInit {

  listData = {
    header: [],
    field: [],
    action: [],
    data: [],
  };

  isLoadingTable = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  params: any;
  constructor(private router: Router, private _activatedRoute: ActivatedRoute, public breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isScreenSmall = true;
        //console.log('Matches small viewport or handset in portrait mode');
      } else {
        this.isScreenSmall = false;
      }
    });
    this._activatedRoute.params.subscribe((params: any) => (this.params = params));
  }
  ngOnInit() {
    this.inisialisasiTable();
  }

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: 'No',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-16',
          field: 'no',
        },
        {
          label: 'Tanggal',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'tanggal',
        },
        {
          label: 'Jam',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'jam',
        },
        {
          label: 'Ruang',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'ruang',
        },
        {
          label: 'Kode MK',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-52',
          field: 'kode_mk',
        },
        {
          label: 'Matakuliah',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'matakuliah',
        },
        {
          label: 'Kelas',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'kelas',
        },
        {
          label: 'SKS',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'sks',
        },
        {
          label: 'Prodi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'prodi',
        },
        {
          label: 'Dosen Koordinator',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'dosen_koordinator',
        },
        {
          label: 'Dosen',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'dosen',
        },
        {
          label: 'Mahasiswa',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'mahasiswa',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'tanggal',
        },
        {
          class: 'text-center border border-black-300',
          field: 'jam',
        },
        {
          class: 'text-center border border-black-300',
          field: 'ruang',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kode_mk',
        },
        {
          class: 'text-center border border-black-300',
          field: 'matakuliah',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kelas',
        },
        {
          class: 'text-center border border-black-300',
          field: 'sks',
        },
        {
          class: 'text-center border border-black-300',
          field: 'prodi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'dosen_koordinator',
        },
        {
          class: 'text-center border border-black-300',
          field: 'dosen',
        },
        {
          class: 'text-center border border-black-300',
          field: 'mahasiswa',
        },
      ],

      action: [
      ],
      
      data: [
        {
          no: "",
          tanggal: "00 0",
          jam: "00:00-00:00",
          ruang: "",
          kode_mk: "IF21W0202",
          matakuliah: "Matematika Informatika I",
          kelas: "A",
          sks: "3 (3)",
          prodi: "Teknik Informatika",
          dosen_koordinator: "MOCH. ILHAM ANUGRAH, ST., M.ENG.",
          dosen: "2/14",
          mahasiswa: "94.12",
        },
        {
          no: "",
          tanggal: "00 0",
          jam: "00:00-00:00",
          ruang: "",
          kode_mk: "IF21W0610",
          matakuliah: "Praktikum Internet of Things",
          kelas: "A",
          sks: "1 (1)",
          prodi: "Teknik Informatika",
          dosen_koordinator: "MOCH. ILHAM ANUGRAH, ST., M.ENG.",
          dosen: "1/14",
          mahasiswa: "97.30",
        },
        {
          no: "",
          tanggal: "00 0",
          jam: "00:00-00:00",
          ruang: "",
          kode_mk: "IF21W0610",
          matakuliah: "Praktikum Internet of Things",
          kelas: "B",
          sks: "1 (1)",
          prodi: "Teknik Informatika",
          dosen_koordinator: "MOCH. ILHAM ANUGRAH, ST., M.ENG.",
          dosen: "1/14",
          mahasiswa: "100.00",
        },
        {
          no: "",
          tanggal: "00 0",
          jam: "00:00-00:00",
          ruang: "",
          kode_mk: "IF21W0404",
          matakuliah: "Sistem Manajemen Basis Data",
          kelas: "C",
          sks: "3 (3)",
          prodi: "Teknik Informatika",
          dosen_koordinator: "MOCH. ILHAM ANUGRAH, ST., M.ENG.",
          dosen: "2/14",
          mahasiswa: "90.28",
        },
        {
          no: "",
          tanggal: "00 0",
          jam: "00:00-00:00",
          ruang: "",
          kode_mk: "IF21W0605",
          matakuliah: "Visualisasi Data",
          kelas: "C",
          sks: "2 (2)",
          prodi: "Teknik Informatika",
          dosen_koordinator: "MOCH. ILHAM ANUGRAH, ST., M.ENG.",
          dosen: "1/14",
          mahasiswa: "100.00",
        },
        {
          no: "",
          tanggal: "00 0",
          jam: "00:00-00:00",
          ruang: "",
          kode_mk: "IF21W0206",
          matakuliah: "Pemrograman Basis Data",
          kelas: "D",
          sks: "3 (3)",
          prodi: "Teknik Informatika",
          dosen_koordinator: "MOCH. ILHAM ANUGRAH, ST., M.ENG.",
          dosen: "2/14",
          mahasiswa: "109.38",
        },
        {
          no: "",
          tanggal: "00 0",
          jam: "00:00-00:00",
          ruang: "",
          kode_mk: "IF21W0605",
          matakuliah: "Visualisasi Data",
          kelas: "D",
          sks: "2 (2)",
          prodi: "Teknik Informatika",
          dosen_koordinator: "MOCH. ILHAM ANUGRAH, ST., M.ENG.",
          dosen: "2/14",
          mahasiswa: "100.00",
        },
        {
          no: "",
          tanggal: "00 0",
          jam: "00:00-00:00",
          ruang: "",
          kode_mk: "IF21W0605",
          matakuliah: "Visualisasi Data",
          kelas: "E",
          sks: "2 (2)",
          prodi: "Teknik Informatika",
          dosen_koordinator: "MOCH. ILHAM ANUGRAH, ST., M.ENG.",
          dosen: "1/14",
          mahasiswa: "100.00"
    }]
  }
  }
}