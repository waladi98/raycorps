import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../../md/md.module';
import { MaterialModule } from '../../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { LAkademikPmbComponent } from './l-akademik-pmb.component';
import { LAkademikPmbRoutes } from './l-akademik-pmb.routing';

import { MiniProfilComponent } from './mini-profil/mini-profil.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(LAkademikPmbRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [LAkademikPmbComponent, MiniProfilComponent],
})
export class LAkademikPmbModule {}
