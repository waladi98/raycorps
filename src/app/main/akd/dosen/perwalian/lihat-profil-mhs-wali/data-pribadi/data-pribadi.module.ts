import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../../md/md.module';
import { MaterialModule } from '../../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { DataPribadiComponent } from './data-pribadi.component';
import { DataPribadiRoutes } from './data-pribadi.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DataPribadiRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
    ],
    declarations: [
        DataPribadiComponent,
    ],
    
})

export class UbahProfilModule { }
