import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../../app.module";
import { VerifikasiNilaiRoutes } from "./verifikasi-nilai.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VerifikasiNilaiRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class VerifikasiNilaiModule {}
