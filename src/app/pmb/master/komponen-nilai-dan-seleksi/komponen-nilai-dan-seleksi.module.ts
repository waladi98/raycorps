import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { KomponenNilaiDanSeleksiComponent } from "./komponen-nilai-dan-seleksi.component";
import { KomponenNilaiDanSeleksiRoutes } from "./komponen-nilai-dan-seleksi.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { DetailKomponenNilaiComponent } from "./detail-komponen-nilai/detail-komponen-nilai.component";
import { TambahDataComponent } from "./tambah-data/tambah-data.component";
import { FormDialogDetailComponent } from "./detail-komponen-nilai/form-dialog-detail/form-dialog-detail.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(KomponenNilaiDanSeleksiRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule
  ],
  declarations: [
    KomponenNilaiDanSeleksiComponent,
    FormDialogComponent,
    TambahDataComponent,
    DetailKomponenNilaiComponent,
    FormDialogDetailComponent,
  ],
})
export class KomponenNilaiDanSeleksiModule {}
