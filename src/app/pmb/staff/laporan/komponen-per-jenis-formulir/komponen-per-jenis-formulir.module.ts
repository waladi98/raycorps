import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../md/md.module';
import { MaterialModule } from '../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { KomponenPerJenisFormulirComponent } from './komponen-per-jenis-formulir.component';
import { KomponenPerJenisFormulirRoutes } from './komponen-per-jenis-formulir.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomTableModule } from '../../../../components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(KomponenPerJenisFormulirRoutes), FormsModule, CustomTableModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule],
  declarations: [KomponenPerJenisFormulirComponent],
})
export class KomponenPerJenisFormulirModule { }
