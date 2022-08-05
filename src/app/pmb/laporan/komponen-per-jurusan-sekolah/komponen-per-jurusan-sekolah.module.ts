import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { KomponenPerJurusanSekolahComponent } from './komponen-per-jurusan-sekolah.component';
import { KomponenPerJurusanSekolahRoutes } from './komponen-per-jurusan-sekolah.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomTableModule } from '../../../components/custom-table/custom-table.module';


@NgModule({
  imports: [CommonModule, RouterModule.forChild(KomponenPerJurusanSekolahRoutes), FormsModule, CustomTableModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule],
  declarations: [KomponenPerJurusanSekolahComponent],
})
export class KomponenPerJurusanSekolahModule { }
