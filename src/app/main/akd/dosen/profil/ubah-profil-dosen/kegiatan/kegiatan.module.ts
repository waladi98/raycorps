import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../../md/md.module';
import { MaterialModule } from '../../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { KegiatanComponent } from './kegiatan.component';
import { DataPribadiRoutes } from './kegiatan.routing';
import { CustomTableModule } from '../../../../../../components/custom-table/custom-table.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DataPribadiRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
        CustomTableModule
    ],
    declarations: [
        KegiatanComponent,
        CustomTableModule
    ],
    
})

export class UbahProfilModule { }
