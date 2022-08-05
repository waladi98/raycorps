<<<<<<< HEAD
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../../../md/md.module";
import { MaterialModule } from "../../../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { AkademikComponent } from './akademik.component';
import { AkademikRoutes } from "./akademik.routing";
=======
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../../md/md.module';
import { MaterialModule } from '../../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { AkademikComponent } from './akademik.component';
import { AkademikRoutes } from './akademik.routing';
>>>>>>> 0d74e067bcef7d5a1425b6c863dead60eef61c1a

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AkademikRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [AkademikComponent],
})
export class AkademikModule {}
