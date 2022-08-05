import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { MasterPMBRoutes } from "./humas.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MasterPMBRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class HumasModule {}
