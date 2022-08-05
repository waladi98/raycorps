import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { PesertaTAComponent } from './peserta-ta.component';
import { ManagePesertaTAComponent } from './manage-peserta-ta/manage-peserta-ta.component';
import { PesertaTARoutes } from './peserta-ta.routing';
import { FieldErrorDisplayComponent } from './manage-peserta-ta/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PesertaTARoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        PesertaTAComponent,
        ManagePesertaTAComponent,
        FieldErrorDisplayComponent
    ]
})

export class PesertaTAModule { }
