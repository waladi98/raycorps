import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../md/md.module";
import { MaterialModule } from "../app.module";
import { Page404Component } from "./page-404.component";
import { HomeRoutes } from "./page-404.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
  ],
  declarations: [Page404Component],
})
export class Page404Module {}
