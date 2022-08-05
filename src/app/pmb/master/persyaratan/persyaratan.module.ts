import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { PersyaratanComponent } from "./persyaratan.component";
import { PersyaratanRoutes } from "./persyaratan.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./pengecualian-persyaratan/form-dialog/form-dialog.component";
import { TambahPersyaratanComponent } from "./tambah-persyaratan/tambah-persyaratan.component";
import { UbahPersyaratanComponent } from "./ubah-persyaratan/ubah-persyaratan.component";
import { PengecualianPersyaratanComponent } from "./pengecualian-persyaratan/pengecualian-persyaratan.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PersyaratanRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule
  ],
  declarations: [
    PersyaratanComponent,
    FormDialogComponent,
    TambahPersyaratanComponent,
    UbahPersyaratanComponent,
    PengecualianPersyaratanComponent,
  ],
})
export class PersyaratanModule {}
