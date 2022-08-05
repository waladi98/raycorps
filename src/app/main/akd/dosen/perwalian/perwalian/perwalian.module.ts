import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../md/md.module';
import { MaterialModule } from '../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { PerwalianComponent } from './perwalian.component';
import { PerwalianRoutes } from './perwalian.routing';
import { CustomTableModule } from "../../../../../components/custom-table/custom-table.module";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(PerwalianRoutes), FormsModule, ReactiveFormsModule, CustomTableModule, MdModule, MaterialModule, HttpClientModule, MatDialogModule, MatFormFieldModule],
  declarations: [PerwalianComponent],
})
export class PerwalianModule { }
