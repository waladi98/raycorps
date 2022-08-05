import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { HariLiburNasionalComponent } from './hari-libur-nasional.component';
import { ManageHariLiburNasionalComponent } from './manage-hari-libur-nasional/manage-hari-libur-nasional.component';
import { HariLiburNasionalRoutes } from './hari-libur-nasional.routing';
import { FieldErrorDisplayComponent } from './manage-hari-libur-nasional/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(HariLiburNasionalRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        HariLiburNasionalComponent,
        ManageHariLiburNasionalComponent,
        FieldErrorDisplayComponent
    ]
})

export class HariLiburNasionalModule { }
