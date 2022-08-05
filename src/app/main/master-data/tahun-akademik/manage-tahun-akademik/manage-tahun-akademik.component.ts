import { Component, OnInit } from "@angular/core";

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { FormBuilder, AbstractControl } from "@angular/forms";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-master-manage-tahun-akademik",
  templateUrl: "manage-tahun-akademik.component.html",
})
export class ManageTahunAkademikComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      tahun_akademik: ["", Validators.required],
      nama_tahun: ["", Validators.required],
      semester_pendek: ["", Validators.required],
      semua_mata_kuliah: ["", Validators.required],
      perwalian_berdasarkan_jadwal: ["", Validators.required],
      mulai_krs: ["", Validators.required],
      selesai_krs: ["", Validators.required],
      akhir_cetak_kss_krs: ["", Validators.required],
      mulai_krs_online: ["", Validators.required],
      selesai_krs_online: ["", Validators.required],
      mulai_prs: ["", Validators.required],
      selesai_prs: ["", Validators.required],
      akhir_cetak_kss_prs: ["", Validators.required],
      mulai_pendaftaran_praktikum: ["", Validators.required],
      selesai_pendaftaran_praktikum: ["", Validators.required],
      batas_pengajuan_cuti: ["", Validators.required],
      batas_mundur_kuliah: ["", Validators.required],
      batas_pengambilan_kelebihan_uang_kuliah: ["", Validators.required],
      mulai_pembayaran: ["", Validators.required],
      batas_dispensasi_untuk_perwalian: ["", Validators.required],
      batas_dispensasi_untuk_uts: ["", Validators.required],
      batas_dispensasi_untuk_uas: ["", Validators.required],
      mulai_kuliah: ["", Validators.required],
      selesai_kuliah: ["", Validators.required],
      mulai_uts: ["", Validators.required],
      selesai_uts: ["", Validators.required],
      mulai_uas: ["", Validators.required],
      selesai_uas: ["", Validators.required],
      akhir_penilaian: ["", Validators.required],
      batas_waktu_pengajuan_0_sks: ["", Validators.required],
      cek_bentrok_jadwal: ["", Validators.required],
      harga_uts: ["", Validators.required],
      harga_uas: ["", Validators.required],
      catatan: ["", Validators.required],
    });
  }

  ngAfterViewInit() {}

  onSubmit() {}
}
