import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../../app.module";
import { VerifikasiKelulusanCadanganRoutes } from "./verifikasi-kelulusan-cadangan.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VerifikasiKelulusanCadanganRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class VerifikasiKelulusanCadanganModule {}
