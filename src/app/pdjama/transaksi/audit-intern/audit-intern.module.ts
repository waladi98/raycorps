import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { AuditInternComponent } from "./audit-intern.component";
import { AuditInternRoutes } from "./audit-intern.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { FormDialogDeleteComponent } from "./form-dialog-delete/form-dialog-delete.component";
import { FormDialogEditComponent } from "./form-dialog-edit/form-dialog-edit.component";
import { FormKriteriaPenilaianComponent } from "./form-kriteria-penilaian/form-kriteria-penilaian.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuditInternRoutes),
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
    AuditInternComponent,
    FormDialogComponent,
    FormDialogEditComponent,
    FormDialogDeleteComponent,
    FormKriteriaPenilaianComponent
  ],
})
export class AuditInternModule {}
