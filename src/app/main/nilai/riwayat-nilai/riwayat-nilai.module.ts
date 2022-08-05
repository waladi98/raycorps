import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { RiwayatNilaiComponent } from './riwayat-nilai.component';
import { ManageRiwayatNilaiComponent } from './manage-riwayat-nilai/manage-riwayat-nilai.component';
import { RiwayatNilaiRoutes } from './riwayat-nilai.routing';
import { FieldErrorDisplayComponent } from './manage-riwayat-nilai/field-error-display/field-error-display.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(RiwayatNilaiRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule],
  declarations: [RiwayatNilaiComponent, ManageRiwayatNilaiComponent, FieldErrorDisplayComponent],
})
export class RiwayatNilaiModule {}
