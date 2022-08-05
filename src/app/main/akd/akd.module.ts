import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { AkdRoutes } from './akd.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AkdRoutes), FormsModule, MaterialModule],
  declarations: [],
})
export class AkdModule {}
