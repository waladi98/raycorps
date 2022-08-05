import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import {MatFormFieldModule} from '@angular/material/form-field';

import { UbahPassComponent } from './ubah_pass.component';
import { UbahPassRoutes } from './ubah_pass.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UbahPassRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        MatFormFieldModule
    ],
    declarations: [
        UbahPassComponent,
    ]
})

export class UbahPassModule { }
