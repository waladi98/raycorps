import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { DataService } from "../../core/services/data.service";
import { NgxSpinnerService } from "ngx-spinner";
import { CustomTable } from "../../components/custom-table/custom-table.interface";
import * as Chartist from "chartist";
import { StorageService } from "../../core/services/storage.service";

declare const $: any;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private _storageService: StorageService
  ) {}

  user = this._storageService.get("user_token");

  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  spinnerStatus = "Mohon Tunggu...";

  listDataSalam: {
    kode;
    salam;
  };

  listData: CustomTable;

  ngOnInit() {
    this.loadInitialData();
  }
  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();
      const request = [this.loadDataSalam()];

      const [listDataSalam] = await Promise.all(request);
      this.listDataSalam = listDataSalam.result[0];

      this.hideSpinner();
      this.helloShow();
    } catch (error) {
      console.log(error);
    }
  }
  ngAfterViewInit() {}

  helloShow() {
    var welcome = this._storageService.get("welcome");
    if (welcome == "1") {
      return false;
    } else {
      this._storageService.set("welcome", "1");
    }
    swal
      .fire({
        imageUrl: "../../assets/img/faces/ava.png",
        imageHeight: 100,

        html:
          "<h6> <b>" +
          this.listDataSalam.salam +
          "</b></h6> </br> <b>Selamat datang di SMART CAMPUS YARSI</b> </br><b>Sistem PDJAMA</b>",
        width: 600,
        // icon: "success",
        customClass: {
          confirmButton: "btn btn-success",
        },
        buttonsStyling: false,
        showCancelButton: false,
        confirmButtonText: "Teruskan",
      })
      .then((result) => {
        // this.router.navigate(["/pmb/dashboarda"]);
        //this.ngAfterViewInit();
      });
  }
  showSpinner(): void {
    this.isLoading = true;
    this.spinner.show(this.spinnerName);
  }

  hideSpinner(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.spinner.hide(this.spinnerName);
    }, 2000);
  }
  loadDataSalam(): Promise<any> {
    return this.dataService
      .getRequest<any>("/master/salam", {
        where: "kode='" + this._storageService.get("username") + "'",
      })
      .toPromise();
  }
}
