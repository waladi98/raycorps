import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../../md/md.module';
import { MaterialModule } from '../../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { NilaiPerSemesterComponent } from './nilai-persemester.component';
import { NilaiPerSemesterRoutes } from './nilai-persemester.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(NilaiPerSemesterRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [NilaiPerSemesterComponent],
})
export class NilaiPerSemesterModule {}
