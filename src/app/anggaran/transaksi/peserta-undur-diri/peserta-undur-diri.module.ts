import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { PesertaUndurDiriComponent } from "./peserta-undur-diri.component";
import { PesertaUndurDiriRoutes } from "./peserta-undur-diri.routing";
import { UbahUnggahKelengkapanComponent } from "./ubah-kelengkapan/ubah-unggah-kelengkapan.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";
import { MatDialogModule } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PesertaUndurDiriRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    CustomTableModule,
    MatDialogModule,
    NgxSpinnerModule
  ],
  declarations: [PesertaUndurDiriComponent, UbahUnggahKelengkapanComponent,FormDialogComponent],
})
export class PesertaUndurDiriModule {}
