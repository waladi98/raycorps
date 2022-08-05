import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../../../md/md.module';
import { MaterialModule } from '../../../../../app.module';
import { HttpClientModule } from '@angular/common/http';
import { UbahProfilComponent } from './ubah-profil.component';
import { VerifikasiPesertaRoutes } from './ubah-profil.routing';
import { MiniProfilComponent } from './mini-profil/mini-profil.component';
import { DataPribadiComponent } from './data-pribadi/data-pribadi.component';
import { AsalSekolahComponent } from './asal-sekolah/asal-sekolah.component';
import { OrangTuaComponent } from './orang-tua/orang-tua.component';
import { AlamatTetapComponent } from './alamat-tetap/alamat-tetap.component';
import { AsalPerguruanTinggiComponent } from './asal-perguruan-tinggi/asal-perguruan-tinggi.component';
import { BankComponent } from './bank/bank.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(VerifikasiPesertaRoutes),
        FormsModule,
        ReactiveFormsModule,
        MdModule,
        MaterialModule,
        HttpClientModule,
    ],
    declarations: [
        UbahProfilComponent,
        MiniProfilComponent,
        DataPribadiComponent,
        AsalSekolahComponent,
        AsalPerguruanTinggiComponent,
        OrangTuaComponent,
        AlamatTetapComponent,
        BankComponent
    ],

})

export class UbahProfilModule { }
