import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../../app.module";
import { VerifikasiKelulusanDanNilaiRoutes } from "./verifikasi-kelulusan-dan-nilai.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VerifikasiKelulusanDanNilaiRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class VerifikasiKelulusanDanNilaiModule {}
