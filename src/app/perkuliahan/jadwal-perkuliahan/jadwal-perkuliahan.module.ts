import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';

import { JadwalPerkuliahanComponent } from './jadwal-perkuliahan.component';
import { ManageJadwalPerkuliahanComponent } from './manage-jadwal-perkuliahan/manage-jadwal-perkuliahan.component';
import { JadwalPerkuliahanRoutes } from './jadwal-perkuliahan.routing';
import { FieldErrorDisplayComponent } from './manage-jadwal-perkuliahan/field-error-display/field-error-display.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(JadwalPerkuliahanRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        MatTabsModule
    ],
    declarations: [
        JadwalPerkuliahanComponent,
        ManageJadwalPerkuliahanComponent,
        FieldErrorDisplayComponent
    ]
})

export class JadwalPerkuliahanModule { }
