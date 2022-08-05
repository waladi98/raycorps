import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { TransaksiAnggaranRoutes } from "./transaksi.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TransaksiAnggaranRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class TransaksiModule {}
