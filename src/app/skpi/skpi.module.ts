import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";
import { SpmiRoutes } from "./skpi.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SpmiRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class SkpiModule {}
