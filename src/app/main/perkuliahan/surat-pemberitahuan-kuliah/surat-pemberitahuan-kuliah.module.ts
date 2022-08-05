import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { SuratPemberitahuanKuliahComponent } from './surat-pemberitahuan-kuliah.component';
import { ManageSuratPemberitahuanKuliahComponent } from './manage-surat-pemberitahuan-kuliah/manage-surat-pemberitahuan-kuliah.component';
import { SuratPemberitahuanKuliahRoutes } from './surat-pemberitahuan-kuliah.routing';
import { FieldErrorDisplayComponent } from './manage-surat-pemberitahuan-kuliah/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SuratPemberitahuanKuliahRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        SuratPemberitahuanKuliahComponent,
        ManageSuratPemberitahuanKuliahComponent,
        FieldErrorDisplayComponent
    ]
})

export class SuratPemberitahuanKuliahModule { }
