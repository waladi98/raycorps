import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-master-edit-data-akademik-mahasiswa',
  templateUrl: 'edit-data-akademik-mahasiswa.component.html',
  styleUrls: ['./edit-data-akademik-mahasiswa.component.scss'],
})
export class EditDataAkademikMahasiswaComponent implements OnInit {
  form: FormGroup;

  listData = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.listData = [
      {
        sesi: {
          jumlah_sesi: '7',
        },
        tahun: '20211',
        biaya: '0',
        potongan: '0',
        bayar: '0',
        penarikan: '0',
        status_dpp: '0 %',
        status: 'Non-Aktif',
        max_sks: '0',
        ips: '0.00',
        ipk: '0.00',
      },
      {
        sesi: {
          jumlah_sesi: '4',
        },
        tahun: '20192',
        biaya: '18,000,000',
        potongan: '0',
        bayar: '13,500,000',
        penarikan: '0',
        status_dpp: '75 %',
        status: 'Aktif',
        max_sks: '20',
        ips: '1.00',
        ipk: '1.74',
      },
    ];
  }

  ngAfterViewInit() {}
}
