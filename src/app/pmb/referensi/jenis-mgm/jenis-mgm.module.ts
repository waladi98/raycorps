import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { JenisMGMComponent } from "./jenis-mgm.component";
import { JenisMGMRoutes } from "./jenis-mgm.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";
import { UbahJenisMGMComponent } from "./ubah-jenis-mgm/ubah-jenis-mgm.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(JenisMGMRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule
  ],
  declarations: [JenisMGMComponent, FormDialogComponent, UbahJenisMGMComponent],
})
export class JenisMGMModule {}
