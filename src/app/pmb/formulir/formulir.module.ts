import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { PmbFormulirComponent } from './formulir.component';
import { FormulirRoutes } from './formulir.routing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormValidationMonitorModule } from '@lkovari/form-validation-monitor';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FormulirRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        RecaptchaModule,
        HttpClientModule,
        NgxSpinnerModule,
        FormValidationMonitorModule
    ],
    declarations: [
        PmbFormulirComponent,
    ],
    
})

export class FormulirModule { }
