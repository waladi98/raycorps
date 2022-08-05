import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { EditTranskripNilaiComponent } from './edit-transkrip-nilai.component';
import { ManageEditTranskripNilaiComponent } from './manage-edit-transkrip-nilai/manage-edit-transkrip-nilai.component';
import { EditTranskripNilaiRoutes } from './edit-transkrip-nilai.routing';
import { FieldErrorDisplayComponent } from './manage-edit-transkrip-nilai/field-error-display/field-error-display.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(EditTranskripNilaiRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule],
  declarations: [EditTranskripNilaiComponent, ManageEditTranskripNilaiComponent, FieldErrorDisplayComponent],
})
export class EditTranskripNilaiModule {}
