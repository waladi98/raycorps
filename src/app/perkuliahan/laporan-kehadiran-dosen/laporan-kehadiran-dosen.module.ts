import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';

import { LaporanKehadiranDosenComponent } from './laporan-kehadiran-dosen.component';
import { ManageLaporanKehadiranDosenComponent } from './manage-laporan-kehadiran-dosen/manage-laporan-kehadiran-dosen.component';
import { LaporanKehadiranDosenRoutes } from './laporan-kehadiran-dosen.routing';
import { FieldErrorDisplayComponent } from './manage-laporan-kehadiran-dosen/field-error-display/field-error-display.component';
import { RekapKehadiranPerMkComponent } from './rekap-table/matakuliah/rekap-kehadiran-per-mk/rekap-kehadiran-per-mk.component';
import { RincianKehadiranPerMkComponent } from './rekap-table/matakuliah/rincian-kehadiran-per-mk/rincian-kehadiran-per-mk.component';
import { RekapKehadiranDosenComponent } from './rekap-table/dosen/rekap-kehadiran-dosen/rekap-kehadiran-dosen.component';
import { RincianKehadiranDosenComponent } from './rekap-table/dosen/rincian-kehadiran-dosen/rincian-kehadiran-dosen.component';

import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(LaporanKehadiranDosenRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, MatFormFieldModule],
  declarations: [LaporanKehadiranDosenComponent, ManageLaporanKehadiranDosenComponent, FieldErrorDisplayComponent, RekapKehadiranPerMkComponent, RincianKehadiranPerMkComponent, RekapKehadiranDosenComponent, RincianKehadiranDosenComponent],
})
export class LaporanKehadiranDosenModule {}
