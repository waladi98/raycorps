import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { InformasiRoutes } from "./informasi.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InformasiRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class MasterModule {}
