import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../md/md.module';
import { MaterialModule } from '../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { TranskripNilaiComponent } from './transkrip-nilai.component';
import { TranskripNilaiRoutes } from './transkrip-nilai.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(TranskripNilaiRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [TranskripNilaiComponent],
})
export class TranskripNilaiModule {}
