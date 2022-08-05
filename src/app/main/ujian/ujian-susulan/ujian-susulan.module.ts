import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { UjianSusulanComponent } from './ujian-susulan.component';
import { ManageUjianSusulanComponent } from './manage-ujian-susulan/manage-ujian-susulan.component';
import { UjianSusulanRoutes } from './ujian-susulan.routing';
import { FieldErrorDisplayComponent } from './manage-ujian-susulan/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UjianSusulanRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        UjianSusulanComponent,
        ManageUjianSusulanComponent,
        FieldErrorDisplayComponent
    ]
})

export class UjianSusulanModule { }
