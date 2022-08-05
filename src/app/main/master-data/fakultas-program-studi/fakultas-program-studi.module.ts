import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { FakultasProgramStudiComponent } from './fakultas-program-studi.component';
import { ManageProgramStudiComponent } from './manage-program-studi/manage-program-studi.component';
import { ManageFakultasComponent } from './manage-fakultas/manage-fakultas.component';
import { FakultasProgramStudiRoutes } from './fakultas-program-studi.routing';
import { FieldErrorDisplayComponent } from './manage-program-studi/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FakultasProgramStudiRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        FakultasProgramStudiComponent,
        ManageProgramStudiComponent,
        ManageFakultasComponent,
        FieldErrorDisplayComponent
    ]
})

export class FakultasProgramStudiModule { }
