import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { PengaturanComponent } from "./pengaturan.component";
import { PengaturanRoutes } from "./pengaturan.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PengaturanRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
  ],
  declarations: [PengaturanComponent, FormDialogComponent],
})
export class PengaturanModule {}
