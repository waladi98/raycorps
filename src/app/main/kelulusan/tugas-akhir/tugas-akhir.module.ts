import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { TugasAkhirComponent } from './tugas-akhir.component';
import { ManageTugasAkhirComponent } from './manage-tugas-akhir/manage-tugas-akhir.component';
import { TugasAkhirRoutes } from './tugas-akhir.routing';
import { FieldErrorDisplayComponent } from './manage-tugas-akhir/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(TugasAkhirRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        TugasAkhirComponent,
        ManageTugasAkhirComponent,
        FieldErrorDisplayComponent
    ]
})

export class TugasAkhirModule { }
