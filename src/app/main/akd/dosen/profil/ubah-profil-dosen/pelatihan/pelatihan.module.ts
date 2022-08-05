import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../../../md/md.module";
import { MaterialModule } from "../../../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { PelatihanComponent } from "./pelatihan.component";
import { PelatihanRoutes } from "./pelatihan.routing";
import { CustomTableModule } from "../../../../../../components/custom-table/custom-table.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PelatihanRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    CustomTableModule,
  ],
  // declarations: [PelatihanComponent],
})
export class UbahProfilModule {}
