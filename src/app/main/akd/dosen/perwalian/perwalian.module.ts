import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../app.module';
import { ProfilRoutes } from './perwalian.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ProfilRoutes), FormsModule, MaterialModule],
  declarations: [],
})
export class PerwalianModule {}
