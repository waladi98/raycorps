import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { NCRKetidaksesuaianComponent } from "./ncr-ketidaksesuaian.component";
import { NCRVerifikasiPerbaikanRoutes } from "./ncr-ketidaksesuaian.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(NCRVerifikasiPerbaikanRoutes),
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
    NCRKetidaksesuaianComponent
  ],
})
export class NCRKetidaksesuaianModule {}
