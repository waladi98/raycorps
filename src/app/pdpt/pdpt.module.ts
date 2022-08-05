import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";
import { PdptRoutes } from "./pdpt.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PdptRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class PdptModule {}
