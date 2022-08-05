import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { KerjaPraktekComponent } from './kerja-praktek.component';
import { ManageKerjaPraktekComponent } from './manage-kerja-praktek/manage-kerja-praktek.component';
import { KerjaPraktekRoutes } from './kerja-praktek.routing';
import { FieldErrorDisplayComponent } from './manage-kerja-praktek/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(KerjaPraktekRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        KerjaPraktekComponent,
        ManageKerjaPraktekComponent,
        FieldErrorDisplayComponent
    ]
})

export class KerjaPraktekModule { }
