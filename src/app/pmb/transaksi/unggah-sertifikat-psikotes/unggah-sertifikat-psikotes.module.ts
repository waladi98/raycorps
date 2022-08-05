import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../../app.module";
import { UnggahSertifikatPsikotesRoutes } from "./unggah-sertifikat-psikotes.routing";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UnggahSertifikatPsikotesRoutes),
    FormsModule,
    MaterialModule,
  ],
  declarations: [],
})
export class UnggahSertifikatPsikotesRoutesModule {}
