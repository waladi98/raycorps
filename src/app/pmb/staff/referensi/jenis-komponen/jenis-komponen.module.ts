import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../md/md.module";
import { MaterialModule } from "../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { JenisKomponenComponent } from "./jenis-komponen.component";
import { JenisKomponenRoutes } from "./jenis-komponen.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(JenisKomponenRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule
  ],
  declarations: [JenisKomponenComponent, FormDialogComponent],
})
export class JenisKomponenModule {}
