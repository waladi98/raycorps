import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { KartuKemajuanStudiComponent } from './kartu-kemajuan-studi.component';
import { ManageKartuKemajuanStudiComponent } from './manage-kartu-kemajuan-studi/manage-kartu-kemajuan-studi.component';
import { KartuKemajuanStudiRoutes } from './kartu-kemajuan-studi.routing';
import { FieldErrorDisplayComponent } from './manage-kartu-kemajuan-studi/field-error-display/field-error-display.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(KartuKemajuanStudiRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule],
  declarations: [KartuKemajuanStudiComponent, ManageKartuKemajuanStudiComponent, FieldErrorDisplayComponent],
})
export class KartuKemajuanStudiModule {}
