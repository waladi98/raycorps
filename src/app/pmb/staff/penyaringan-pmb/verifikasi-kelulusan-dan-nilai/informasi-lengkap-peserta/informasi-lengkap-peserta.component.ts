import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { StorageService } from '../../../../../core/services/storage.service';

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-informasi-lengkap-peserta',
  templateUrl: 'informasi-lengkap-peserta.component.html',
  styleUrls: ['./informasi-lengkap-peserta.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class InformasiLengkapPesertaComponent implements OnInit {
  agama = [
    { value: 'B', viewValue: 'Budha' },
    { value: 'H', viewValue: 'Hindu' },
    { value: 'I', viewValue: 'Islam' },
    { value: 'K', viewValue: 'Katholik' },
    { value: 'P', viewValue: 'Protestan' },
    { value: 'L', viewValue: 'Lain-lain' },
  ];

  program = [
    { value: 'KER', viewValue: 'Kerjasama' },
    { value: 'NON', viewValue: 'Regular Sore' },
    { value: 'REG', viewValue: 'Regular Pagi' },
    { value: 'TES', viewValue: 'Program Tes' },
  ];

  jurusan = [
    { value: 'SMAIPA', viewValue: 'SMA - IPA' },
    { value: 'SMAIPS', viewValue: 'SMA - IPS' },
    { value: 'SMKKES', viewValue: 'SMK - Kesehatan' },
  ];

  pilihan1 = [
    { value: '110', viewValue: '110 - Kedokteran' },
    { value: '111', viewValue: '111 - Pendidikan Dokter Gigi' },
    { value: '113', viewValue: '113 - Profesi Dokter Gigi' },
    { value: '140', viewValue: '140 - Teknik Informatika' },
  ];

  pilihan2 = [
    { value: '110', viewValue: '110 - Kedokteran' },
    { value: '111', viewValue: '111 - Pendidikan Dokter Gigi' },
    { value: '113', viewValue: '113 - Profesi Dokter Gigi' },
    { value: '140', viewValue: '140 - Teknik Informatika' },
  ];

  pilihan3 = [
    { value: '110', viewValue: '110 - Kedokteran' },
    { value: '111', viewValue: '111 - Pendidikan Dokter Gigi' },
    { value: '113', viewValue: '113 - Profesi Dokter Gigi' },
    { value: '140', viewValue: '140 - Teknik Informatika' },
  ];

  pendidikan_ortu = [
    { value: '1', viewValue: '1 - Tidak Tamat SD' },
    { value: '2', viewValue: '2 - Tamat SD' },
    { value: '3', viewValue: '3 - Tamat SMP' },
    { value: '4', viewValue: '4 - Tamat SMTA' },
    { value: '5', viewValue: '5 - Diploma' },
    { value: '6', viewValue: '6 - Sarjana Muda' },
    { value: '7', viewValue: '7 - Sarjana' },
    { value: '8', viewValue: '8 - Pasca Sarjana' },
    { value: '9', viewValue: '9 - Doktor' },
  ];

  pekerjaan_ortu = [
    { value: '0', viewValue: '0 - Belum diisi' },
    { value: '1', viewValue: '1 - Pegawai Negeri' },
    { value: '2', viewValue: '2 - ABRI' },
    { value: '3', viewValue: '3 - Pegawai Swasta' },
    { value: '4', viewValue: '4 - Usaha Sendiri' },
    { value: '5', viewValue: '5 - Tidak Bekerja' },
    { value: '6', viewValue: '6 - Pensiun' },
    { value: '7', viewValue: '7 - Lain-lain' },
    { value: '8', viewValue: '8 - Nelayan' },
    { value: '9', viewValue: '9 - Petani' },
    { value: '10', viewValue: '10 - Peternak' },
    { value: '11', viewValue: '11 - Pedagang Kecil' },
    { value: '12', viewValue: '12 - Pedagang Besar' },
    { value: '13', viewValue: '13 - Wiraswasta' },
    { value: '14', viewValue: '14 - Buruh' },
    { value: '15', viewValue: '15 - Sudah Meninggal' },
  ];

  status_ortu = [
    { value: '1', viewValue: '1 - Masih Hidup' },
    { value: '2', viewValue: '2 - Sudah Meninggal' },
  ];

  formulir = [
    { value: '1', viewValue: 'IPA - Rp.300.0000' },
    { value: '2', viewValue: 'IPS - Rp.300.0000' },
  ];

  simpleSlider = 40;
  doubleSlider = [20, 60];

  regularItems = ['Pizza', 'Pasta', 'Parmesan'];
  touch: boolean;

  selectedValue: string;
  currentCity: string[];

  selectTheme = 'primary';
  cities = [
    { value: 'ipa-0', viewValue: 'IPA - Rp.300.000' },
    { value: 'ips-1', viewValue: 'IPS - Rp.300.000' },
  ];

  srcdoc = null;

  @ViewChild('iframe') iframe: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private _storageService: StorageService
  ) {

  }
  ngOnInit() {

    var user_token = this._storageService.get('user_token');

    if (user_token) {
      this.srcdoc = this.sanitizer.bypassSecurityTrustResourceUrl('https://pmb.yarsi.ac.id/prototipe/pmb/frame_modul.php?user_token=' + user_token + '&modul=q_peserta');
    } else {

    }

  }
  myFunc(val: any) {
    // code here
  }
}
