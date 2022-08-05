import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../md/md.module";
import { MaterialModule } from "../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { DetailKomponenNilaiComponent } from "./detail-komponen-nilai.component";
import { DetailKomponenNilaiRoutes } from "./detail-komponen-nilai.routing";
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DetailKomponenNilaiRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
  ],
  declarations: [ ],
})
export class DetailKomponenNilaiModule {}
