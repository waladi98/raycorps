import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { SebaranKemajuanStudiComponent } from './sebaran-kemajuan-studi.component';
import { ManageSebaranKemajuanStudiComponent } from './manage-sebaran-kemajuan-studi/manage-sebaran-kemajuan-studi.component';
import { SebaranKemajuanStudiRoutes } from './sebaran-kemajuan-studi.routing';
import { FieldErrorDisplayComponent } from './manage-sebaran-kemajuan-studi/field-error-display/field-error-display.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(SebaranKemajuanStudiRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule],
  declarations: [SebaranKemajuanStudiComponent, ManageSebaranKemajuanStudiComponent, FieldErrorDisplayComponent],
})
export class SebaranKemajuanStudiModule {}
