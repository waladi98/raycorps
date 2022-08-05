import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { NCRPerbaikanComponent } from "./ncr-perbaikan.component";
import { NCRPerbaikanRoutes } from "./ncr-perbaikan.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(NCRPerbaikanRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule,
    NgxSpinnerModule,
  ],
  declarations: [
    NCRPerbaikanComponent
  ],
})
export class NCRPerbaikanModule {}
