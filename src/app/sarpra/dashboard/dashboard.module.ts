import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../md/md.module";
import { MaterialModule } from "../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutes } from "./dashboard.routing";
import { GoogleChartsModule } from "angular-google-charts";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    NgxSpinnerModule,
    GoogleChartsModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardKeuanganModule {}
