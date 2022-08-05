import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../md/md.module';
import { MaterialModule } from '../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomTableComponent } from './custom-table.component';
import { BlockUIModule } from 'ng-block-ui';
import { DialogFilterBuilder } from './dialog-filter-builder/dialog-filter-builder.componet';
import { TranslocoCoreModule } from '../../core/transloco/transloco.module';

@NgModule({
    declarations: [CustomTableComponent,DialogFilterBuilder],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        BlockUIModule.forRoot(),
        TranslocoCoreModule
        // BrowserModule

    ],
    exports: [CustomTableComponent],
})
export class CustomTableModule {}

