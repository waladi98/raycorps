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
  selector: 'app-form-dialog-prodi-pilihan',
  templateUrl: 'form-dialog-prodi-pilihan.component.html',
  styleUrls: ['./form-dialog-prodi-pilihan.component.scss'],
})
export class FormDialogProdiPilihanComponent implements OnInit {
  formGroup: FormGroup;

  dataParam = {
    type: null,
  };
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogProdiPilihanComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dataParam = this.data;
    this.breakpointObserver;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      jenis_prodi: ['', Validators.required],
      pilihan: ['', Validators.required],
      program_studi: ['', Validators.required],
    });
  }
}
