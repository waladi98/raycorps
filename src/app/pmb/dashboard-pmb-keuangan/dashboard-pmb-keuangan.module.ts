import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { DashboardPmbKeuanganComponent } from './dashboard-pmb-keuangan.component';
import { DashboardPmbKeuanganRoutes } from './dashboard-pmb-keuangan.routing';
import {IvyCarouselModule} from 'angular-responsive-carousel';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardPmbKeuanganRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        RecaptchaModule,
        HttpClientModule,
        IvyCarouselModule
    ],
    declarations: [
        DashboardPmbKeuanganComponent,
    ]
})

export class DashboardPmbKeuanganModule { }
