import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { SuratPemberitahuanUjianComponent } from './surat-pemberitahuan-ujian.component';
import { ManageSuratPemberitahuanUjianComponent } from './manage-surat-pemberitahuan-ujian/manage-surat-pemberitahuan-ujian.component';
import { SuratPemberitahuanUjianRoutes } from './surat-pemberitahuan-ujian.routing';
import { FieldErrorDisplayComponent } from './manage-surat-pemberitahuan-ujian/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SuratPemberitahuanUjianRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        SuratPemberitahuanUjianComponent,
        ManageSuratPemberitahuanUjianComponent,
        FieldErrorDisplayComponent
    ]
})

export class SuratPemberitahuanUjianModule { }
