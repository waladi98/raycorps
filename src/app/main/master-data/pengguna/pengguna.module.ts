import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { PenggunaComponent } from './pengguna.component';
import { ManagePenggunaComponent } from './manage-pengguna/manage-pengguna.component';
import { PenggunaRoutes } from './pengguna.routing';
import { FieldErrorDisplayComponent } from './manage-pengguna/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PenggunaRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        PenggunaComponent,
        ManagePenggunaComponent,
        FieldErrorDisplayComponent
    ]
})

export class PenggunaModule { }
