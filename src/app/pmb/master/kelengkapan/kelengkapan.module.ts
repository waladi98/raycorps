import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { KelengkapanComponent } from "./kelengkapan.component";
import { KelengkapanRoutes } from "./kelengkapan.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./pengecualian-kelengkapan/form-dialog/form-dialog.component";
import { TambahKelengkapanComponent } from "./tambah-kelengkapan/tambah-kelengkapan.component";
import { UbahKelengkapanComponent } from "./ubah-kelengkapan/ubah-kelengkapan.component";
import { PengecualianKelengkapanComponent } from "./pengecualian-kelengkapan/pengecualian-kelengkapan.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(KelengkapanRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule
  ],
  declarations: [
    KelengkapanComponent,
    FormDialogComponent,
    TambahKelengkapanComponent,
    UbahKelengkapanComponent,
    PengecualianKelengkapanComponent,
  ],
})
export class KelengkapanModule {}
