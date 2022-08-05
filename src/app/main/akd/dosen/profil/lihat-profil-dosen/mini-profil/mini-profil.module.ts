import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../md/md.module';
import { MaterialModule } from '../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { MiniProfilComponent } from './mini-profil.component';
import { MiniProfilRoutes } from './mini-profil.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MiniProfilRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
    ],
    declarations: [
        MiniProfilComponent,
    ],
    
})

export class MiniProfilModule { }
