import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../md/md.module';
import { MaterialModule } from '../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { GelombangComponent } from './gelombang.component';
import { GelombangRoutes } from './gelombang.routing';
import {MatDialogModule} from '@angular/material/dialog';
import {FormDialogComponent} from './form-dialog/form-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(GelombangRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
        MatDialogModule
    ],
    declarations: [
        GelombangComponent,
        FormDialogComponent
    ]
})

export class GelombangModule { }
