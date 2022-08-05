import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../md/md.module';
import { MaterialModule } from '../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { RiwayatNilaiComponent } from './riwayat-nilai.component';
import { RiwayatNilaiRoutes } from './riwayat-nilai.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(RiwayatNilaiRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [RiwayatNilaiComponent],
})
export class RiwayatNilaiModule {}
