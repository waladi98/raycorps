import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { HttpClientModule } from "@angular/common/http";
import { UbahProfilComponent } from "./ubah-profil.component";
import { VerifikasiPesertaRoutes } from "./ubah-profil.routing";
import { MiniProfilComponent } from "./mini-profil/mini-profil.component";
// import { KegiatanComponent } from "./Kegiatan/kegiatan.component";
import { PelatihanComponent } from "./pelatihan/pelatihan.component";
import { PekerjaanComponent } from "./pekerjaan/pekerjaan.component";
import { CustomTableModule } from "../../../components/custom-table/custom-table.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VerifikasiPesertaRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    HttpClientModule,
    CustomTableModule,
  ],
  declarations: [
    // UbahProfilComponent,
    // MiniProfilComponent,
    // KegiatanComponent,
    // PelatihanComponent,
    // PekerjaanComponent
  ],
})
export class UbahProfilModule {}
