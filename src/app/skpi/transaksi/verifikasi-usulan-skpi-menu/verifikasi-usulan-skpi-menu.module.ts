import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { MenuVerifikasiUsulanSKPIComponent } from './verifikasi-usulan-skpi-menu.component';
import { MenuVerifikasiUsulanSKPIRoutes } from './verifikasi-usulan-skpi-menu.routing';
import { InformasiPengusulComponent } from './informasi-pengusul/informasi-pengusul.component';
import { RekomendasiSKPIComponent } from './rekomendasi-skpi/rekomendasi-skpi.component';
import { KegiatanWajibComponent } from './kegiatan-wajib/kegiatan-wajib.component';
import { KegiatanSK3Component } from './kegiatan-sk3/kegiatan-sk3.component';

import { CustomTableModule } from '../../../components/custom-table/custom-table.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MenuVerifikasiUsulanSKPIRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
        RecaptchaModule,
        CustomTableModule
    ],
    declarations: [
        MenuVerifikasiUsulanSKPIComponent, InformasiPengusulComponent, RekomendasiSKPIComponent, KegiatanWajibComponent, KegiatanSK3Component
    ],
    
})

export class MenuVerifikasiUsulanSKPIModule { }
