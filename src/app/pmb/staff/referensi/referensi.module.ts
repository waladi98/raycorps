import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../app.module';
import { ReferensiRoutes } from './referensi.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReferensiRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: []
})

export class ReferensiModule {}
