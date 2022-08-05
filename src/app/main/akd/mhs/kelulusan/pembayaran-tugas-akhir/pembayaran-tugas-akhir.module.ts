import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../md/md.module';
import { MaterialModule } from '../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { PembayaranTAComponent } from './pembayaran-tugas-akhir.component';
import { PembayaranTARoutes } from './pembayaran-tugas-akhir.routing';
import { MiniProfilComponent } from './mini-profil/mini-profil.component';
// import { LayananAdministrasiComponent } from './layanan-administrasi/layanan-administrasi.component';
import { CustomTableModule } from '../../../../../components/custom-table/custom-table.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PembayaranTARoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
        CustomTableModule
    ],
    declarations: [
        PembayaranTAComponent,
        MiniProfilComponent,
    ],

})

export class PembayaranTAModule { }
