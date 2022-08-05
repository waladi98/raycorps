import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../md/md.module';
import { MaterialModule } from '../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { PendaftaranOnSiteComponent } from './pendaftaran-on-site.component';
import { PendaftaranOnSiteRoutes } from './pendaftaran-on-site.routing';
import {MatDialogModule} from '@angular/material/dialog';
import {FormDialogComponent} from './form-dialog/form-dialog.component';

import {UbahPesertaComponent} from './ubah-peserta/ubah-peserta.component';
import {TambahPesertaComponent} from './tambah-peserta/tambah-peserta.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PendaftaranOnSiteRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
        MatDialogModule
    ],
    declarations: [
        PendaftaranOnSiteComponent,
        FormDialogComponent,
        UbahPesertaComponent,
        TambahPesertaComponent
    ]
})

export class PendaftaranOnSiteModule { }
