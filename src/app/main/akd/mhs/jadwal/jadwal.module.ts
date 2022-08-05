import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../app.module';
import { JadwalRoutes } from './jadwal.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(JadwalRoutes), FormsModule, MaterialModule],
  declarations: [],
})
export class JadwalModule {}
