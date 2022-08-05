import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { DosenComponent } from './dosen.component';
import { ManageDosenComponent } from './manage-dosen/manage-dosen.component';
import { DosenRoutes } from './dosen.routing';
import { FieldErrorDisplayComponent } from './manage-dosen/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DosenRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        DosenComponent,
        ManageDosenComponent,
        FieldErrorDisplayComponent
    ]
})

export class DosenModule { }
