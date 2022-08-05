import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../../md/md.module';
import { MaterialModule } from '../../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { PenelitianComponent } from './penelitian.component';
import { PenelitianRoutes } from './penelitian.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(PenelitianRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [PenelitianComponent],
})
export class PenelitianModule { }
