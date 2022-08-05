import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { PersyaratanPerProdiComponent } from './persyaratan-per-prodi.component';
import { PersyaratanPerProdiRoutes } from './persyaratan-per-prodi.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomTableModule } from '../../../components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(PersyaratanPerProdiRoutes), FormsModule, ReactiveFormsModule, CustomTableModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule],
  declarations: [PersyaratanPerProdiComponent],
})
export class PersyaratanPerProdiModule { }
