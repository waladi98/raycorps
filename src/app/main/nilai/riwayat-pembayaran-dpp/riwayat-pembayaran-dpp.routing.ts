import { Routes } from '@angular/router';

import { RiwayatPembayaranDppComponent } from './riwayat-pembayaran-dpp.component';
import { ManageRiwayatPembayaranDppComponent } from './manage-riwayat-pembayaran-dpp/manage-riwayat-pembayaran-dpp.component';

export const RiwayatPembayaranDppRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RiwayatPembayaranDppComponent,
      },
      {
        path: 'manage-riwayat-pembayaran-dpp/:id',
        data: { recTitle: 'Update Data RiwayatPembayaranDpp' },
        component: ManageRiwayatPembayaranDppComponent,
      },
      {
        path: 'manage-riwayat-pembayaran-dpp',
        data: { recTitle: 'Tambah Data RiwayatPembayaranDpp' },
        component: ManageRiwayatPembayaranDppComponent,
      },
    ],
  },
];
