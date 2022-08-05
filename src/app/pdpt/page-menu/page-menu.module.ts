import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';

import { PageMenuComponent } from './page-menu.component';
import { ManageAkademikMahasiswaComponent } from './manage-akademik-mahasiswa/manage-akademik-mahasiswa.component';
import { PageMenuRoutes } from './page-menu.routing';
import { CustomTableModule } from "../../components/custom-table/custom-table.module";
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PageMenuRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        CustomTableModule,
        GoogleChartsModule
    ],
    declarations: [
        PageMenuComponent,
        ManageAkademikMahasiswaComponent
    ]
})

export class PageMenuModule { }
