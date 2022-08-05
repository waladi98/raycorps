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
  selector: 'app-tugas-akhir-mhs',
  templateUrl: 'tugas-akhir-mhs.component.html',
  styleUrls: ['./tugas-akhir-mhs.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class TugasAkhirMhsComponent implements OnInit {
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
      judul: [{ value: '', disabled: true }, Validators.required],
      pembimbing: [{ value: '', disabled: true }, Validators.required],
      keterangan: [{ value: '', disabled: true }, Validators.required],
      lulus: [{ value: '', disabled: true }, Validators.required],
      tanggal_ujian: [{ value: '', disabled: true }, Validators.required],
      penguji: [{ value: '', disabled: true }, Validators.required],
      nilai: [{ value: '', disabled: true }, Validators.required],
    });
  }
    
  
}
