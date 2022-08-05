import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { RecaptchaModule } from "ng-recaptcha";
import { HttpClientModule } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { DashboardHumasSkpiComponent } from "./dashboard-humas-skpi.component";
import { DashboardHumasSkpiRoutes } from "./dashboard-humas-skpi.routing";
import { IvyCarouselModule } from "angular-responsive-carousel";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";
import { GoogleChartsModule } from "angular-google-charts";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardHumasSkpiRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    RecaptchaModule,
    HttpClientModule,
    NgxSpinnerModule,
    IvyCarouselModule,
    CustomTableModule,
    GoogleChartsModule,
  ],
  declarations: [DashboardHumasSkpiComponent],
})
export class DashboardHumasSkpiModule {}
