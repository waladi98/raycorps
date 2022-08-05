import { NgModule } from "@angular/core";
import { MdModule } from "../../../../md/md.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { CustomTableModule } from "../../../../components/custom-table/custom-table.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { KriteriaPenilaianRoutes } from "./kriteria-penilaian.routing";
import { KriteriaPenilaianComponent } from "./kriteria-penilaian.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(KriteriaPenilaianRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule,
    NgxSpinnerModule
  ],
  declarations: [
    KriteriaPenilaianComponent,
    // FormDialogKPComponent,
    // FormDialogKPDeleteComponent,
    // FormDialogKPEditComponent
  ],
})
export class KriteriaPenilaianModule {}
