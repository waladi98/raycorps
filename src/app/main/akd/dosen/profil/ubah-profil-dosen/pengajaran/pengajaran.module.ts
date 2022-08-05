import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../../md/md.module';
import { MaterialModule } from '../../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { PengajaranComponent } from './pengajaran.component';
import { PengajaranRoutes } from './pengajaran.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(PengajaranRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [PengajaranComponent],
})
export class PengajaranModule { }
