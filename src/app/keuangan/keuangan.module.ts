import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";
import { KeuanganRoutes } from "./keuangan.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(KeuanganRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class KeuanganModule {}
