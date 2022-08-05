import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { ReservasiPmbComponent } from './reservasi-pmb.component';
import { ReservasiPmbRoutes } from './reservasi-pmb.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ReservasiPmbRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        RecaptchaModule,
        HttpClientModule
    ],
    declarations: [
        ReservasiPmbComponent,
    ]
})

export class ReservasiPmbModule { }
