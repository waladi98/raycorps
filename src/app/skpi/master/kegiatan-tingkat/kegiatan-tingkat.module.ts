import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { KegiatanTingkatComponent } from './kegiatan-tingkat.component';
import { KegiatanTingkatRoutes } from './kegiatan-tingkat.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { TambahKegiatanTingkatComponent } from './tambah-kegiatan-tingkat/tambah-kegiatan-tingkat.component';
import { EditKegiatanTingkatComponent } from './edit-kegiatan-tingkat/edit-kegiatan-tingkat.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CustomTableModule } from '../../../components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(KegiatanTingkatRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule, CustomTableModule],
  declarations: [KegiatanTingkatComponent, FormDialogComponent, TambahKegiatanTingkatComponent, EditKegiatanTingkatComponent],
})
export class KegiatanTingkatModule {}
