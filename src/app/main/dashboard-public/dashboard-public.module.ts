import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../md/md.module";
import { MaterialModule } from "../../app.module";
import { RecaptchaModule } from "ng-recaptcha";
import { HttpClientModule } from "@angular/common/http";
import { DashboardPublicComponent } from "./dashboard-public.component";
import { DashboardPublicRoutes } from "./dashboard-public.routing";
import { IvyCarouselModule } from "angular-responsive-carousel";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardPublicRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    RecaptchaModule,
    HttpClientModule,
    IvyCarouselModule,
  ],
  declarations: [DashboardPublicComponent],
})
export class DashboardPublicModule {}
