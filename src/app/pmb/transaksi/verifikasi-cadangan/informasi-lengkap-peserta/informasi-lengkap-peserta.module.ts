import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../md/md.module";
import { MaterialModule } from "../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { RecaptchaModule } from "ng-recaptcha";
import { InformasiLengkapPesertaComponent } from "./informasi-lengkap-peserta.component";
import { InformasiLengkapPesertaRoutes } from "./informasi-lengkap-peserta.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InformasiLengkapPesertaRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    NgxSpinnerModule,
    RecaptchaModule,
  ],
  declarations: [InformasiLengkapPesertaComponent],
})
export class InformasiLengkapPesertaModule {}
