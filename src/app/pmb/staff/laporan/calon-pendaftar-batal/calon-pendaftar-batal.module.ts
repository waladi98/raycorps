import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../md/md.module';
import { MaterialModule } from '../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { CalonPendaftarBatalComponent } from './calon-pendaftar-batal.component';
import { CalonPendaftarBatalRoutes } from './calon-pendaftar-batal.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CustomTableModule } from '../../../../components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(CalonPendaftarBatalRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule, CustomTableModule],
  declarations: [CalonPendaftarBatalComponent, FormDialogComponent],
})
export class CalonPendaftarBatalModule {}
