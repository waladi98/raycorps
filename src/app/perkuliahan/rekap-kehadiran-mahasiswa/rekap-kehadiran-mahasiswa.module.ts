import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';

import { RekapKehadiranMahasiswaComponent } from './rekap-kehadiran-mahasiswa.component';
import { ManageRekapKehadiranMahasiswaComponent } from './manage-rekap-kehadiran-mahasiswa/manage-rekap-kehadiran-mahasiswa.component';
import { RekapKehadiranMahasiswaRoutes } from './rekap-kehadiran-mahasiswa.routing';
import { FieldErrorDisplayComponent } from './manage-rekap-kehadiran-mahasiswa/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RekapKehadiranMahasiswaRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        RekapKehadiranMahasiswaComponent,
        ManageRekapKehadiranMahasiswaComponent,
        FieldErrorDisplayComponent
    ]
})

export class RekapKehadiranMahasiswaModule { }
