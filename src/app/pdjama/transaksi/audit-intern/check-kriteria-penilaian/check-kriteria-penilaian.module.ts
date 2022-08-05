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
import { CheckKriteriaPenilaianRoutes } from "./check-kriteria-penilaian.routing";
import { CheckKriteriaPenilaianComponent } from "./check-kriteria-penilaian.component";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CheckKriteriaPenilaianRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule,
    NgxSpinnerModule,
  ],
  declarations: [CheckKriteriaPenilaianComponent],
})
export class CheckKriteriaPenilaianModule {}
