import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { AturanSK3Component } from "./aturan-sk3.component";
import { VAturanSK3Routes } from "./aturan-sk3.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { TambahAturanSK3Component } from "./tambah-aturan-sk3/tambah-aturan-sk3.component";
import { EditAturanSK3Component } from "./edit-aturan-sk3/edit-aturan-sk3.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VAturanSK3Routes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule,
  ],
  declarations: [
    AturanSK3Component,
    TambahAturanSK3Component,
    EditAturanSK3Component
  ],
})
export class AturanSK3Module {}
