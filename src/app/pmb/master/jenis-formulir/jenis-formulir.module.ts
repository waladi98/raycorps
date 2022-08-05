import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { JenisFormulirComponent } from "./jenis-formulir.component";
import { JenisFormulirRoutes } from "./jenis-formulir.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogProdiPilihanComponent } from "./prodi-pilihan-dan-komponen-nilai/form-dialog-prodi-pilihan/form-dialog-prodi-pilihan.component";
import { FormDialogKomponenNilaiComponent } from "./prodi-pilihan-dan-komponen-nilai/form-dialog-komponen-nilai/form-dialog-komponen-nilai.component";
import { TambahJenisFormulirComponent } from "./tambah-jenis-formulir/tambah-jenis-formulir.component";
import { UbahJenisFormulirComponent } from "./ubah-jenis-formulir/ubah-jenis-formulir.component";
import { ProdiPilihanDanKomponenNilaiComponent } from "./prodi-pilihan-dan-komponen-nilai/prodi-pilihan-dan-komponen-nilai.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";
import { FormValidationMonitorModule } from "@lkovari/form-validation-monitor";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(JenisFormulirRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule,
    FormValidationMonitorModule,
    NgxSpinnerModule
  ],
  declarations: [
    JenisFormulirComponent,
    FormDialogProdiPilihanComponent,
    FormDialogKomponenNilaiComponent,
    TambahJenisFormulirComponent,
    UbahJenisFormulirComponent,
    ProdiPilihanDanKomponenNilaiComponent,
  ],
})
export class JenisFormulirModule {}
