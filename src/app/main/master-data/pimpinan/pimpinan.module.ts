import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { PimpinanComponent } from './pimpinan.component';
import { ManagePimpinanComponent } from './manage-pimpinan/manage-pimpinan.component';
import { PimpinanRoutes } from './pimpinan.routing';
import { FieldErrorDisplayComponent } from './manage-pimpinan/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PimpinanRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        PimpinanComponent,
        ManagePimpinanComponent,
        FieldErrorDisplayComponent
    ]
})

export class PimpinanModule { }
