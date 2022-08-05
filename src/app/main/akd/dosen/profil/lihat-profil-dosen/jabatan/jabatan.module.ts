import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../../md/md.module';
import { MaterialModule } from '../../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { JabatanComponent } from './jabatan.component';
import { JabatanRoutes } from './jabatan.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(JabatanRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [JabatanComponent],
})
export class JabatanModule { }
