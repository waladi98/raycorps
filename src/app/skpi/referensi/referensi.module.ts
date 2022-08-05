import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { ReferensiSKPIRoutes } from "./referensi.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReferensiSKPIRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class ReferensiModule {}
