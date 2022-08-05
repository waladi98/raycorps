import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../md/md.module';
import { MaterialModule } from '../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { TugasAkhirMhsComponent } from './tugas-akhir-mhs.component';
import { TugasAkhirMhsRoutes } from './tugas-akhir-mhs.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(TugasAkhirMhsRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
    ],
    declarations: [
        TugasAkhirMhsComponent,
    ],
    
})

export class TugasAkhirMhsModule { }
