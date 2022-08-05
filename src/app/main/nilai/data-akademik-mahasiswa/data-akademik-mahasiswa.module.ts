import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { DataAkademikMahasiswaComponent } from './data-akademik-mahasiswa.component';
import { EditDataAkademikMahasiswaComponent } from './edit-data-akademik-mahasiswa/edit-data-akademik-mahasiswa.component';
import { DataAkademikMahasiswaRoutes } from './data-akademik-mahasiswa.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(DataAkademikMahasiswaRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule],
  declarations: [DataAkademikMahasiswaComponent, EditDataAkademikMahasiswaComponent],
})
export class DataAkademikMahasiswaModule {}
