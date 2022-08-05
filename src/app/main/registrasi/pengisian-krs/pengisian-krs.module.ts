import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { PengisianKrsComponent } from './pengisian-krs.component';
import { ManagePengisianKrsComponent } from './manage-pengisian-krs/manage-pengisian-krs.component';
import { PengisianKrsRoutes } from './pengisian-krs.routing';
import { FieldErrorDisplayComponent } from './manage-pengisian-krs/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PengisianKrsRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        PengisianKrsComponent,
        ManagePengisianKrsComponent,
        FieldErrorDisplayComponent
    ]
})

export class PengisianKrsModule { }
