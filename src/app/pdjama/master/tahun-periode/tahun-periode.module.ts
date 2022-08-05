import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { TahunPeriodeComponent } from "./tahun-periode.component";
import { TahunPeriodeRoutes } from "./tahun-periode.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { FormDialogEditComponent } from "./form-dialog-edit/form-dialog-edit.component";
import { FormDialogDeleteComponent } from "./form-dialog-delete/form-dialog-delete.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TahunPeriodeRoutes),
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
    TahunPeriodeComponent,
    FormDialogComponent,
    FormDialogEditComponent,
    FormDialogDeleteComponent,
  ],
})
export class tahunPeriodeModule {}
