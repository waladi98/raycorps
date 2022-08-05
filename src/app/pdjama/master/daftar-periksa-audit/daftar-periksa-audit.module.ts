import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { DaftarPeriksaComponent } from "./daftar-periksa-audit.component";
import { ButirPenilaianRoutes } from "./daftar-periksa-audit.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { FormDialogEditComponent } from "./form-dialog-edit/form-dialog-edit.component";
import { FormDialogDeleteComponent } from "./form-dialog-delete/form-dialog-delete.component";
import { FormDialogKPComponent } from "./kp-form-dialog/kp-form-dialog.component";
import { FormDialogKPEditComponent } from "./kp-form-dialog-edit/form-dialog-edit.component";
import { FormDialogKPDeleteComponent } from "./kp-form-dialog-delete/form-dialog-delete.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ButirPenilaianRoutes),
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
    DaftarPeriksaComponent,
    FormDialogComponent,
    FormDialogKPComponent,
    FormDialogEditComponent,
    FormDialogDeleteComponent,
    FormDialogKPDeleteComponent,
    FormDialogKPEditComponent
  ],
})
export class DaftarPeriksaModule {}