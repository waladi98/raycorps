import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../md/md.module';
import { MaterialModule } from '../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { AsalSekolahComponent } from './asal-sekolah.component';
import { AsalSekolahRoutes } from './asal-sekolah.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AsalSekolahRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
    ],
    declarations: [
        AsalSekolahComponent,
    ],

})

export class AsalSekolahModule { }
