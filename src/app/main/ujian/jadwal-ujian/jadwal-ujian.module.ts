import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { JadwalUjianComponent } from './jadwal-ujian.component';
import { ManageJadwalUjianComponent } from './manage-jadwal-ujian/manage-jadwal-ujian.component';
import { JadwalUjianRoutes } from './jadwal-ujian.routing';
import { FieldErrorDisplayComponent } from './manage-jadwal-ujian/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(JadwalUjianRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        JadwalUjianComponent,
        ManageJadwalUjianComponent,
        FieldErrorDisplayComponent
    ]
})

export class JadwalUjianModule { }
