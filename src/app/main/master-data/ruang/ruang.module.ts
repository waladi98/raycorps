import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { RuangComponent } from './ruang.component';
import { ManageRuangComponent } from './manage-ruang/manage-ruang.component';
import { RuangRoutes } from './ruang.routing';
import { FieldErrorDisplayComponent } from './manage-ruang/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RuangRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        RuangComponent,
        ManageRuangComponent,
        FieldErrorDisplayComponent
    ]
})

export class RuangModule { }
