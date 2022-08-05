import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../md/md.module';
import { MaterialModule } from '../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { LihatProfilComponent } from './lihat-profil.component';
import { VerifikasiPesertaRoutes } from './lihat-profil.routing';
import { MiniProfilComponent } from './mini-profil/mini-profil.component';
import { DataPribadiComponent } from './data-pribadi/data-pribadi.component';
import { DataAkademikComponent } from './data-akademik/data-akademik.component';
import { OrangTuaComponent } from './orang-tua/orang-tua.component';
import { NilaiPerSemesterComponent } from './nilai-persemester/nilai-persemester.component';
import { RiwayatNilaiComponent } from './riwayat-nilai/riwayat-nilai.component';
import { KemajuanStudiComponent } from './kemajuan-studi/kemajuan-studi.component';
import { TranskripNilaiComponent } from './transkrip-nilai/transkrip-nilai.component';
import { KeuanganComponent } from './keuangan/keuangan.component';
import { TugasAkhirMhsComponent } from './tugas-akhir-mhs/tugas-akhir-mhs.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(VerifikasiPesertaRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [
    LihatProfilComponent,
    MiniProfilComponent,
    DataPribadiComponent,
    DataAkademikComponent,
    OrangTuaComponent,
    NilaiPerSemesterComponent,
    RiwayatNilaiComponent,
    KemajuanStudiComponent,
    TranskripNilaiComponent,
    KeuanganComponent,
    TugasAkhirMhsComponent,
  ],
})
export class LihatProfilModule {}
