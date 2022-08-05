import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../md/md.module';
import { MaterialModule } from '../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { PengajuanUjianSusulanComponent } from './pengajuan-ujian-susulan.component';
import { PengajuanUjianSusulanRoutes } from './pengajuan-ujian-susulan.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomTableModule } from '../../../../../components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(PengajuanUjianSusulanRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, CustomTableModule, MatDialogModule, MatFormFieldModule],
  declarations: [PengajuanUjianSusulanComponent],
})
export class PengajuanUjianSusulanModule { }
