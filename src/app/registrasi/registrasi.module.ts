import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";
import { RegistrasiRoutes } from "./registrasi.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RegistrasiRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class RegistrasiModule {}
