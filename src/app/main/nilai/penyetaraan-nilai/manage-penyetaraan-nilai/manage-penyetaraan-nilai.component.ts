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
  selector: 'app-master-manage-penyetaraan-nilai',
  templateUrl: 'manage-penyetaraan-nilai.component.html',
})
export class ManagePenyetaraanNilaiComponent implements OnInit {
  form: FormGroup;

  listDataInstitusi = [];
  constructor(private formBuilder: FormBuilder) {}

  matakuliah = [
    { value: 'IF163737', viewValue: 'IF163737 - ADMINISTRASI INFRASTRUKTUR IT (3)' },
    { value: 'IF165107', viewValue: 'IF165107 - AGAMA (2)' },
    { value: 'IF161301', viewValue: 'IF161301 - ALGORITMA & PEMROGRAMAN (3)' },
    { value: 'IF162501', viewValue: 'IF162501 - ANALISIS DAN PERANCANGAN SISTEM INFORMASI (3)' },
    { value: 'IF161721', viewValue: 'IF161721 - ANIMASI 3 DIMENSI (3)' },
    { value: 'IF162801', viewValue: 'IF162801 - APLIKASI ENTERPRISE (3)' },
    { value: 'IF162736', viewValue: 'IF162736 - AUDIT IT/IS (3)' },
    { value: 'IF165701', viewValue: 'IF165701 - BAHASA INGGRIS (3)' },
    { value: 'IF161732', viewValue: 'IF161732 - BASIS DATA MULTIMEDIA (3)' },
    { value: 'IF164725', viewValue: 'IF164725 - BIG DATA (3)' },
    { value: 'IF161201', viewValue: 'IF161201 - DASAR PEMROGRAMAN (4)' },
  ];

  nilai = [
    { value: '0', viewValue: '- (0.00)' },
    { value: 'A', viewValue: 'A (4.00)' },
    { value: 'B', viewValue: 'B (3.00)' },
    { value: 'C', viewValue: 'C (2.00)' },
    { value: 'D', viewValue: 'D (1.00)' },
    { value: 'E', viewValue: 'E (0.00)' },
    { value: 'K', viewValue: 'K (0.00)' },
    { value: 'T', viewValue: 'T (0.00)' },
  ];

  ngOnInit() {
    this.form = this.formBuilder.group({
      kode: ['', Validators.required],
      nama: ['', Validators.required],
      institusi_id: ['', Validators.required],
      alamat: ['', Validators.required],
      kota: ['', Validators.required],
      telepon: ['', Validators.required],
      fax: ['', Validators.required],
    });
  }

  ngAfterViewInit() {}

  onSubmit() {}

  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
}
