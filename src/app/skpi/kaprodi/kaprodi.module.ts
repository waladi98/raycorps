import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { KaprodiSKPIRoutes } from "./kaprodi.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(KaprodiSKPIRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class KaprodiModule {}
