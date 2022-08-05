import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../md/md.module";
import { MaterialModule } from "../../app.module";

import { DashboardAdminComponent } from "./dashboard-admin.component";
import { DashboardAdminRoutes } from "./dashboard-admin.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardAdminRoutes),
    FormsModule,
    MdModule,
    MaterialModule,
  ],
  declarations: [DashboardAdminComponent],
})
export class DashboardAdminModule {}
