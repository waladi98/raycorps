import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { PengajuanSKSComponent } from './pengajuan-0-sks.component';
import { ManagePengajuanSKSComponent } from './manage-pengajuan-0-sks/manage-pengajuan-0-sks.component';
import { PengajuanSKSRoutes } from './pengajuan-0-sks.routing';
import { FieldErrorDisplayComponent } from './manage-pengajuan-0-sks/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PengajuanSKSRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        PengajuanSKSComponent,
        ManagePengajuanSKSComponent,
        FieldErrorDisplayComponent
    ]
})

export class PengajuanSKSModule { }
