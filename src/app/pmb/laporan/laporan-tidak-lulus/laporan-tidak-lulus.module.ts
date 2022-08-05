import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { LaporanTidakLulusComponent } from "./laporan-tidak-lulus.component";
import { LaporanTidakLulusRoutes } from "./laporan-tidak-lulus.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CustomTableModule } from '../../../components/custom-table/custom-table.module';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LaporanTidakLulusRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    CustomTableModule,
    NgxSpinnerModule
  ],
  declarations: [LaporanTidakLulusComponent, FormDialogComponent],
})
export class LaporanTidakLulusModule {}
