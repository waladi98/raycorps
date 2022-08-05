import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { KartuHasilStudiComponent } from './kartu-hasil-studi.component';
import { ManageKartuHasilStudiComponent } from './manage-kartu-hasil-studi/manage-kartu-hasil-studi.component';
import { KartuHasilStudiRoutes } from './kartu-hasil-studi.routing';
import { FieldErrorDisplayComponent } from './manage-kartu-hasil-studi/field-error-display/field-error-display.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(KartuHasilStudiRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule],
  declarations: [KartuHasilStudiComponent, ManageKartuHasilStudiComponent, FieldErrorDisplayComponent],
})
export class KartuHasilStudiModule {}
