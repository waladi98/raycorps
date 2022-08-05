import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { RecaptchaModule } from "ng-recaptcha";
import { HttpClientModule } from "@angular/common/http";
import { RegistrasiUlangComponent } from "./registrasi-ulang.component";
import { RegistrasiUlangRoutes } from "./registrasi-ulang.routing";
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RegistrasiUlangRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    RecaptchaModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  declarations: [RegistrasiUlangComponent],
})
export class RegistrasiUlangModule {}
