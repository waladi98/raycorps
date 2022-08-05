import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../../md/md.module";
import { MaterialModule } from "../../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { DispensasiUjianMhsComponent } from "./dispensasi-ujian-mhs.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DispensasiUjianMhsRoutes } from "./dispensasi-ujian-mhs.routing";
import { CustomTableModule } from "../../../../../components/custom-table/custom-table.module";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DispensasiUjianMhsRoutes),
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
  declarations: [DispensasiUjianMhsComponent, FormDialogComponent]
})

export class DispensasiUjianMhsModule { }
