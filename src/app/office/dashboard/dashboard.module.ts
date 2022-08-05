import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { CustomTableModule } from 'src/app/components/custom-table/custom-table.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(DashboardRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, RecaptchaModule, HttpClientModule, IvyCarouselModule, CustomTableModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
