import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../../app.module";
import { TransaksiRoutes } from "./transaksi.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TransaksiRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class TransaksiModule {}
