import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { KoreksiNilaiMahasiswaComponent } from './koreksi-nilai-mahasiswa.component';
import { ManageKoreksiNilaiMahasiswaComponent } from './manage-koreksi-nilai-mahasiswa/manage-koreksi-nilai-mahasiswa.component';
import { KoreksiNilaiMahasiswaRoutes } from './koreksi-nilai-mahasiswa.routing';
import { FieldErrorDisplayComponent } from './manage-koreksi-nilai-mahasiswa/field-error-display/field-error-display.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(KoreksiNilaiMahasiswaRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule],
  declarations: [KoreksiNilaiMahasiswaComponent, ManageKoreksiNilaiMahasiswaComponent, FieldErrorDisplayComponent],
})
export class KoreksiNilaiMahasiswaModule {}
