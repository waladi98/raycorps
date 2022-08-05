import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';

import { LaporanKehadiranMahasiswaComponent } from './laporan-kehadiran-mahasiswa.component';
import { ManageLaporanKehadiranMahasiswaComponent } from './manage-laporan-kehadiran-mahasiswa/manage-laporan-kehadiran-mahasiswa.component';
import { LaporanKehadiranMahasiswaRoutes } from './laporan-kehadiran-mahasiswa.routing';
import { FieldErrorDisplayComponent } from './manage-laporan-kehadiran-mahasiswa/field-error-display/field-error-display.component';

// Material Component
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(LaporanKehadiranMahasiswaRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, MatCardModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  declarations: [LaporanKehadiranMahasiswaComponent, ManageLaporanKehadiranMahasiswaComponent, FieldErrorDisplayComponent],
})
export class LaporanKehadiranMahasiswaModule {}
