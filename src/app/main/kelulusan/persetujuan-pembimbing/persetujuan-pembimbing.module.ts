import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { PersetujuanPembimbingComponent } from './persetujuan-pembimbing.component';
import { ManagePersetujuanPembimbingComponent } from './manage-persetujuan-pembimbing/manage-persetujuan-pembimbing.component';
import { PersetujuanPembimbingRoutes } from './persetujuan-pembimbing.routing';
import { FieldErrorDisplayComponent } from './manage-persetujuan-pembimbing/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PersetujuanPembimbingRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        PersetujuanPembimbingComponent,
        ManagePersetujuanPembimbingComponent,
        FieldErrorDisplayComponent
    ]
})

export class PersetujuanPembimbingModule { }
