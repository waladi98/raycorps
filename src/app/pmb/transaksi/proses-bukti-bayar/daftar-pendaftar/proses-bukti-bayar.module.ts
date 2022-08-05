import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../../md/md.module";
import { MaterialModule } from "../../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { ProsesBuktiBayarComponent } from "./proses-bukti-bayar.component";
import { ProsesBuktiBayarRoutes } from "./proses-bukti-bayar.routing";
import { CustomTableModule } from "../../../../components/custom-table/custom-table.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProsesBuktiBayarRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    CustomTableModule,
  ],
  declarations: [ProsesBuktiBayarComponent],
})
export class ProsesBuktiBayarModule {}
