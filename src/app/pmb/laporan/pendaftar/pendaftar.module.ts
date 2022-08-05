import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { PendaftarComponent } from './pendaftar.component';
import { PendaftarRoutes } from './pendaftar.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomTableModule } from '../../../components/custom-table/custom-table.module';
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
@NgModule({
  imports: [CommonModule, RouterModule.forChild(PendaftarRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule, CustomTableModule],
  declarations: [PendaftarComponent,FormDialogComponent],
})
export class PendaftarModule {}
