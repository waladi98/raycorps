import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";
import { CrmRoutes } from "./crm.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CrmRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class CrmModule {}
