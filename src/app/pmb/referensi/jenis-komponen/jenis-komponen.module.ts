import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { JenisKomponenComponent } from "./jenis-komponen.component";
import { JenisKomponenRoutes } from "./jenis-komponen.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { UbahJenisKomponenComponent } from "./ubah-jenis-komponen/ubah-jenis-komponen.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(JenisKomponenRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule
  ],
  declarations: [JenisKomponenComponent, FormDialogComponent, UbahJenisKomponenComponent],
})
export class JenisKomponenModule {}
