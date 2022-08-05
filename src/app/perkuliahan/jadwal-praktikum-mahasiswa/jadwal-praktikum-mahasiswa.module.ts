import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';

import { JadwalPraktikumMahasiswaComponent } from './jadwal-praktikum-mahasiswa.component';
import { ManageJadwalPraktikumMahasiswaComponent } from './manage-jadwal-praktikum-mahasiswa/manage-jadwal-praktikum-mahasiswa.component';
import { JadwalPraktikumMahasiswaRoutes } from './jadwal-praktikum-mahasiswa.routing';
import { FieldErrorDisplayComponent } from './manage-jadwal-praktikum-mahasiswa/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(JadwalPraktikumMahasiswaRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        JadwalPraktikumMahasiswaComponent,
        ManageJadwalPraktikumMahasiswaComponent,
        FieldErrorDisplayComponent
    ]
})

export class JadwalPraktikumMahasiswaModule { }
