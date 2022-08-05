import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { MahasiswaComponent } from './mahasiswa.component';
import { ManageMahasiswaComponent } from './manage-mahasiswa/manage-mahasiswa.component';
import { MahasiswaRoutes } from './mahasiswa.routing';
import { FieldErrorDisplayComponent } from './manage-mahasiswa/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MahasiswaRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        MahasiswaComponent,
        ManageMahasiswaComponent,
        FieldErrorDisplayComponent
    ]
})

export class MahasiswaModule { }
