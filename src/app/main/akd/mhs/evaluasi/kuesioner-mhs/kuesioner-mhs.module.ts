import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../md/md.module';
import { MaterialModule } from '../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { KuesionerComponent } from './kuesioner-mhs.component';
import { KuesionerRoutes } from './kuesioner-mhs.routing';

import { MiniProfilComponent } from './mini-profil/mini-profil.component';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(KuesionerRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
    declarations: [KuesionerComponent, MiniProfilComponent],
})
export class KuesionerModule { }
