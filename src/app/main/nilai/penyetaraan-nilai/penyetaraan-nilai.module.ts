import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../../../md/md.module';
import { MaterialModule } from '../../../app.module';

import { PenyetaraanNilaiComponent } from './penyetaraan-nilai.component';
import { ManagePenyetaraanNilaiComponent } from './manage-penyetaraan-nilai/manage-penyetaraan-nilai.component';
import { PenyetaraanNilaiRoutes } from './penyetaraan-nilai.routing';
import { FieldErrorDisplayComponent } from './manage-penyetaraan-nilai/field-error-display/field-error-display.component';
import { TambahPenyetaraanNilaiComponent } from './tambah-penyetaraan-nilai/tambah-penyetaraan-nilai.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(PenyetaraanNilaiRoutes), FormsModule, ReactiveFormsModule, MdModule, MaterialModule],
  declarations: [PenyetaraanNilaiComponent, ManagePenyetaraanNilaiComponent, FieldErrorDisplayComponent, TambahPenyetaraanNilaiComponent],
})
export class PenyetaraanNilaiModule {}
