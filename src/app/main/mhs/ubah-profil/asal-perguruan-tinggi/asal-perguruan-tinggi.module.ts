import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../md/md.module';
import { MaterialModule } from '../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { AsalPerguruanTinggiComponent } from './asal-perguruan-tinggi.component';
import { AsalPerguruanTinggiRoutes } from './asal-perguruan-tinggi.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AsalPerguruanTinggiRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
    ],
    declarations: [
        AsalPerguruanTinggiComponent,
    ],

})

export class AsalPerguruanTinggiModule { }
