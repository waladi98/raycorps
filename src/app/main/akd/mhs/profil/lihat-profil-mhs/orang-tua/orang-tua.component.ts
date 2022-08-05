import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-lihat-orang-tua',
  templateUrl: 'orang-tua.component.html',
  styleUrls: ['./orang-tua.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class OrangTuaComponent implements OnInit {
  formGroup: FormGroup;

  listData = {
    header: [],
    field: [],
    action: [],
    data: []
  };

  agama = [
    { value: '1', viewValue: 'Islam' },
    { value: '2', viewValue: 'Kristen' },
    { value: '3', viewValue: 'Katolik' },
    { value: '4', viewValue: 'Hindu' },
    { value: '5', viewValue: 'Budha' },
    { value: '6', viewValue: 'Lainnya' },
  ];

  pendidikan = [
    { value: '1', viewValue: 'd1' },
    { value: '2', viewValue: 'd3' },
    { value: '3', viewValue: 's1' },
    { value: '4', viewValue: 's2' },
    { value: '5', viewValue: 's3' }
  ];

  pekerjaan = [
    { value: '1', viewValue: 'Tidak Bekerja' },
    { value: '2', viewValue: 'Karyawan Swasta' },
    { value: '3', viewValue: 'PNS' },
  ];

  status_hidup = [
    { value: '1', viewValue: 'stat1' },
    { value: '2', viewValue: 'stat2' },
  ];

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
      nik_ayah: [{ value: '', disabled: true }, Validators.required],
      nama_ayah: [{ value: '', disabled: true }, Validators.required],
      agama_ayah: [{ value: '', disabled: true }, Validators.required],
      pendidikan_ayah: [{ value: '', disabled: true }, Validators.required],
      pekerjaan_ayah: [{ value: '', disabled: true }, Validators.required],
      status_hidup_ayah: [{ value: '', disabled: true }, Validators.required],
      nik_ibu: [{ value: '', disabled: true }, Validators.required],
      nama_ibu: [{ value: '', disabled: true }, Validators.required],
      agama_ibu: [{ value: '', disabled: true }, Validators.required],
      pendidikan_ibu: [{ value: '', disabled: true }, Validators.required],
      pekerjaan_ibu: [{ value: '', disabled: true }, Validators.required],
      status_hidup_ibu: [{ value: '', disabled: true }, Validators.required],
      telepon: [{ value: '', disabled: true }, Validators.required],
      no_hp_wa: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      alamat: [{ value: '', disabled: true }, Validators.required],
      rt: [{ value: '', disabled: true }, Validators.required],
      rw: [{ value: '', disabled: true }, Validators.required],
      domisili: [{ value: '', disabled: true }, Validators.required],
      negara: [{ value: '', disabled: true }, Validators.required],
      telepon2: [{ value: '', disabled: true }, Validators.required],
    });
  }
}
