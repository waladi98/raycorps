import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../md/md.module";
import { MaterialModule } from "../app.module";
import { RecaptchaModule } from "ng-recaptcha";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HomeAppComponent } from "./homeApp.component";
import { HomeAppRoutes } from "./homeAPp.routing";
import { IvyCarouselModule } from "angular-responsive-carousel";
// import { ApiInterceptor } from "../core/services/api";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeAppRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    RecaptchaModule,
    HttpClientModule,
    IvyCarouselModule,
  ],
  declarations: [HomeAppComponent],
  // providers: [
  //     { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: false },
  //   ],
})
export class HomeAppModule {}
