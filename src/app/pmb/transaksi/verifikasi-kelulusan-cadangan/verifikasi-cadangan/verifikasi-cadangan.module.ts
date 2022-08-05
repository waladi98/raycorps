import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../md/md.module";
import { MaterialModule } from "../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { VerifikasiCadanganComponent } from "./verifikasi-cadangan.component";
import { VerifikasiCadanganRoutes } from "./verifikasi-cadangan.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VerifikasiCadanganRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    NgxSpinnerModule,
    HttpClientModule,
  ],
  declarations: [VerifikasiCadanganComponent],
})
export class VerifikasiCadanganModule {}
