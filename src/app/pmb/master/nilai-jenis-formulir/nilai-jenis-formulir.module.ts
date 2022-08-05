import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { NilaiJenisFormulirComponent } from "./nilai-jenis-formulir.component";
import { NilaiJenisFormulirRoutes } from "./nilai-jenis-formulir.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(NilaiJenisFormulirRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
  ],
  declarations: [NilaiJenisFormulirComponent, FormDialogComponent],
})
export class NilaiJenisFormulirModule {}
