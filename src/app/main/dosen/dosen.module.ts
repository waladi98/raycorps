import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { MhsRoutes } from './dosen.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(MhsRoutes), FormsModule, MaterialModule],
  declarations: [],
})
export class DosenModule {}
