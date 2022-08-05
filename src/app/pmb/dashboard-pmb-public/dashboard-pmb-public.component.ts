import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DataService } from "../../core/services/data.service";
import * as Chartist from "chartist";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { StorageService } from '../../core/services/storage.service';

declare const $: any;

@Component({
  selector: "app-pmb-dashboard-pmb-public",
  templateUrl: "./dashboard-pmb-public.component.html",
})
export class DashboardPmbPublicComponent implements OnInit, AfterViewInit {
  listDataGelombangPeriode: {
    nama;
    mulai_pendaftaran;
    selesai_pendaftaran_online;
    mulai_pengumuman;
    selesai_pengumuman;
    mulai_registrasi;
    selesai_registrasi;
  };
  listDataRefPengaturan= {
    maintenance:null
  };
  
  showSwal(basic) {
    swal.fire({
      title: "Gelombang PMB",
      html:
        "<ol>" +
        '<li><span class="badge badge-info">Gelombang 1</span> 04 Jan 22 - 24 Apr 22</li>' +
        '<li><span class="badge badge-primary">Gelombang 2</span> 26 Apr 22 - 03 Jul 22</li>' +
        '<li><span class="badge badge-warning">Gelombang 3</span> 06 Jul 22 - 14 Agu 22</li>' +
        "</ol>",
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn btn-success",
      },
    });
  }

  constructor(private dataService: DataService,private _storageService: StorageService) {}
  user = this._storageService.get("username");

  // constructor(private navbarTitleService: NavbarTitleService) { }
  public ngOnInit() {
    this.loadInitialData();
    const dataPreferences = {
      labels: ["62%", "32%", "6%"],
      series: [62, 32, 6],
    };

    const optionsPreferences = {
      height: "230px",
    };

    new Chartist.Pie("#chartPreferences", dataPreferences, optionsPreferences);
  }
  ngAfterViewInit() {}
  // dataPendaftaranPmb: any;
  dataPeserta: any;
  async loadInitialData(): Promise<any> {
    try {
      const request = [
        //this.loadDataPendaftaranPmb(),
        this.loadGelombangPeriode(),
        this.loadRefPengaturan(),
      ];

      //const request1 = [this.loadDataPeserta()];

      const [gelombangPeriode, refPengaturan] = await Promise.all(request);
      // this.dataPendaftaranPmb = dataPendaftaran.result[0];

      //const [dataPeserta] = await Promise.all(request1);
      //this.dataPeserta = dataPeserta.result[0];
      this.listDataGelombangPeriode = gelombangPeriode.result;
      this.listDataRefPengaturan = refPengaturan.result[0];
      this._storageService.set("maintenance", this.listDataRefPengaturan.maintenance);
    } catch (error) {
      console.log(error);
    }
  }

  // loadDataPeserta(): Promise<any> {
  //   return this.dataService
  //     .getRequest<any>("/pmb/peserta", {
  //       where: "formulir_id='" + this._storageService.get("username") + "'",
  //     })
  //     .toPromise();
  // }

  // loadDataPendaftaranPmb(): Promise<any> {
  //   return this.dataService
  //     .getRequest<any>("/pmb/formulirOnline", {
  //       where:
  //         "id='" +
  //         this._storageService.get("username") +
  //         "' and id_status_bayar = 'Y'",
  //     })
  //     .toPromise();
  // }

  // loadGelombangPeriode(): Promise<any> {
  //   return this.dataService
  //     .getRequest<any>("/pmb/master/gelombang", {
  //       where: "id_aktif='Y' ",
  //     })
  //     .toPromise();
  // }
  loadGelombangPeriode(): Promise<any> {
    return this.dataService
      .getRequestLocal<any>("", {
        action:"pmb/master/gelombang",
        where: "id_aktif='Y' ",
      })
      .toPromise();
  }
  loadRefPengaturan(): Promise<any> {
    return this.dataService
      .getRequestLocal<any>("", {
        action:"referensi/pengaturan",
        select: "key_captcha,key_captcha2,maintenance",
      })
      .toPromise();
  }
}
