import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { InstitusiComponent } from './institusi.component';
import { ManageInstitusiComponent } from './manage-institusi/manage-institusi.component';
import { InstitusiRoutes } from './institusi.routing';
import { FieldErrorDisplayComponent } from './manage-institusi/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(InstitusiRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        InstitusiComponent,
        ManageInstitusiComponent,
        FieldErrorDisplayComponent
    ]
})

export class InstitusiModule { }
