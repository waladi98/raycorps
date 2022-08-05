import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../md/md.module";
import { MaterialModule } from "../../../../app.module";
import { RecaptchaModule } from "ng-recaptcha";
import { HttpClientModule } from "@angular/common/http";
import { DetailPesertaComponent } from "./detail-peserta.component";
import { DetailPesertaRoutes } from "./detail-peserta.routing";
import { FormValidationMonitorModule } from "@lkovari/form-validation-monitor";
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DetailPesertaRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    RecaptchaModule,
    HttpClientModule,
    FormValidationMonitorModule,
    NgxSpinnerModule,
  ],
  declarations: [DetailPesertaComponent],
})
export class DetailPesertaModule {}
