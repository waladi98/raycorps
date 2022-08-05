import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { SuratEvaluasiPbmComponent } from './surat-evaluasi-pbm.component';
import { ManageSuratEvaluasiPbmComponent } from './manage-surat-evaluasi-pbm/manage-surat-evaluasi-pbm.component';
import { SuratEvaluasiPbmRoutes } from './surat-evaluasi-pbm.routing';
import { FieldErrorDisplayComponent } from './manage-surat-evaluasi-pbm/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SuratEvaluasiPbmRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        SuratEvaluasiPbmComponent,
        ManageSuratEvaluasiPbmComponent,
        FieldErrorDisplayComponent
    ]
})

export class SuratEvaluasiPbmModule { }
