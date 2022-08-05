import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import {IvyCarouselModule} from 'angular-responsive-carousel';
// import { ApiInterceptor } from "../core/services/api";



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(HomeRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        RecaptchaModule,
        HttpClientModule,
        IvyCarouselModule
    ],
    declarations: [
        HomeComponent,
    ],
    // providers: [
    //     { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: false },
    //   ],
})

export class HomeModule { }
