import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl, Form } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
declare const require: any;
declare const $: any;

@Component({
  selector: 'app-jabatan',
  templateUrl: 'jabatan.component.html',
  styleUrls: ['./jabatan.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class JabatanComponent implements OnInit {
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
      jabatan_dosen: [{ value: '', disabled: true }, Validators.required],
      jabatan: [{ value: '', disabled: true }, Validators.required],
      jabatan_akademik: [{ value: '', disabled: true }, Validators.required],
      jabatan_dikti: [{ value: '', disabled: true }, Validators.required],
      golongan: [{ value: '', disabled: true }, Validators.required],
      ikatan: [{ value: '', disabled: true }, Validators.required],
      bank: [{ value: '', disabled: true }, Validators.required],
      nama_bank: [{ value: '', disabled: true }, Validators.required],
      nama_akun: [{ value: '', disabled: true }, Validators.required],
      nomor_akun: [{ value: '', disabled: true }, Validators.required],
    });
  }

  // manageData(type) {
  //   const dialogRef = this.dialog.open(FormDialogComponent, {
  //     data: {
  //       type: type,
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  // onChangePaginator(event: PageEvent): void {
  //   this.pageSize = event.pageSize;
  // }

  inisialisasiTable() { }
}
