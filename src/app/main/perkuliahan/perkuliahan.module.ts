import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { PerkuliahanRoutes } from './perkuliahan.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(PerkuliahanRoutes), FormsModule, MaterialModule],
  declarations: [],
})
export class PerkuliahanModule {}
