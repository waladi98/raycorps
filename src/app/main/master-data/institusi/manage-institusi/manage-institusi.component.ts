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
    selector: 'app-master-manage-institusi',
    templateUrl: 'manage-institusi.component.html'
})

export class ManageInstitusiComponent implements OnInit {

    form: FormGroup;
    isLoadingTable = false;
    params: any;
    constructor(private formBuilder: FormBuilder,
        private dataService: DataService,
        private _activatedRoute: ActivatedRoute,
    ) {
        this._activatedRoute.params.subscribe((params: any) => (this.params = params));
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            kode: ['', Validators.required],
            kode_hukum: ['', Validators.required],
            name: ['', Validators.required],
            tanggal_mulai: ['', Validators.required],
            alamat: ['', Validators.required],
            kota: ['', Validators.required],
            kode_pos: ['', Validators.required],
            telepon: ['', Validators.required],
            fax: ['', Validators.required],
            email: ['', Validators.required],
            no_akta: ['', Validators.required],
            tgl_akta: ['', Validators.required],
            no_pengesahan: ['', Validators.required],
            tgl_pengesahan: ['', Validators.required],
            website: ['', Validators.required],
            aktif: [false, Validators.required],
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
            .getRequest<any>('/master/institusi/show', {
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
                        kode_hukum: [null, Validators.required],
                        nama: [data.nama, Validators.required],
                        tanggal_mulai: [data.tanggal_berdiri, Validators.required],
                        alamat: [data.alamat_jalan, Validators.required],
                        kota: [data.kota, Validators.required],
                        kode_pos: [data.kode_pos, Validators.required],
                        telepon: [data.telepon, Validators.required],
                        fax: [data.fax, Validators.required],
                        email: [data.email, Validators.required],
                        no_akta: [data.sk_izin_operasi, Validators.required],
                        tgl_akta: [data.tanggal_sk_izin_operasi, Validators.required],
                        no_pengesahan: [data.sk_pendirian, Validators.required],
                        tgl_pengesahan: [data.tanggal_sk_pendirian, Validators.required],
                        website: [data.website, Validators.required],
                        aktif: [(data.aktif == 'Y') ? false : true, Validators.required],
                    });
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

}
