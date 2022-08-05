import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { RekapPerwalianPerMKComponent } from './rekap-perwalian-per-mk.component';
import { ManageRekapPerwalianPerMKComponent } from './manage-rekap-perwalian-per-mk/manage-rekap-perwalian-per-mk.component';
import { RekapPerwalianPerMKRoutes } from './rekap-perwalian-per-mk.routing';
import { FieldErrorDisplayComponent } from './manage-rekap-perwalian-per-mk/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RekapPerwalianPerMKRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        RekapPerwalianPerMKComponent,
        ManageRekapPerwalianPerMKComponent,
        FieldErrorDisplayComponent
    ]
})

export class RekapPerwalianPerMKModule { }
