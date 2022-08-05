import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { UsulanSKPIComponent } from './usulan-skpi.component';
import { UsulanSKPIRoutes } from './usulan-skpi.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CustomTableModule } from '../../../components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(UsulanSKPIRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule, CustomTableModule],
  declarations: [UsulanSKPIComponent, FormDialogComponent],
})
export class UsulanSKPIModule {}
