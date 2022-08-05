import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../../../md/md.module";
import { MaterialModule } from "../../../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { PekerjaanComponent } from "./pekerjaan.component";
import { MatDialogModule } from "@angular/material/dialog";
import { PekerjaanRoutes } from "./pekerjaan.routing";
import { CustomTableModule } from "../../../../../../components/custom-table/custom-table.module";
import { TambahPekerjaanComponent } from "./tambah-pekerjaan/tambah-pekerjaan.component";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PekerjaanRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    CustomTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  declarations: [PekerjaanComponent, TambahPekerjaanComponent],
})
export class UbahProfilModule {}
