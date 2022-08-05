import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { AkdJadwalPerkuliahanMhsComponent } from './akd-jadwal-perkuliahan-mhs.component';
import { AkdJadwalPerkuliahanMhsRoutes } from './akd-jadwal-perkuliahan-mhs.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AkdJadwalPerkuliahanMhsRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule],
  declarations: [AkdJadwalPerkuliahanMhsComponent],
})
export class AkdJadwalPerkuliahanMhsModule { }
