import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";
import { SdmRoutes } from "./sdm.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SdmRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class SdmModule {}
