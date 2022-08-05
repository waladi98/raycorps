import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { RiwayatPembayaranDppComponent } from './riwayat-pembayaran-dpp.component';
import { ManageRiwayatPembayaranDppComponent } from './manage-riwayat-pembayaran-dpp/manage-riwayat-pembayaran-dpp.component';
import { RiwayatPembayaranDppRoutes } from './riwayat-pembayaran-dpp.routing';
import { FieldErrorDisplayComponent } from './manage-riwayat-pembayaran-dpp/field-error-display/field-error-display.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(RiwayatPembayaranDppRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule],
  declarations: [RiwayatPembayaranDppComponent, ManageRiwayatPembayaranDppComponent, FieldErrorDisplayComponent],
})
export class RiwayatPembayaranDppModule {}
