import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../app.module';
import { DosenRoutes } from './dosen.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(DosenRoutes), FormsModule, MaterialModule],
  declarations: [],
})
export class DosenModule {}
