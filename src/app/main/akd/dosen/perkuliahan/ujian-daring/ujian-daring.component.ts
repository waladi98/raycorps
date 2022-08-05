import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import swal from 'sweetalert2';

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-akd-ujian-daring',
  templateUrl: 'ujian-daring.component.html',
  styleUrls: ['./ujian-daring.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class UjianDaringComponent implements OnInit {

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
        console.log('Matches small viewport or handset in portrait mode');
      } else {
        this.isScreenSmall = false;
      }
    });
    this._activatedRoute.params.subscribe((params: any) => (this.params = params));
  }
  ngOnInit() {
    this.inisialisasiTable();
  }

  manageData(type) {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        type: type,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: '+',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-16',
          field: 'plus',
        },
        {
          label: '#',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-16',
          field: 'no',
        },
        {
          label: 'Program Studi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'program_studi',
        },
        {
          label: 'Mata Kuliah',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'mata_kuliah',
        },
        {
          label: 'Kls',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'kls',
        },
        {
          label: 'Smst.',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-52',
          field: 'smst',
        },
        {
          label: 'Dosen',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'dosen',
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
          label: 'Peserta',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'peserta',
        },
        {
          label: 'Soal',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'soal',
        },
        {
          label: 'Berkas Jawaban',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'berkas_jawaban',
        },
        {
          label: 'Aksi',
          class: 'text-sm text-center border border-black-300 bg-gray-400',
          field: 'action',
        },
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: 'plus',
        },
        {
          class: 'text-center border border-black-300',
          field: 'no',
        },
        {
          class: 'text-center border border-black-300',
          field: 'program_studi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'mata_kuliah',
        },
        {
          class: 'text-center border border-black-300',
          field: 'kls',
        },
        {
          class: 'text-center border border-black-300',
          field: 'smst',
        },
        {
          class: 'text-center border border-black-300',
          field: 'dosen',
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
          field: 'peserta',
        },
        {
          class: 'text-center border border-black-300',
          field: 'soal',
        },
        {
          class: 'text-center border border-black-300',
          field: 'berkas_jawaban',
        },
        {
          class: 'text-center border border-black-300',
          field: 'action',
        },
      ],

      action: [
        {
          id_params: "",
          route: "",
          type: "route",
          icon: "fa fa-info-circle text-info",
          toolTip: "Informasi Lengkap Ujian Daring",
        },
      ],
      
      data: [
        {
          plus: "",
          no: "",
          program_studi: "Teknologi Pangan",
          mata_kuliah: "Literasi Digital",
          kls: "J",
          smst: "1",
          dosen: "MOCH. ILHAM ANUGRAH, ST., M.ENG.",
          tanggal: "21-11-2021",
          jam: "18:15 - 00:00",
          peserta: "0/0/6",
          soal: "Belum Diunggah",
          berkas_jawaban: "Tidak Tersedia",
          action: "",
        },
        {
          plus: "",
          no: "",
          program_studi: "Teknologi Informatika",
          mata_kuliah: "Matematika Informatika II",
          kls: "B",
          smst: "3",
          dosen: "MOCH. ILHAM ANUGRAH, ST., M.ENG.",
          tanggal: "05-01-2022",
          jam: "08:20 - 00:00",
          peserta: "0/0/43",
          soal: "Belum Diunggah",
          berkas_jawaban: "Tidak Tersedia",
          action: "",
        },
        {
          plus: "",
          no: "",
          program_studi: "Teknologi Informatika",
          mata_kuliah: "Matematika Informatika II",
          kls: "C",
          smst: "3",
          dosen: "MOCH. ILHAM ANUGRAH, ST., M.ENG.",
          tanggal: "05-01-2022",
          jam: "08:20 - 00:00",
          peserta: "0/0/71",
          soal: "Belum Diunggah",
          berkas_jawaban: "Tidak Tersedia",
          action: "",
        },
        {
          plus: "",
          no: "",
          program_studi: "Teknologi Informatika",
          mata_kuliah: "Matematika Dasar",
          kls: "B",
          smst: "1",
          dosen: "MOCH. ILHAM ANUGRAH, ST., M.ENG.",
          tanggal: "10-01-2022",
          jam: "08:20 - 00:00",
          peserta: "0/0/66",
          soal: "Belum Diunggah",
          berkas_jawaban: "Tidak Tersedia",
          action: "",
        },
        {
          plus: "",
          no: "",
          program_studi: "Teknologi Informatika",
          mata_kuliah: "Proyek Data Science",
          kls: "A",
          smst: "7",
          dosen: "MOCH. ILHAM ANUGRAH, ST., M.ENG.",
          tanggal: "10-01-2022",
          jam: "15:50 - 00:00",
          peserta: "0/0/18",
          soal: "Belum Diunggah",
          berkas_jawaban: "Tidak Tersedia",
          action: "",
    }]
  }
  }
}