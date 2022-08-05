import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { UnggahKelengkapanComponent } from "./aktivitas-sk.component";
import { AktivitasSKRoutes } from "./aktivitas-sk.routing";
import { UbahUnggahKelengkapanComponent } from "./aktivitas-sk3/ubah-unggah-kelengkapan.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AktivitasSKRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
  ],
  declarations: [UnggahKelengkapanComponent, UbahUnggahKelengkapanComponent],
})
export class AktivitasSKModule {}
