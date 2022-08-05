import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { transaksiRoutes } from "./transaksi.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(transaksiRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class TransaksiModule {}
