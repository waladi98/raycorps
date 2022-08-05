import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../../../md/md.module";
import { MaterialModule } from "../../../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { JabatanComponent } from "./jabatan.component";
import { MatDialogModule } from "@angular/material/dialog";
import { JabatanRoutes } from "./jabatan.routing";
import { CustomTableModule } from "../../../../../../components/custom-table/custom-table.module";
import { TambahJabatanComponent } from "./tambah-jabatan/tambah-jabatan.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(JabatanRoutes),
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
  declarations: [JabatanComponent, TambahJabatanComponent],
})
export class UbahProfilModule { }
