import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';

declare const require: any;

declare const $: any;

@Component({
  selector: "app-frame",
  templateUrl: "frame.component.html",
  styleUrls: ["./frame.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class FrameComponent implements OnInit {
  
  simpleSlider = 40;
  doubleSlider = [20, 60];

  regularItems = ["Pizza", "Pasta", "Parmesan"];
  touch: boolean;

  selectedValue: string;
  currentCity: string[];

  selectTheme = "primary";
  cities = [
    { value: "ipa-0", viewValue: "IPA - Rp.300.000" },
    { value: "ips-1", viewValue: "IPS - Rp.300.000" },
  ];

  srcdoc = null;

  @ViewChild("iframe") iframe: ElementRef;
  params: any;
  title: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private _storageService: StorageService
  ) {
    // this._activatedRoute.params.subscribe((params: any) => (this.params = params));
  }
  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((queryParams) => {
      console.log(queryParams, 1);
      // do something with the query params
    });
    this._activatedRoute.params.subscribe((routeParams) => {
      this.params = routeParams;

      var user_token = this._storageService.get('user_token');

      if (user_token) {
        let ulr_frame = this._storageService.get('frame_url');
        this.title=this._storageService.get('frame_title');
        console.log(ulr_frame + '?' + this.params.modul +'&user_token='+ user_token);
        this.srcdoc = this.sanitizer.bypassSecurityTrustResourceUrl(ulr_frame + '?' + this.params.modul +'&user_token='+ user_token);
      } else {
      }
    });
  }
  toHome() {
    var home = this._storageService.get("home");
    if (home) {
      this.router.navigate([home]);
    }
  }
  frameLoad() {
    var x = document.getElementsByTagName("iframe")[0].contentWindow;
    // x.document.getElementsByTagName("body")[0].style.backgroundColor = "red";
    // this.hostElement.nativeElement.querySelector('iframe').contentWindow.document.querySelector()
    console.log(x);
  }

  myFunc(val: any) {
    // code here
  }
}
