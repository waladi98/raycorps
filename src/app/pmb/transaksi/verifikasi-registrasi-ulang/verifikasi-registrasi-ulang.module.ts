import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../../app.module";
import { PenyaringanPMBRoutes } from "./verifikasi-registrasi-ulang.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PenyaringanPMBRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class VerifikasiRegistrasiUlangModule {}
