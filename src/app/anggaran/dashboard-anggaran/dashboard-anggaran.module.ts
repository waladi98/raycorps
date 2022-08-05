import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../md/md.module";
import { MaterialModule } from "../../app.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { DashboardAnggaranComponent } from "./dashboard-anggaran.component";
import { DashboardAnggaranRoutes } from "./dashboard-anggaran.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardAnggaranRoutes),
    FormsModule,
    MdModule,
    MaterialModule,
    NgxSpinnerModule,
  ],
  declarations: [DashboardAnggaranComponent],
})
export class DashboardAnggaranModule {}
