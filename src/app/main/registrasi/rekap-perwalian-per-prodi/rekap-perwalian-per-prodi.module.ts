import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { RekapPerwalianPerProdiComponent } from './rekap-perwalian-per-prodi.component';
import { ManageRekapPerwalianPerProdiComponent } from './manage-rekap-perwalian-per-prodi/manage-rekap-perwalian-per-prodi.component';
import { RekapPerwalianPerProdiRoutes } from './rekap-perwalian-per-prodi.routing';
import { FieldErrorDisplayComponent } from './manage-rekap-perwalian-per-prodi/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RekapPerwalianPerProdiRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        RekapPerwalianPerProdiComponent,
        ManageRekapPerwalianPerProdiComponent,
        FieldErrorDisplayComponent
    ]
})

export class RekapPerwalianPerProdiModule { }
