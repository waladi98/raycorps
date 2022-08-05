import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { DataService } from '../../../../core/services/data.service';
import { finalize, map, startWith, debounceTime, tap, switchMap, } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-master-manage-dosen',
    templateUrl: 'manage-dosen.component.html'
})

export class ManageDosenComponent implements OnInit {

    form: FormGroup;
    isLoadingTable = false;
    params: any;

    listDataKampus = [];
    listDataProdi = [];
    allComplete: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private dataService: DataService,
        private _activatedRoute: ActivatedRoute,) {
        this._activatedRoute.params.subscribe((params: any) => (this.params = params));
    }

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
            nidn: ['', Validators.required],
            nama: ['', Validators.required],
            gelar: ['', Validators.required],
            tempat_lahir: ['', Validators.required],
            tanggal_lahir: ['', Validators.required],
            jenis_kelamin: ['', Validators.required],
            agama: ['', Validators.required],
            telepon: ['', Validators.required],
            ponsel: ['', Validators.required],
            email: ['', Validators.required],
            homebase: ['', Validators.required],
            
        });

        if (this.params) {
            this.getDetailData(this.params.kode);
        }
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

    getDetailData(kode): void {
        this.isLoadingTable = true;
        this.dataService
            .getRequest<any>('/master/dosen/show', {
                kode: kode,
            })
            .pipe(
                map((response) => response),
                finalize(() =>
                    setTimeout(() => (this.isLoadingTable = false), 1000)
                )
            )
            .subscribe(
                (response) => {
                    let data = response.result;
                    // this.form = this.formBuilder.group({
                    //     kode: [data.kode, Validators.required],
                    //     nama: [data.fakultas, Validators.required],
                    //     pejabat_fakultas: [data.dekan, Validators.required],
                    //     nama_jabatan: ['Dekan', Validators.required],
                    // });
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
    }


}
