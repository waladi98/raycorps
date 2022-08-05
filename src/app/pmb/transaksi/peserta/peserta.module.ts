import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../../app.module";
import { PesertaRoutes } from "./peserta.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PesertaRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class PesertaModule {}
