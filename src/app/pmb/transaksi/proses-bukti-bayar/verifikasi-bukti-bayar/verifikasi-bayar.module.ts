import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../md/md.module";
import { MaterialModule } from "../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { VerifikasiBayarComponent } from "./verifikasi-bayar.component";
import { VerifikasiBayarRoutes } from "./verifikasi-bayar.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VerifikasiBayarRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    NgxSpinnerModule,
    HttpClientModule,
  ],
  declarations: [VerifikasiBayarComponent],
})
export class VerifikasiBayarModule {}
