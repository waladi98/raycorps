import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { ProgramComponent } from './program.component';
import { ManageProgramComponent } from './manage-program/manage-program.component';
import { ProgramRoutes } from './program.routing';
import { FieldErrorDisplayComponent } from './manage-program/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ProgramRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        ProgramComponent,
        ManageProgramComponent,
        FieldErrorDisplayComponent
    ]
})

export class ProgramModule { }
