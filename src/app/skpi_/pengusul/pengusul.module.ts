import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { PengusulRoutes } from "./pengusul.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PengusulRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class PengusulModule {}
