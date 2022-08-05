import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { VerifikasiKegiatanSK3Component } from './verifikasi-kegiatan-sk3.component';
import { VerifikasiKegiatanSK3Routes } from './verifikasi-kegiatan-sk3.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuVerifikasiKegiatanSK3Component } from './verifikasi-kegiatan-sk3/verifikasi-kegiatan-sk3.component';

import { CustomTableModule } from '../../../components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(VerifikasiKegiatanSK3Routes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule, CustomTableModule],
  declarations: [VerifikasiKegiatanSK3Component, FormDialogComponent, MenuVerifikasiKegiatanSK3Component],
})
export class VerifikasiKegiatanSK3Module {}
