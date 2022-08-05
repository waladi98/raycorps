import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../../app.module";
import { MasterRoutes } from "./master.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MasterRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class MasterModule {}