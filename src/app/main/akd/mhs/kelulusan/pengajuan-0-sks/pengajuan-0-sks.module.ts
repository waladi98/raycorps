import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../md/md.module';
import { MaterialModule } from '../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { Pengajuan0SksComponent } from './pengajuan-0-sks.component';
import { Pengajuan0SksRoutes } from './pengajuan-0-sks.routing';
import { MiniProfilComponent } from './mini-profil/mini-profil.component';
// import { LayananAdministrasiComponent } from './layanan-administrasi/layanan-administrasi.component';
import { CustomTableModule } from '../../../../../components/custom-table/custom-table.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(Pengajuan0SksRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
        CustomTableModule
    ],
    declarations: [
        Pengajuan0SksComponent,
        MiniProfilComponent,
    ],

})

export class Pengajuan0SksModule { }
