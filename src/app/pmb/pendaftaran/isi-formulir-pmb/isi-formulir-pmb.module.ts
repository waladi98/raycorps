import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { RecaptchaModule } from "ng-recaptcha";
import { HttpClientModule } from "@angular/common/http";
import { IsiFormulirPmbComponent } from "./isi-formulir-pmb.component";
import { IsiFormulirPmbRoutes } from "./isi-formulir-pmb.routing";
import { FormValidationMonitorModule } from "@lkovari/form-validation-monitor";
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(IsiFormulirPmbRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    RecaptchaModule,
    HttpClientModule,
    FormValidationMonitorModule,
    NgxSpinnerModule,
  ],
  declarations: [IsiFormulirPmbComponent],
})
export class IsiFormulirPmbModule {}
