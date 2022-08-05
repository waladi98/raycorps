import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";
import { SkpiRoutes } from "./skpi.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SkpiRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class SkpiModule {}
