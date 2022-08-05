import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../md/md.module';
import { MaterialModule } from '../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { OrangTuaComponent } from './orang-tua.component';
import { OrangTuaRoutes } from './orang-tua.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(OrangTuaRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
    ],
    declarations: [
        OrangTuaComponent,
    ],
    
})

export class UbahProfilModule { }
