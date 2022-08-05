import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { VirtualAccountComponent } from './virtual-account.component';
import { VirtualAccountRoutes } from './virtual-account.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomTableModule } from '../../../components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(VirtualAccountRoutes), FormsModule, ReactiveFormsModule, MdModule, CustomTableModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule],
  declarations: [VirtualAccountComponent, FormDialogComponent],
})
export class VirtualAccountModule {}
