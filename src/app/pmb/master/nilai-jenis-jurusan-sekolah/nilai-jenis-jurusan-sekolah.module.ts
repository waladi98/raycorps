import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { NilaiJenisJurusanSekolahComponent } from "./nilai-jenis-jurusan-sekolah.component";
import { NilaiJenisJurusanSekolahRoutes } from "./nilai-jenis-jurusan-sekolah.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(NilaiJenisJurusanSekolahRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
  ],
  declarations: [NilaiJenisJurusanSekolahComponent, FormDialogComponent],
})
export class NilaiJenisJurusanSekolahModule {}
