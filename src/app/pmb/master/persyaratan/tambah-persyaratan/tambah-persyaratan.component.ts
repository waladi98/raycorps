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
  selector: "app-tambah-persyaratan",
  templateUrl: "./tambah-persyaratan.component.html",
  styleUrls: ["./tambah-persyaratan.component.scss"],
})
export class TambahPersyaratanComponent implements OnInit {
  form: FormGroup;
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
    this.form = this.formBuilder.group({
      persyaratan: ["", Validators.required],
      jenjang: ["", Validators.required],
      wajib: ["", Validators.required],
      status: ["", Validators.required],
    });
  }
}
