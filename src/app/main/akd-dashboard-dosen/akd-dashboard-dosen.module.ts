import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { AkdDashboardDosenRoutes } from './akd-dashboard-dosen.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AkdDashboardDosenRoutes), FormsModule, MaterialModule],
  declarations: [],
})
export class AkdDashboardDosenModule {}
