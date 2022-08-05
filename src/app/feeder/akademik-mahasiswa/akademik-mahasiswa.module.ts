import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';

import { AkademikMahasiswaComponent } from './akademik-mahasiswa.component';
import { ManageAkademikMahasiswaComponent } from './manage-akademik-mahasiswa/manage-akademik-mahasiswa.component';
import { AkademikMahasiswaRoutes } from './akademik-mahasiswa.routing';
import { CustomTableModule } from "../../components/custom-table/custom-table.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AkademikMahasiswaRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        CustomTableModule
    ],
    declarations: [
        AkademikMahasiswaComponent,
        ManageAkademikMahasiswaComponent
    ]
})

export class AkademikMahasiswaModule { }
