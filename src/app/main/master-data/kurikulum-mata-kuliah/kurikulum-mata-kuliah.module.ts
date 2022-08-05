import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { KurikulumMataKuliahComponent } from './kurikulum-mata-kuliah.component';
import { ManageKurikulumMataKuliahComponent } from './manage-kurikulum-mata-kuliah/manage-kurikulum-mata-kuliah.component';
import { KurikulumMataKuliahRoutes } from './kurikulum-mata-kuliah.routing';
import { FieldErrorDisplayComponent } from './manage-kurikulum-mata-kuliah/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(KurikulumMataKuliahRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        KurikulumMataKuliahComponent,
        ManageKurikulumMataKuliahComponent,
        FieldErrorDisplayComponent
    ]
})

export class KurikulumMataKuliahModule { }
