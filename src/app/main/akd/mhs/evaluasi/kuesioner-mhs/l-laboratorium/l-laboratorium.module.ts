import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../../md/md.module';
import { MaterialModule } from '../../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { LLaboratoriumComponent } from './l-laboratorium.component';
import { LLaboratoriumRoutes } from './l-laboratorium.routing';

import { MiniProfilComponent } from './mini-profil/mini-profil.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(LLaboratoriumRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [LLaboratoriumComponent, MiniProfilComponent],
})
export class LLaboratoriumModule {}
