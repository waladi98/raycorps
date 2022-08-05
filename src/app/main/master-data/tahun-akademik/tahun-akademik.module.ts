import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";

import { TahunAkademikComponent } from "./tahun-akademik.component";
import { ManageTahunAkademikComponent } from "./manage-tahun-akademik/manage-tahun-akademik.component";
import { TahunAkademikRoutes } from "./tahun-akademik.routing";
import { FieldErrorDisplayComponent } from "./manage-tahun-akademik/field-error-display/field-error-display.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TahunAkademikRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
  ],
  declarations: [
    TahunAkademikComponent,
    ManageTahunAkademikComponent,
    FieldErrorDisplayComponent,
  ],
})
export class TahunAkademikModule {}
