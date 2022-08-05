import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { StatusSeleksiComponent } from "./status-seleksi.component";
import { StatusSeleksiRoutes } from "./status-seleksi.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";
import { UbahStatusSeleksiComponent } from "./ubah-status-seleksi/ubah-status-seleksi.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StatusSeleksiRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule
  ],
  declarations: [StatusSeleksiComponent, FormDialogComponent, UbahStatusSeleksiComponent],
})
export class StatusSeleksiModule {}
