import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../md/md.module";
import { MaterialModule } from "../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { KetidaksesuaianRoutes } from "./aksi.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { CustomTableModule } from "../../../../components/custom-table/custom-table.module";
import { KetidaksesuaianComponent } from "./aksi.component";
import { VerifikasiPerbaikanComponent } from "./ketidaksesuaian/ketidaksesuaian.component";
import { PenyebabComponent } from "./penyebab/penyebab.component";
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(KetidaksesuaianRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule,
    NgxSpinnerModule,
  ],
  declarations: [
    KetidaksesuaianComponent,
    VerifikasiPerbaikanComponent,
    PenyebabComponent
  ],
})
export class KetidaksesuaianModule {}
