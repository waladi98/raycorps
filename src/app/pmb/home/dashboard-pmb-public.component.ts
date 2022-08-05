import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DataService } from "../../core/services/data.service";
import * as Chartist from "chartist";
import { Router } from "@angular/router";
declare const $: any;

@Component({
  selector: "app-pmb-dashboard-pmb-public",
  templateUrl: "./dashboard-pmb-public.component.html",
})
export class DashboardPmbPublicComponent implements OnInit, AfterViewInit {
  // constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

  constructor(private router: Router) {}

  manageData(module) {
    if (module) {
      this.router.navigate(["/formulir/" + module.kode]);
    } else {
      this.router.navigate(["/formulir"]);
    }
  }

  manageDash(module) {
    if (module) {
      this.router.navigate(["/dashboard-pmb/" + module.kode]);
    } else {
      this.router.navigate(["/dashboard-pmb"]);
    }
  }

  // constructor(private navbarTitleService: NavbarTitleService) { }
  ngOnInit() {}
  ngAfterViewInit() {}
}
