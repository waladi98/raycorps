import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { StatusTugasAkhirComponent } from './status-tugas-akhir.component';
import { ManageStatusTugasAkhirComponent } from './manage-status-tugas-akhir/manage-status-tugas-akhir.component';
import { StatusTugasAkhirRoutes } from './status-tugas-akhir.routing';
import { FieldErrorDisplayComponent } from './manage-status-tugas-akhir/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(StatusTugasAkhirRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        StatusTugasAkhirComponent,
        ManageStatusTugasAkhirComponent,
        FieldErrorDisplayComponent
    ]
})

export class StatusTugasAkhirModule { }
