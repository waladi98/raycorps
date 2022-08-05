import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { NilaiRoutes } from './nilai.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(NilaiRoutes), FormsModule, MaterialModule],
  declarations: [],
})
export class NilaiModule {}
