import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { LihatProfilComponent } from './lihat-profil.component';
import { VerifikasiPesertaRoutes } from './lihat-profil.routing';


import { PendidikanComponent } from './pendidikan/pendidikan.component';
import { DataPribadiComponent } from './data-pribadi/data-pribadi.component';
import { AlamatTetapComponent } from './alamat-tetap/alamat-tetap.component';
import { AkademikComponent } from './akademik/akademik.component';
import { MiniProfilComponent } from './mini-profil/mini-profil.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(VerifikasiPesertaRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule],
  declarations: [LihatProfilComponent, DataPribadiComponent, AlamatTetapComponent, AkademikComponent, MiniProfilComponent, PendidikanComponent],
})
export class LihatProfilModule {}
