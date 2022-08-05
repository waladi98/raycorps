import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { RekomendasiUsulanSKPIComponent } from './rekomendasi-usulan-skpi.component';
import { RekomendasiUsulanSKPIRoutes } from './rekomendasi-usulan-skpi.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TambahRekomendasiUsulanSKPIComponent } from './tambah-rekomendasi-usulan-skpi/tambah-rekomendasi-usulan-skpi.component';
import { MenuRekomendasiUsulanSKPIComponent } from './rekomendasi-usulan-skpi-menu/rekomendasi-usulan-skpi-menu.component';

import { InformasiPengusulComponent } from './rekomendasi-usulan-skpi-menu/informasi-pengusul/informasi-pengusul.component';
import { RekomendasiSKPIComponent } from './rekomendasi-usulan-skpi-menu/rekomendasi-skpi/rekomendasi-skpi.component';
import { KegiatanWajibComponent } from './rekomendasi-usulan-skpi-menu/kegiatan-wajib/kegiatan-wajib.component';
import { CustomTableModule } from '../../../components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(RekomendasiUsulanSKPIRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule, CustomTableModule],
  declarations: [RekomendasiUsulanSKPIComponent, FormDialogComponent, TambahRekomendasiUsulanSKPIComponent, MenuRekomendasiUsulanSKPIComponent, InformasiPengusulComponent, RekomendasiSKPIComponent, KegiatanWajibComponent],
})
export class RekomendasiUsulanSKPIModule {}
