import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { MenuRekomendasiUsulanSKPIComponent } from './rekomendasi-usulan-skpi-menu.component';
import { RekomendasiUsulanSKPIRoutes } from './rekomendasi-usulan-skpi-menu.routing';
import { InformasiPengusulComponent } from './informasi-pengusul/informasi-pengusul.component';
import { RekomendasiSKPIComponent } from './rekomendasi-skpi/rekomendasi-skpi.component';
import { KegiatanWajibComponent } from './kegiatan-wajib/kegiatan-wajib.component';
import { KegiatanSK3Component } from './kegiatan-sk3/kegiatan-sk3.component';

import { CustomTableModule } from '../../../components/custom-table/custom-table.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RekomendasiUsulanSKPIRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
        RecaptchaModule,
        CustomTableModule
    ],
    declarations: [
        MenuRekomendasiUsulanSKPIComponent, InformasiPengusulComponent, RekomendasiSKPIComponent, KegiatanWajibComponent, KegiatanSK3Component
    ],
    
})

export class RekomendasiUsulanSKPIModule { }
