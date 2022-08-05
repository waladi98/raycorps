import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../md/md.module";
import { MaterialModule } from "../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { VerifikasiNilaiPesertaComponent } from "./verifikasi-nilai-peserta.component";
import { VerifikasiNilaiPesertaRoutes } from "./verifikasi-nilai-peserta.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VerifikasiNilaiPesertaRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    NgxSpinnerModule,
    HttpClientModule,
  ],
  declarations: [VerifikasiNilaiPesertaComponent],
})
export class VerifikasiNilaiPesertaModule {}
