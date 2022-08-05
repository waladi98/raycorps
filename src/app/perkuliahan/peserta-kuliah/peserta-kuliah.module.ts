import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';

import { PesertaKuliahComponent } from './peserta-kuliah.component';
import { ManagePesertaKuliahComponent } from './manage-peserta-kuliah/manage-peserta-kuliah.component';
import { PesertaKuliahRoutes } from './peserta-kuliah.routing';
import { FieldErrorDisplayComponent } from './manage-peserta-kuliah/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PesertaKuliahRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        PesertaKuliahComponent,
        ManagePesertaKuliahComponent,
        FieldErrorDisplayComponent
    ]
})

export class PesertaKuliahModule { }
