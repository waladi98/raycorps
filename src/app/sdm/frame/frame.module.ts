import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { FrameComponent } from './frame.component';
import { FrameRoutes } from './frame.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FrameRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        RecaptchaModule,
        HttpClientModule
    ],
    declarations: [
        FrameComponent,
    ]
})

export class FrameModule { }
