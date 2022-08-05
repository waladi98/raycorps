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
    selector: 'app-master-manage-kurikulum-mata-kuliah',
    templateUrl: 'manage-kurikulum-mata-kuliah.component.html'
})

export class ManageKurikulumMataKuliahComponent implements OnInit {

    form: FormGroup;

    listDataKampus = [];
    listDataProdi = [];
    allComplete: boolean = false;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {

        for (let i = 0; i < 15; i++) {
            this.listDataProdi.push({
                label: 'Prodi ' + (i + 1),
                id: i,
                completed: false,
            });

        }

        this.form = this.formBuilder.group({
            kode: ['', Validators.required],
            nama: ['', Validators.required],
            list_prodi_id: ['', Validators.required],
            kampus: ['', Validators.required],
            lantai: ['', Validators.required],
            is_kuliah: ['', Validators.required],
            kapasitas: ['', Validators.required],
            kapasitas_ujian: ['', Validators.required],
            jumlah_kolom_ujian: ['', Validators.required],
            is_usm: ['', Validators.required],
            keterangan: ['', Validators.required],
        });
    }

    ngAfterViewInit() {

    }

    onSubmit() {

    }

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }

    updateAllComplete() {
        this.allComplete = this.listDataProdi != null && this.listDataProdi.every(t => t.completed);
    }

    someComplete(): boolean {
        if (this.listDataProdi == null) {
            return false;
        }
        return this.listDataProdi.filter(t => t.completed).length > 0 && !this.allComplete;
    }

    setAll(completed: boolean) {
        this.allComplete = completed;
        if (this.listDataProdi == null) {
            return;
        }
        this.listDataProdi.forEach(t => t.completed = completed);
    }

}
