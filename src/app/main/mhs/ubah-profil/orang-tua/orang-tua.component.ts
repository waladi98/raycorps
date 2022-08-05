import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
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
  }
}
