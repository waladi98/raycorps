import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { LaporanRoutes } from "./laporan.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LaporanRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class LaporanModule {}
