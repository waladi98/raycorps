import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../md/md.module';
import { MaterialModule } from '../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { KeuanganComponent } from './keuangan.component';
import { KeuanganRoutes } from './keuangan.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(KeuanganRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [KeuanganComponent],
})
export class KeuanganModule {}
