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
    selector: 'app-master-manage-fakultas',
    templateUrl: 'manage-fakultas.component.html'
})

export class ManageFakultasComponent implements OnInit {
    form: FormGroup;
    isLoadingTable = false;
    params: any;
    constructor(private formBuilder: FormBuilder,
        private dataService: DataService,
        private _activatedRoute: ActivatedRoute,) {
        this._activatedRoute.params.subscribe((params: any) => (this.params = params));
    }

    ngOnInit() {

        this.form = this.formBuilder.group({
            kode: ['', Validators.required],
            nama: ['', Validators.required],
            pejabat_fakultas: ['', Validators.required],
            nama_jabatan: ['', Validators.required],
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

    getDetailData(kode): void {
        this.isLoadingTable = true;
        this.dataService
            .getRequest<any>('/master/fakultas/show', {
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
                    this.form = this.formBuilder.group({
                        kode: [data.kode, Validators.required],
                        nama: [data.fakultas, Validators.required],
                        pejabat_fakultas: [data.dekan, Validators.required],
                        nama_jabatan: ['Dekan', Validators.required],
                    });
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

   

}
