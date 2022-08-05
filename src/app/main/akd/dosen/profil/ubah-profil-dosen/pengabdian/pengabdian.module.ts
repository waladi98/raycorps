import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../../md/md.module';
import { MaterialModule } from '../../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { PengabdianComponent } from './pengabdian.component';
import { MatDialogModule } from "@angular/material/dialog";
import { PengabdianRoutes } from './pengabdian.routing';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PengabdianRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
        MatDialogModule
    ],
    declarations: [
        PengabdianComponent,
    ],
    
})

export class PengabdianModule { }
