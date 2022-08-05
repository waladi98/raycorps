import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { DaftarHadirUjianComponent } from './daftar-hadir-ujian.component';
import { ManageDaftarHadirUjianComponent } from './manage-daftar-hadir-ujian/manage-daftar-hadir-ujian.component';
import { DaftarHadirUjianRoutes } from './daftar-hadir-ujian.routing';
import { FieldErrorDisplayComponent } from './manage-daftar-hadir-ujian/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DaftarHadirUjianRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        DaftarHadirUjianComponent,
        ManageDaftarHadirUjianComponent,
        FieldErrorDisplayComponent
    ]
})

export class DaftarHadirUjianModule { }
