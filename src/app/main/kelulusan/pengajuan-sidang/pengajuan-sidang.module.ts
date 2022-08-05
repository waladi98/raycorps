import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { PengajuanSidangComponent } from './pengajuan-sidang.component';
import { ManagePengajuanSidangComponent } from './manage-pengajuan-sidang/manage-pengajuan-sidang.component';
import { PersetujuanPembimbingRoutes } from './pengajuan-sidang.routing';
import { FieldErrorDisplayComponent } from './manage-pengajuan-sidang/field-error-display/field-error-display.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PersetujuanPembimbingRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        MatExpansionModule
    ],
    declarations: [
        PengajuanSidangComponent,
        ManagePengajuanSidangComponent,
        FieldErrorDisplayComponent,
    ]
})

export class PengajuanSidangModule { }
