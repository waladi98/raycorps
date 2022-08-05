import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { AturanPenilaianComponent } from './aturan-penilaian-sk3.component';
import { AturanPenilaianRoutes } from './aturan-penilaian-sk3.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CustomTableModule } from '../../../components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AturanPenilaianRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule, CustomTableModule],
  declarations: [AturanPenilaianComponent, FormDialogComponent],
})
export class AturanPenilaianModule {}
