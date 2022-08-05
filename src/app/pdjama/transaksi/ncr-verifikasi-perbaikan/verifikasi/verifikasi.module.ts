import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../md/md.module";
import { MaterialModule } from "../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { VerifikasiRoutes } from "./verifikasi.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { CustomTableModule } from "../../../../components/custom-table/custom-table.module";
import { VerifikasiComponent } from "./verifikasi.component";
import { VerifikasiPerbaikanComponent } from "./verifikasi-perbaikan/verifikasi-perbaikan.component";
import { TindakanLanjutComponent } from "./tindakan-lanjut/tindakan-lanjut.component";
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VerifikasiRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule,
    NgxSpinnerModule,
  ],
  declarations: [
    VerifikasiComponent,
    VerifikasiPerbaikanComponent,
    TindakanLanjutComponent
  ],
})
export class VerifikasiModule {}
