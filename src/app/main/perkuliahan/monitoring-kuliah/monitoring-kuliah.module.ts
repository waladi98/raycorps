import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { MonitoringKuliahComponent } from './monitoring-kuliah.component';
import { ManageMonitoringKuliahComponent } from './manage-monitoring-kuliah/manage-monitoring-kuliah.component';
import { MonitoringKuliahRoutes } from './monitoring-kuliah.routing';
import { FieldErrorDisplayComponent } from './manage-monitoring-kuliah/field-error-display/field-error-display.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MonitoringKuliahRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [
        MonitoringKuliahComponent,
        ManageMonitoringKuliahComponent,
        FieldErrorDisplayComponent
    ]
})

export class MonitoringKuliahModule { }
