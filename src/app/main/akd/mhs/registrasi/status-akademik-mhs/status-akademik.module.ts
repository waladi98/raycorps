import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../md/md.module';
import { MaterialModule } from '../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { StatusAkademikComponent } from './status-akademik.component';
import { StatusAkademikRoutes } from './status-akademik.routing';

import { MiniProfilComponent } from './mini-profil/mini-profil.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(StatusAkademikRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [StatusAkademikComponent, MiniProfilComponent],
})
export class StatusAkademikModule {}
