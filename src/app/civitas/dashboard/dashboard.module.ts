import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MdModule } from "../../md/md.module";
import { MaterialModule } from "../../app.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutes } from "./dashboard.routing";
import { CustomTableModule } from "../../components/custom-table/custom-table.module";
import { GoogleChartsModule } from "angular-google-charts";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    FormsModule,
    MdModule,
    MaterialModule,
    NgxSpinnerModule,
    CustomTableModule,
    GoogleChartsModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
