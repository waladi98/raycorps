import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { SKYudisiumComponent } from './sk-yudisium.component';
import { ManageSKYudisiumComponent } from './manage-sk-yudisium/manage-sk-yudisium.component';
import { SKYudisiumRoutes } from './sk-yudisium.routing';
import { FieldErrorDisplayComponent } from './manage-sk-yudisium/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SKYudisiumRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        SKYudisiumComponent,
        ManageSKYudisiumComponent,
        FieldErrorDisplayComponent
    ]
})

export class SKYudisiumModule { }
