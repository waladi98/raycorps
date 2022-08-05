import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../../md/md.module';
import { MaterialModule } from '../../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { LAdministrasiComponent } from './l-administrasi.component';
import { LAdministrasiRoutes } from './l-administrasi.routing';

import { MiniProfilComponent } from './mini-profil/mini-profil.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(LAdministrasiRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [LAdministrasiComponent, MiniProfilComponent],
})
export class LAdministrasiModule {}
