import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';
import { StaffRoutes } from './staff.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StaffRoutes),
    FormsModule,
    MaterialModule
  ],
  declarations: []
})

export class StaffModule {}
