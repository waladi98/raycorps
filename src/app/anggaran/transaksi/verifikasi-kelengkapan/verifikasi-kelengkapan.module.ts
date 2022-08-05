import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../../app.module";
import { VerifikasiKelengkapanRoutes } from "./verifikasi-kelengkapan.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VerifikasiKelengkapanRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class VerifikasiKelengkapanModule {}
