import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../md/md.module';
import { MaterialModule } from '../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { DaftarPesertaPMBComponent } from './daftar-peserta-pmb.component';
import { DaftarPesertaPMBRoutes } from './daftar-peserta-pmb.routing';
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DaftarPesertaPMBRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
        MatDialogModule
    ],
    declarations: [
        DaftarPesertaPMBComponent,
    ],
    
})

export class DaftarPesertaPMBModule { }
