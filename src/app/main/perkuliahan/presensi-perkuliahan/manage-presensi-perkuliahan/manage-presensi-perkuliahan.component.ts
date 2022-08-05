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
    selector: 'app-master-manage-presensi-perkuliahan',
    templateUrl: 'manage-presensi-perkuliahan.component.html'
})

export class ManagePresensiPerkuliahanComponent implements OnInit {

    form: FormGroup;

    listDataInstitusi=[];
    constructor(private formBuilder: FormBuilder) { }

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

    ngAfterViewInit() {

    }

    onSubmit() {

    }

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }
}
