import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../app.module";
import { MahasiswaSKPIRoutes } from "./mahasiswa.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MahasiswaSKPIRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class MahasiswaModule {}
