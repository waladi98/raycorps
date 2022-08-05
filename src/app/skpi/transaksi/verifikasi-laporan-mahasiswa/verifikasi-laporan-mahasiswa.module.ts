import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { VerifikasiLaporanMahasiswaComponent } from './verifikasi-laporan-mahasiswa.component';
import { PersyaratanPerProdiRoutes } from './verifikasi-laporan-mahasiswa.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomTableModule } from '../../../components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(PersyaratanPerProdiRoutes), FormsModule, ReactiveFormsModule, CustomTableModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule],
  declarations: [VerifikasiLaporanMahasiswaComponent],
})
export class VerifikasiLaporanMahasiswaModule { }
