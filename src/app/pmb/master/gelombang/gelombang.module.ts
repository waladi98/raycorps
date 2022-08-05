import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { GelombangComponent } from "./gelombang.component";
import { GelombangRoutes } from "./gelombang.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { TambahGelombangComponent } from "./tambah-gelombang/tambah-gelombang.component";
import { UbahGelombangComponent } from "./ubah-gelombang/ubah-gelombang.component";
import { DetailGelombangComponent } from "./detail-gelombang/detail-gelombang.component";
import { FormValidationMonitorModule } from "@lkovari/form-validation-monitor";
import { NgxSpinnerModule } from "ngx-spinner";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GelombangRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    FormValidationMonitorModule,
    NgxSpinnerModule,
    CustomTableModule,
  ],
  declarations: [
    GelombangComponent,
    FormDialogComponent,
    TambahGelombangComponent,
    UbahGelombangComponent,
    DetailGelombangComponent,
  ],
})
export class GelombangModule {}
