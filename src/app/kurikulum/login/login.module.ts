import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import {MatFormFieldModule} from '@angular/material/form-field';

import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(LoginRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        MatFormFieldModule
    ],
    declarations: [
        LoginComponent,
    ]
})

export class LoginModule { }
