import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../md/md.module';
import { MaterialModule } from '../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { JadwalPerkuliahanMhsComponent } from './jadwal-perkuliahan-mhs.component';
import { JadwalPerkuliahanMhsRoutes } from './jadwal-perkuliahan-mhs.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CustomTableModule } from 'src/app/components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(JadwalPerkuliahanMhsRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule, CustomTableModule],
  declarations: [JadwalPerkuliahanMhsComponent],
})
export class JadwalPerkuliahanMhsModule {}
