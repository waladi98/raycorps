import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-alamat-tetap',
  templateUrl: 'alamat-tetap.component.html',
  styleUrls: ['./alamat-tetap.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class AlamatTetapComponent implements OnInit {
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
      nik: [{ value: '', disabled: false }, Validators.required],
      telepon: [{ value: '', disabled: false }, Validators.required],
      handphone: [{ value: '', disabled: false }, Validators.required],
      email: [{ value: '', disabled: false }, Validators.required],
      alamat: [{ value: '', disabled: false }, Validators.required],
      kota: [{ value: '', disabled: false }, Validators.required],
      kode_pos: [{ value: '', disabled: false }, Validators.required],
      provinsi: [{ value: '', disabled: false }, Validators.required],
      negara: [{ value: '', disabled: false }, Validators.required],
    });
  }

  // onChangePaginator(event: PageEvent): void {
  //   this.pageSize = event.pageSize;
  // }

  inisialisasiTable() {}
}
