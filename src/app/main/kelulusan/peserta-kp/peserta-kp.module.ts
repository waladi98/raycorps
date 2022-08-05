import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { PesertaKPComponent } from './peserta-kp.component';
import { ManagePesertaKPComponent } from './manage-peserta-kp/manage-peserta-kp.component';
import { PesertaKPRoutes } from './peserta-kp.routing';
import { FieldErrorDisplayComponent } from './manage-peserta-kp/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PesertaKPRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        PesertaKPComponent,
        ManagePesertaKPComponent,
        FieldErrorDisplayComponent
    ]
})

export class PesertaKPModule { }
