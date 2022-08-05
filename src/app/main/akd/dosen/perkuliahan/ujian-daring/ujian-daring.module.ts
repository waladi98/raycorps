import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../md/md.module';
import { MaterialModule } from '../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { UjianDaringComponent } from './ujian-daring.component';
import { UjianDaringRoutes } from './ujian-daring.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormDialogComponent } from './form-dialog/form-dialog.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(UjianDaringRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule],
  declarations: [UjianDaringComponent, FormDialogComponent],
})
export class UjianDaringModule { }
