import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";
import { MbkmRoutes } from "./mbkm.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MbkmRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class MbkmModule {}
