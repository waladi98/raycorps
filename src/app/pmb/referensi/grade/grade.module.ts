import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { GradeComponent } from "./grade.component";
import { GradeRoutes } from "./grade.routing";
import { MatDialogModule } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";
import { UbahGradeComponent } from "./ubah-grade/ubah-grade.component"
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GradeRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    CustomTableModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  declarations: [GradeComponent, FormDialogComponent, UbahGradeComponent],
})
export class GradeModule {}
