import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../md/md.module";
import { MaterialModule } from "../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { VerifikasiPesertaComponent } from "./verifikasi-peserta.component";
import { VerifikasiPesertaRoutes } from "./verifikasi-peserta.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VerifikasiPesertaRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    NgxSpinnerModule,
    HttpClientModule,
  ],
  declarations: [VerifikasiPesertaComponent],
})
export class VerifikasiPesertaModule {}
