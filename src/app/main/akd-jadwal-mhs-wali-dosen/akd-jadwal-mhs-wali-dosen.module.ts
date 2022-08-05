import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { AkdJadwalMhsWaliDosenComponent } from './akd-jadwal-mhs-wali-dosen.component';
import { AkdJadwalMhsWaliDosenRoutes } from './akd-jadwal-mhs-wali-dosen.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AkdJadwalMhsWaliDosenRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule],
  declarations: [AkdJadwalMhsWaliDosenComponent],
})
export class AkdJadwalMhsWaliDosenModule { }
