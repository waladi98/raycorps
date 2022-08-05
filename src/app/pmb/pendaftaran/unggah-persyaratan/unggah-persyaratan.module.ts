import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { UnggahPersyaratanComponent } from "./unggah-persyaratan.component";
import { UnggahPersyaratanRoutes } from "./unggah-persyaratan.routing";
import { UbahUnggahPersyaratanComponent } from "./ubah-persyaratan/ubah-unggah-persyaratan.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";
import { MatDialogModule } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UnggahPersyaratanRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    CustomTableModule,
    MatDialogModule,
    NgxSpinnerModule
  ],
  declarations: [UnggahPersyaratanComponent, UbahUnggahPersyaratanComponent,FormDialogComponent],
})
export class UnggahPersyaratanModule {}
