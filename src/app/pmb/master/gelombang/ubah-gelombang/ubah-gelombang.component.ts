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
import { DataService } from "../../../../core/services/data.service";
import { ActivatedRoute, Router } from "@angular/router";

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
  selector: "app-ubah-gelombang",
  templateUrl: "./ubah-gelombang.component.html",
  styleUrls: ["./ubah-gelombang.component.scss"],
})
export class UbahGelombangComponent implements OnInit {
  formGroup: FormGroup;
  params: any;
  checked = false;
  disabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.params.subscribe(
      (params: any) => (this.params = params)
    );
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      institusi: ["", Validators.required],
      tahun_akademik: ["", Validators.required],
      gelombang_ke: ["", Validators.required],
      nama: ["", Validators.required],

      mulai_pendaftaran: ["", Validators.required],
      selesai_pendaftaran: ["", Validators.required],
      selesai_pendaftaran_online: ["", Validators.required],
      tanggal_ujian: ["", Validators.required],
      jam_ujian: ["", Validators.required],
      mulai_pengumuman: ["", Validators.required],
      selesai_pengumuman: ["", Validators.required],
      mulai_registrasi: ["", Validators.required],
      selesai_registrasi: ["", Validators.required],
      status: ["", Validators.required],
    });
  }
}
