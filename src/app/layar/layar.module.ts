import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../app.module";
import { LayarRoutes } from "./layar.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LayarRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class LayarModule { }
