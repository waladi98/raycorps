import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../md/md.module";
import { MaterialModule } from "../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { VerifikasiKelulusanPesertaComponent } from "./verifikasi-kelulusan-peserta.component";
import { VerifikasiKelulusanPesertaRoutes } from "./verifikasi-kelulusan-peserta.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VerifikasiKelulusanPesertaRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    NgxSpinnerModule,
    HttpClientModule,
  ],
  declarations: [VerifikasiKelulusanPesertaComponent],
})
export class VerifikasiKelulusanPesertaModule {}
