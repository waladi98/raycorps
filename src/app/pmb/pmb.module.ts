import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";
import { PmbRoutes } from "./pmb.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PmbRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class PmbModule {}
