import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { DekanSKPIRoutes } from "./dekan.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DekanSKPIRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class DekanModule {}
