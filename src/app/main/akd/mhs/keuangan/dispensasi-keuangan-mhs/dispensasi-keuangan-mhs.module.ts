import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../../md/md.module";
import { MaterialModule } from "../../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { DispensasiKeuanganMhsComponent } from "./dispensasi-keuangan-mhs.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DispensasiKeuanganMhsRoutes } from "./dispensasi-keuangan-mhs.routing";
import { CustomTableModule } from "../../../../../components/custom-table/custom-table.module";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DispensasiKeuanganMhsRoutes),
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
  declarations: [DispensasiKeuanganMhsComponent, FormDialogComponent]
})

export class DispensasiKeuanganMhsModule { }
