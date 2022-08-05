import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { SuratPresensiMahasiswaComponent } from './surat-presensi-mahasiswa.component';
import { ManageSuratPresensiMahasiswaComponent } from './manage-surat-presensi-mahasiswa/manage-surat-presensi-mahasiswa.component';
import { SuratPresensiMahasiswaRoutes } from './surat-presensi-mahasiswa.routing';
import { FieldErrorDisplayComponent } from './manage-surat-presensi-mahasiswa/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SuratPresensiMahasiswaRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        SuratPresensiMahasiswaComponent,
        ManageSuratPresensiMahasiswaComponent,
        FieldErrorDisplayComponent
    ]
})

export class SuratPresensiMahasiswaModule { }
