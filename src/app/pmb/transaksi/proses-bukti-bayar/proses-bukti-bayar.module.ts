import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { ProsesBuktiBayarRoutes } from "./proses-bukti-bayar.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProsesBuktiBayarRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule,
  ],
  declarations: [FormDialogComponent],
})
export class ProsesBuktiBayarModule {}
