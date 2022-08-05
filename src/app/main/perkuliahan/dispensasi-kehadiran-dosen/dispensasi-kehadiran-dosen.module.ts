import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { DispensasiKehadiranDosenComponent } from './dispensasi-kehadiran-dosen.component';
import { ManageDispensasiKehadiranDosenComponent } from './manage-dispensasi-kehadiran-dosen/manage-dispensasi-kehadiran-dosen.component';
import { DispensasiKehadiranDosenRoutes } from './dispensasi-kehadiran-dosen.routing';
import { FieldErrorDisplayComponent } from './manage-dispensasi-kehadiran-dosen/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DispensasiKehadiranDosenRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        DispensasiKehadiranDosenComponent,
        ManageDispensasiKehadiranDosenComponent,
        FieldErrorDisplayComponent
    ]
})

export class DispensasiKehadiranDosenModule { }
