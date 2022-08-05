import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { PembuatanIjazahComponent } from './pembuatan-ijazah.component';
import { ManagePembuatanIjazahComponent } from './manage-pembuatan-ijazah/manage-pembuatan-ijazah.component';
import { PembuatanIjazahRoutes } from './pembuatan-ijazah.routing';
import { FieldErrorDisplayComponent } from './manage-pembuatan-ijazah/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PembuatanIjazahRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        PembuatanIjazahComponent,
        ManagePembuatanIjazahComponent,
        FieldErrorDisplayComponent
    ]
})

export class PembuatanIjazahModule { }
