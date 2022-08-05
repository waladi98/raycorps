import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { BerandaComponent } from './beranda.component';
import { BerandaRoutes } from './beranda.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(BerandaRoutes),
        FormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [BerandaComponent]
})

export class BerandaModule {}
