import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../md/md.module';
import { MaterialModule } from '../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { UbahProfilComponent } from './ubah-profil.component';
import { VerifikasiPesertaRoutes } from './ubah-profil.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { TambahPekerjaanComponent } from './pekerjaan/tambah-pekerjaan/tambah-pekerjaan.component';
import { TambahJabatanComponent } from './jabatan/tambah-jabatan/tambah-jabatan.component';

import { PendidikanComponent } from "./pendidikan/pendidikan.component";
import { DataPribadiComponent } from "./data-pribadi/data-pribadi.component";
import { AlamatTetapComponent } from "./alamat-tetap/alamat-tetap.component";
import { AkademikComponent } from "./akademik/akademik.component";
import { MiniProfilComponent } from "./mini-profil/mini-profil.component";
import { JabatanComponent } from "./jabatan/jabatan.component";
import { StrukturalComponent } from "./struktural/struktural.component";
import { PengajaranComponent } from "./pengajaran/pengajaran.component";
import { KegiatanComponent } from "./Kegiatan/kegiatan.component";
import { PelatihanComponent } from "./pelatihan/pelatihan.component";
import { PenelitianComponent } from "./penelitian/penelitian.component";
import { PengabdianComponent } from "./pengabdian/pengabdian.component";
import { PekerjaanComponent } from "./pekerjaan/pekerjaan.component";

import { CustomTableModule } from '../../../../../components/custom-table/custom-table.module';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(VerifikasiPesertaRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule, HttpClientModule, CustomTableModule, MatDialogModule],

  declarations: [UbahProfilComponent, DataPribadiComponent, AlamatTetapComponent, AkademikComponent, MiniProfilComponent, PendidikanComponent, JabatanComponent, StrukturalComponent, PengajaranComponent, KegiatanComponent, PelatihanComponent, PekerjaanComponent, TambahPekerjaanComponent, PenelitianComponent, PengabdianComponent, TambahJabatanComponent],
})
export class UbahProfilModule { }
