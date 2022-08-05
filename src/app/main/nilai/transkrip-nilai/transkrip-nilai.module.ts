import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { TranskripNilaiComponent } from './transkrip-nilai.component';
import { ManageTranskripNilaiComponent } from './manage-transkrip-nilai/manage-transkrip-nilai.component';
import { TranskripNilaiRoutes } from './transkrip-nilai.routing';
import { FieldErrorDisplayComponent } from './manage-transkrip-nilai/field-error-display/field-error-display.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(TranskripNilaiRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule],
  declarations: [TranskripNilaiComponent, ManageTranskripNilaiComponent, FieldErrorDisplayComponent],
})
export class TranskripNilaiModule {}
