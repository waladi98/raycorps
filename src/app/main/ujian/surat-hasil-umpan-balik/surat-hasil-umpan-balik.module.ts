import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { SuratHasilUmpanBalikComponent } from './surat-hasil-umpan-balik.component';
import { ManageSuratHasilUmpanBalikComponent } from './manage-surat-hasil-umpan-balik/manage-surat-hasil-umpan-balik.component';
import { SuratHasilUmpanBalikRoutes } from './surat-hasil-umpan-balik.routing';
import { FieldErrorDisplayComponent } from './manage-surat-hasil-umpan-balik/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SuratHasilUmpanBalikRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        SuratHasilUmpanBalikComponent,
        ManageSuratHasilUmpanBalikComponent,
        FieldErrorDisplayComponent
    ]
})

export class SuratHasilUmpanBalikModule { }
