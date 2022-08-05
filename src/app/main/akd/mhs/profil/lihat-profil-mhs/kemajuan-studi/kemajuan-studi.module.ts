import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../../md/md.module';
import { MaterialModule } from '../../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { KemajuanStudiComponent } from './kemajuan-studi.component';
import { KemajuanStudiRoutes } from './kemajuan-studi.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(KemajuanStudiRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [KemajuanStudiComponent],
})
export class KemajuanStudiModule {}
