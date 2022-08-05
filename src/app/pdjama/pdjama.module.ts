import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";
import { PDJamaRoutes } from "./pdjama.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PDJamaRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class PDJamaModule {}
