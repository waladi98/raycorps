import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-lihat-data-akademik',
  templateUrl: 'data-akademik.component.html',
  styleUrls: ['./data-akademik.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class DataAkademikComponent implements OnInit {
  formGroup: FormGroup;

  listData = {
    header: [],
    field: [],
    action: [],
    data: []
  };

  isScreenSmall: boolean;

  params: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenSmall = true;
          console.log(
            'Matches small viewport or handset in portrait mode'
          );
        } else {
          this.isScreenSmall = false;
        }
      });
    this._activatedRoute.params.subscribe((params: any) => (this.params = params));
  }
  ngOnInit() {
      this.formGroup = this.formBuilder.group({
        program: [{ value: '', disabled: true }, Validators.required],
        prodi: [{ value: '', disabled: true }, Validators.required],
        status: [{ value: '', disabled: true }, Validators.required],
        status_masuk: [{ value: '', disabled: true }, Validators.required],
        sesi_smt_terakhir: [{ value: '', disabled: true }, Validators.required],
        batas_studi: [{ value: '', disabled: true }, Validators.required],
        no_pmb: [{ value: '', disabled: true }, Validators.required],
        periode: [{ value: '', disabled: true }, Validators.required],
        jenis_formulir: [{ value: '', disabled: true }, Validators.required],
        grade_test: [{ value: '', disabled: true }, Validators.required],
        sekolah: [{ value: '', disabled: true }, Validators.required],
        jurusan: [{ value: '', disabled: true }, Validators.required],
        nilai_formulir: [{ value: '', disabled: true }, Validators.required],
        perguruan_tinggi: [{ value: '', disabled: true }, Validators.required],
        program_studi: [{ value: '', disabled: true }, Validators.required],
        tgl_lulus: [{ value: '', disabled: true }, Validators.required],
        ipk: [{ value: '', disabled: true }, Validators.required],
      });
    
  }


  
}
