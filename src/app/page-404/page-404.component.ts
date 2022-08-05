import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DataService } from "../core/services/data.service";
import * as Chartist from "chartist";
import { Router } from "@angular/router";
declare const $: any;

@Component({
  selector: "app-page-404",
  templateUrl: "./page-404.component.html",
})
export class Page404Component implements OnInit, AfterViewInit {
  constructor(private router: Router) {}
  ngOnInit() {}
  ngAfterViewInit() {}

  toRoute(menu) {
    if (menu) {
      localStorage.setItem("route_id", menu.link);
      localStorage.setItem("app_id", menu.app_id);

      this.router.navigate([]).then((result) => {
        window.open("#/" + menu.link, "_blank");
      });
    }
  }
}
