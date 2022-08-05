import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { PesertaComponent } from "./peserta.component";
import { PesertaRoutes } from "./peserta.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CustomTableModule } from '../../../components/custom-table/custom-table.module';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PesertaRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    CustomTableModule,
    NgxSpinnerModule
  ],
  declarations: [PesertaComponent, FormDialogComponent],
})
export class PesertaModule {}
