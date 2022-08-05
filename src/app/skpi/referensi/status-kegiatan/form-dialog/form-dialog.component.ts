import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

declare const require: any;

declare const $: any;

@Component({
  selector: 'app-form-dialog',
  templateUrl: 'form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  formGroup: FormGroup;

  dataParam = {
    type: null,
  };
  constructor(private _activatedRoute: ActivatedRoute, public breakpointObserver: BreakpointObserver, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<FormDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.dataParam = this.data;
    this.breakpointObserver;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      // id: ["", Validators.required],
      no_peserta: ['', Validators.required],
      no_pendaftar: ['', Validators.required],
      gelombang: ['', Validators.required],
      jenis_formulir: ['', Validators.required],
      nama: ['', Validators.required],
      status_awal: ['', Validators.required],
      program: ['', Validators.required],
      program_studi: ['', Validators.required],
      pilihan_ke: ['', Validators.required],
      jurusan_slta: ['', Validators.required],
      handphone: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
}
