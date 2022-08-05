import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { StatusDokumenComponent } from "./status-dokumen.component";
import { StatusDokumenRoutes } from "./status-dokumen.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";
import { UbahStatusDokumenComponent } from "./ubah-status-dokumen/ubah-status-dokumen.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StatusDokumenRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule
  ],
  declarations: [StatusDokumenComponent, FormDialogComponent, UbahStatusDokumenComponent],
})
export class StatusDokumenModule {}
