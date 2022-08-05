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
    selector: 'app-master-manage-program-studi',
    templateUrl: 'manage-program-studi.component.html'
})

export class ManageProgramStudiComponent implements OnInit {

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
            prodi: ['', Validators.required],
            fakultas_id: ['', Validators.required],
            nama: ['', Validators.required],
            nama_inggris: ['', Validators.required],
            jenjang: ['', Validators.required],
            gelar: ['', Validators.required],
            format_nim: ['', Validators.required],
            pindah_prodi_list: ['', Validators.required],
            nama_sesi: ['', Validators.required],
            cek_prasyarat: ['', Validators.required],
            total_sks_lusus: ['', Validators.required],
            default_sks: ['', Validators.required],
            default_jumlah_kehadiran: ['', Validators.required],
            kode_prodi_dikti: ['', Validators.required],
            pajak_honor_dosen: ['', Validators.required],
            tidak_aktif: ['', Validators.required],
            nama_pejabat: ['', Validators.required],
            nama_jabatan: ['', Validators.required],
            batas_studi: ['', Validators.required],
            jumlah_sesi_per_tahun: ['', Validators.required],
            no_sk_dikti: ['', Validators.required],
            tgl_sk_dikti: ['', Validators.required],
            no_sk_ban: ['', Validators.required],
            tgl_sk_ban: ['', Validators.required],
            akreditasi: ['', Validators.required],
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
