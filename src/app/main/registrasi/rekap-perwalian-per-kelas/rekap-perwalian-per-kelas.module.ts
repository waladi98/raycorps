import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { RekapPerwalianPerKelasComponent } from './rekap-perwalian-per-kelas.component';
import { ManageRekapPerwalianPerKelasComponent } from './manage-rekap-perwalian-per-kelas/manage-rekap-perwalian-per-kelas.component';
import { RekapPerwalianPerKelasRoutes } from './rekap-perwalian-per-kelas.routing';
import { FieldErrorDisplayComponent } from './manage-rekap-perwalian-per-kelas/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RekapPerwalianPerKelasRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        RekapPerwalianPerKelasComponent,
        ManageRekapPerwalianPerKelasComponent,
        FieldErrorDisplayComponent
    ]
})

export class RekapPerwalianPerKelasModule { }
