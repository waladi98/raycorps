import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { KebutuhanRuangUjianComponent } from './kebutuhan-ruang-ujian.component';
import { ManageKebutuhanRuangUjianComponent } from './manage-kebutuhan-ruang-ujian/manage-kebutuhan-ruang-ujian.component';
import { KebutuhanRuangUjianRoutes } from './kebutuhan-ruang-ujian.routing';
import { FieldErrorDisplayComponent } from './manage-kebutuhan-ruang-ujian/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(KebutuhanRuangUjianRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        KebutuhanRuangUjianComponent,
        ManageKebutuhanRuangUjianComponent,
        FieldErrorDisplayComponent
    ]
})

export class KebutuhanRuangUjianModule { }
