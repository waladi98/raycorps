import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl, Form } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-akademik',
  templateUrl: 'akademik.component.html',
  styleUrls: ['./akademik.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class AkademikComponent implements OnInit {
  formGroup: FormGroup;

  listData = {
    header: [],
    field: [],
    action: [],
    data: [],
  };

  // isLoadingTable = false;
  // length = 100;
  // pageSize = 10;
  // pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  params: any;
  constructor(private _activatedRoute: ActivatedRoute, public breakpointObserver: BreakpointObserver, private formBuilder: FormBuilder) {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait]).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isScreenSmall = true;
        console.log('Matches small viewport or handset in portrait mode');
      } else {
        this.isScreenSmall = false;
      }
    });
    this._activatedRoute.params.subscribe((params: any) => (this.params = params));
  }
  ngOnInit() {
    this.inisialisasiTable();

    this.formGroup = this.formBuilder.group({
      mulai_bekerja: [{ value: '', disabled: true }, Validators.required],
      status_dosen: [{ value: '', disabled: true }, Validators.required],
      status_kerja: [{ value: '', disabled: true }, Validators.required],
      prodi_homebase: [{ value: '', disabled: true }, Validators.required],
      mengajar_prodi: [{ value: '', disabled: true }, Validators.required],
      bidang_minat: [{ value: '', disabled: true }, Validators.required],
      kode_instansi: [{ value: '', disabled: true }, Validators.required],
      perguruan_tinggi: [{ value: '', disabled: true }, Validators.required],
      pendidikan_tertinggi: [{ value: '', disabled: true }, Validators.required],
      jabatan_terakhir: [{ value: '', disabled: true }, Validators.required],
      keilmuan: [{ value: '', disabled: true }, Validators.required],
    });
  }

  // onChangePaginator(event: PageEvent): void {
  //   this.pageSize = event.pageSize;
  // }

  inisialisasiTable() {}
}
