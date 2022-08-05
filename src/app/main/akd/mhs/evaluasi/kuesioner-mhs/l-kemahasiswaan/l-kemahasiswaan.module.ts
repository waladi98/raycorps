import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../../md/md.module';
import { MaterialModule } from '../../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { LKemahasiswaanComponent } from './l-kemahasiswaan.component';
import { LKemahasiswaanRoutes } from './l-kemahasiswaan.routing';

import { MiniProfilComponent } from './mini-profil/mini-profil.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(LKemahasiswaanRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [LKemahasiswaanComponent, MiniProfilComponent],
})
export class LKemahasiswaanModule {}
