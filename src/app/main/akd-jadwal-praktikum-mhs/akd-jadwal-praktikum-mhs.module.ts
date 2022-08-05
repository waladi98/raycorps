import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { AkdJadwalPraktikumMhsComponent } from './akd-jadwal-praktikum-mhs.component';
import { AkdJadwalPraktikumMhsRoutes } from './akd-jadwal-praktikum-mhs.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AkdJadwalPraktikumMhsRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule],
  declarations: [AkdJadwalPraktikumMhsComponent],
})
export class AkdJadwalPraktikumMhsModule { }
