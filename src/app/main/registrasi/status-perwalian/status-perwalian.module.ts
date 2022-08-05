import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { StatusPerwalianComponent } from './status-perwalian.component';
import { ManageStatusPerwalianComponent } from './manage-status-perwalian/manage-status-perwalian.component';
import { StatusPerwalianRoutes } from './status-perwalian.routing';
import { FieldErrorDisplayComponent } from './manage-status-perwalian/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(StatusPerwalianRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        StatusPerwalianComponent,
        ManageStatusPerwalianComponent,
        FieldErrorDisplayComponent
    ]
})

export class StatusPerwalianModule { }
