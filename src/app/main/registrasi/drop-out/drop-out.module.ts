import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { DropOutComponent } from './drop-out.component';
import { ManageDropOutComponent } from './manage-drop-out/manage-drop-out.component';
import { DropOutRoutes } from './drop-out.routing';
import { FieldErrorDisplayComponent } from './manage-drop-out/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DropOutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        DropOutComponent,
        ManageDropOutComponent,
        FieldErrorDisplayComponent
    ]
})

export class DropOutModule { }
