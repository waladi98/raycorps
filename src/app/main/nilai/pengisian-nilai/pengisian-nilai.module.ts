import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { PengisianNilaiComponent } from './pengisian-nilai.component';
import { ManagePengisianNilaiComponent } from './manage-pengisian-nilai/manage-pengisian-nilai.component';
import { PengisianNilaiRoutes } from './pengisian-nilai.routing';
import { FieldErrorDisplayComponent } from './manage-pengisian-nilai/field-error-display/field-error-display.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(PengisianNilaiRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule],
  declarations: [PengisianNilaiComponent, ManagePengisianNilaiComponent, FieldErrorDisplayComponent],
})
export class PengisianNilaiModule {}
