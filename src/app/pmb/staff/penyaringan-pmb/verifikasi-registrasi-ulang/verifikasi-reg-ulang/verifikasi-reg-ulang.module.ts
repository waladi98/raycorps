import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../md/md.module';
import { MaterialModule } from '../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { VerifikasiRegUlangComponent } from './verifikasi-reg-ulang.component';
import { VerifikasiRegUlangRoutes } from './verifikasi-reg-ulang.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(VerifikasiRegUlangRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule
    ],
    declarations: [
        VerifikasiRegUlangComponent,
    ],
    
})

export class VerifikasiRegUlangModule { }
