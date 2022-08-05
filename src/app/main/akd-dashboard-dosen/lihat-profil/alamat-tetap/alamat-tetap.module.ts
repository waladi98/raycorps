import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../md/md.module';
import { MaterialModule } from '../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { AlamatTetapComponent } from './alamat-tetap.component';
import { AlamatTetapRoutes } from './alamat-tetap.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AlamatTetapRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [AlamatTetapComponent],
})
export class AlamatTetapModule {}
