import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { KampusComponent } from './kampus.component';
import { ManageKampusComponent } from './manage-kampus/manage-kampus.component';
import { KampusRoutes } from './kampus.routing';
import { FieldErrorDisplayComponent } from './manage-kampus/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(KampusRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        KampusComponent,
        ManageKampusComponent,
        FieldErrorDisplayComponent
    ]
})

export class KampusModule { }
