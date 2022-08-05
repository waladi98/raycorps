import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { StatusPerwalianComponent } from './status-perwalian.component';
import { MatDialogModule } from "@angular/material/dialog";
import { StatusPerwalianRoutes } from './status-perwalian.routing';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(StatusPerwalianRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
        MatDialogModule
    ],
    declarations: [
        StatusPerwalianComponent,
    ],
    
})

export class StatusPerwalianModule { }
