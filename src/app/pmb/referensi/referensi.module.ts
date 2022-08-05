import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MdModule } from "../../md/md.module";
import { MaterialModule } from "../../app.module";
import { ReferensiRoutes } from "./referensi.routing";

@NgModule({
  imports: [RouterModule.forChild(ReferensiRoutes), MdModule, MaterialModule],
  declarations: [],
})
export class ReferensiModule {}
