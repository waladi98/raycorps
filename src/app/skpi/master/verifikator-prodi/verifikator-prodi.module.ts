import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { VerifikatorProdiComponent } from "./verifikator-prodi.component";
import { VerifikatorProdiRoutes } from "./verifikator-prodi.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./pengecualian-guru/form-dialog/form-dialog.component";
import { TambahGuruComponent } from "./tambah-guru/tambah-guru.component";
import { UbahGuruComponent } from "./ubah-guru/ubah-guru.component";
import { PengecualianGuruComponent } from "./pengecualian-guru/pengecualian-guru.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VerifikatorProdiRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule
  ],
  declarations: [
    VerifikatorProdiComponent,
    FormDialogComponent,
    TambahGuruComponent,
    UbahGuruComponent,
    PengecualianGuruComponent,
  ],
})
export class VerifikatorProdiModule {}
