import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../../md/md.module';
import { MaterialModule } from '../../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { PendidikanComponent } from './pendidikan.component';
import { MatDialogModule } from "@angular/material/dialog";
import { PendidikanRoutes } from './pendidikan.routing';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PendidikanRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
        MatDialogModule
    ],
    declarations: [
        PendidikanComponent,
    ],
    
})

export class PendidikanModule { }
