import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../../app.module";
import { GenerateNpmRoutes } from "./generate-npm.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GenerateNpmRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class GenerateNpmModule {}
