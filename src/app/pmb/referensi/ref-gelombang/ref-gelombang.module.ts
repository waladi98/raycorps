import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { RefGelombangComponent } from './ref-gelombang.component';
import { RefGelombangRoutes } from './ref-gelombang.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RefGelombangRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        RefGelombangComponent,
    ]
})

export class RefGelombangModule { }
