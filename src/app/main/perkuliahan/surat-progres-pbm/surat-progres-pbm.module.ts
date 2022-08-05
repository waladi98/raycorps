import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { SuratProgresPbmComponent } from './surat-progres-pbm.component';
import { ManageSuratProgresPbmComponent } from './manage-surat-progres-pbm/manage-surat-progres-pbm.component';
import { SuratProgresPbmRoutes } from './surat-progres-pbm.routing';
import { FieldErrorDisplayComponent } from './manage-surat-progres-pbm/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SuratProgresPbmRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        SuratProgresPbmComponent,
        ManageSuratProgresPbmComponent,
        FieldErrorDisplayComponent
    ]
})

export class SuratProgresPbmModule { }
