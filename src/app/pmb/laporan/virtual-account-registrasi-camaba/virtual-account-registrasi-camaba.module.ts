import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { VirtualAccountRegistrasiCamabaComponent } from './virtual-account-registrasi-camaba.component';
import { VirtualAccountRegistrasiCamabaRoutes } from './virtual-account-registrasi-camaba.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomTableModule } from '../../../components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(VirtualAccountRegistrasiCamabaRoutes), FormsModule, CustomTableModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule],
  declarations: [VirtualAccountRegistrasiCamabaComponent, FormDialogComponent],
})
export class VirtualAccountRegistrasiCamabaModule {}
