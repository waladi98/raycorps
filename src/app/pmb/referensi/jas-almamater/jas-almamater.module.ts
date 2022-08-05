import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { JasAlmamaterComponent } from "./jas-almamater.component";
import { JasAlmamaterRoutes } from "./jas-almamater.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { UbahJasAlmamaterComponent } from "./ubah-jas-almamater/ubah-jas-almamater.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(JasAlmamaterRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule
  ],
  declarations: [JasAlmamaterComponent, FormDialogComponent, UbahJasAlmamaterComponent],
})
export class JasAlmamaterModule {}
