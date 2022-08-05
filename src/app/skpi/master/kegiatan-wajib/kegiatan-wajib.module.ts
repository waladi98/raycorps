import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { KegiatanWajibComponent } from './kegiatan-wajib.component';
import { KegiatanSK3Routes } from './kegiatan-wajib.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TambahKegiatanWajibComponent } from './tambah-kegiatan-wajib/tambah-kegiatan-wajib.component';
import { TambahKegiatanWajibProdiComponent } from './tambah-kegiatan-wajib-prodi/tambah-kegiatan-wajib-prodi.component';
import { EditKegiatanWajibComponent } from './edit-kegiatan-wajib/edit-kegiatan-wajib.component';
import { EditKegiatanWajibProdiComponent } from './edit-kegiatan-wajib-prodi/edit-kegiatan-wajib-prodi.component';

import { CustomTableModule } from '../../../components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(KegiatanSK3Routes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule, CustomTableModule],
  declarations: [KegiatanWajibComponent, FormDialogComponent, TambahKegiatanWajibComponent, EditKegiatanWajibComponent, TambahKegiatanWajibProdiComponent, EditKegiatanWajibProdiComponent],
})
export class KegiatanWajibModule {}
