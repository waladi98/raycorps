import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { DashboardPmbPublicComponent } from './dashboard-pmb-public.component';
import { DashboardPmbPublicRoutes } from './dashboard-pmb-public.routing';
import {IvyCarouselModule} from 'angular-responsive-carousel';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardPmbPublicRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        RecaptchaModule,
        HttpClientModule,
        IvyCarouselModule
    ],
    declarations: [
        DashboardPmbPublicComponent,
    ]
})

export class DashboardPmbPublicModule { }
