import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { RekapPerwalianPerDosenWaliComponent } from './rekap-perwalian-per-dosen-wali.component';
import { ManageRekapPerwalianPerDosenWaliComponent } from './manage-rekap-perwalian-per-dosen-prodi/manage-rekap-perwalian-per-dosen-wali.component';
import { RekapPerwalianPerDosenWaliRoutes } from './rekap-perwalian-per-dosen-wali.routing';
import { FieldErrorDisplayComponent } from './manage-rekap-perwalian-per-dosen-prodi/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RekapPerwalianPerDosenWaliRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        RekapPerwalianPerDosenWaliComponent,
        ManageRekapPerwalianPerDosenWaliComponent,
        FieldErrorDisplayComponent
    ]
})

export class RekapPerwalianPerDosenWaliModule { }
