import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';

import { PresensiPerkuliahanComponent } from './presensi-perkuliahan.component';
import { ManagePresensiPerkuliahanComponent } from './manage-presensi-perkuliahan/manage-presensi-perkuliahan.component';
import { PresensiPerkuliahanRoutes } from './presensi-perkuliahan.routing';
import { FieldErrorDisplayComponent } from './manage-presensi-perkuliahan/field-error-display/field-error-display.component';
import { JadwalKuliahComponent } from './jadwal-kuliah/jadwal-kuliah.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PresensiPerkuliahanRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        PresensiPerkuliahanComponent,
        ManagePresensiPerkuliahanComponent,
        FieldErrorDisplayComponent,
        JadwalKuliahComponent
    ]
})

export class PresensiPerkuliahanModule { }
