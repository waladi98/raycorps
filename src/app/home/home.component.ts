import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DataService } from "../core/services/data.service";
import * as Chartist from "chartist";
import { Router } from "@angular/router";
import * as CryptoJS from "crypto-js";
import { environment } from "../../environments/environment";
import { StorageService } from "../core/services/storage.service";

declare const $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, AfterViewInit {
  portal_menu = [];
  constructor(private router: Router, private dataService: DataService,
    private _storageService: StorageService,) {
      localStorage.setItem('portal_menu','U2FsdGVkX19oPoDNFpD6Dyhay3dLYeQwt5Ec0bYW%2BEVmgDQUR%2Fcat%2BdAgSlTsfCcaMCh%2Blg1cVlJJ0j9Hb3l4WMTDdgIC2mNFKYhYuBusAfLIrl9EnsdxkJ%2Fq9GjDj7kvxgjK3J9bgXtuCS0gtbBoFa4iQXX4u%2Fh2puD0w8mN7gG6PP%2BuKtPSEi%2FAvLCPvSIPrI4cGjTIzah5E0nsBUzGk8DLukj8X%2Fph887XTd%2BoiWb05ex%2FrVk%2BMFB8Dgh570eQWnZj96HIGqDZeo72svepG1OjnzVfn0cEH%2F0IG2JK9MaFgJJsag9BeUOttRL8UIViJ1%2FoKRCnBrhMNSL0WTIwk%2BJvbQ7WLpSNpWjqZnY6ic0ab8V3Okc6tcUmi4VQnxgxQUZlqsq%2BwBd2cb8xtoTmte%2FSDaQvT4ueWp%2F3J7YUlYsBsQiZS4u5RVhJJQnUCURwEkayoSOGeeY07Vwiw2k2PBQPXhYDAF3ql%2FtXRTc1xz99xlYLqzwpOWFfwOLdsF6kTmyjmXjSTQ5x6innZutZIbzhuaTrCukGWmbB7S8DlccDoiYwEzsEEss2nlN2%2BD%2FKQiFtHcPhhoa9aSGGC%2FjDmS2lme3%2BabtKyBhSRdzjaDPh8%2FQIvmNHndOLTG7MwB7YpbJIl0YGShE33uc4Sme007UjDK74PHPF3pEa%2FZbah4vK1f5NcOtQWm9Bf%2BzwIa9abpNVER0Qivxep20gZk%2FnqASdQSgAaAXe5D2dn5UwcqecMTBm8uY1Ou9k0cmiPo4t5rSGraZ8D3IGT0%2FgTnMWWk754%2FFMZUf9M%2F9wjoW1dhpZwhDpSWDCKr3MAtwExULrKvtDrNe9iiEjIkr%2Bo8EKqnVBWXEgwqSNwp4MzBUMcUdw30sae1g0D%2B0YEBhhIE7HQk6Wp2wficlth%2F6P6CkbOhcQaBRGmXJfPIeur5S%2By8jtxSmOmAlmfsd0eut24htsXEIoPJaZIbAKaHe1pBbP4RXzNQ6QFFM0dZyL4IANUBspCzlVLp7LZKj6zl2iAslsGWowDg9kboWZBMFRg%2FO0Zn7wCS00sUqhgkZ7O42eAb5gdeRY1lBGAynDKXLatnkUGTAyW91YMunEJv%2FKHx%2BK%2BCo3Hi%2Feb1Qp%2FC3FdtlWCFYW00lHA6IEacpLbia3MEzCWULOavgEmWYdiwNOolyyfQ1QO6fB63PiTnftTYnh3N6ycavpIHnXwr3nraTC2h64W0Vc%2FREpcyfuyp45C8HTBkTM8ov%2F82%2Fwlhx3dYHze6jrWzTHA291iquRivTi7jvw3HAKOzOwBgLS2%2BbxfrSS8AhOjQWl6cSQMQ%2FS9VDCUSH26cl4LwxmLaNbnlMSfy0bV0vsmv9I4zQKLr1iu%2FqmftazzyaLL9n2MaTYt4YlqYIL8%2FTs%2BWXD5JzO0CcA8fWCCNu%2BTC4WFw8mf3GKr9O82Pagaed3ZWfplcbS7RlRHdgm8aFVRJJOGwowgoL3p%2FwRmuTampI4yHjiMFfE1yp5Vw4TpEbGewc%2FvFhu2mwGTgc2VJzqO8isQBNiezraan%2Fl4FRmy4bnVFq3I7ZuoLFyW2gqCLGEV7SOG%2BFJ0emSB%2FC6lpF3EUvDCTXNbOyUcz1chKKpj3Q7i%2FfZDnHbZYp4Y7pXa17EeMA%2B8fcMPcCCTv%2BcPFRGoR0fONBVkd4v9g9oLMFXQddbMQiXeeN6R2vlzNaGDdoVoZNsSE9Kfq28NYZfklKtWAZHx2EVJM3Cw0gnMU0WMF7B7yAdxxxZ%2F4tF%2B6gvkp76IQkXY42y8M6fqSnsH7qTXd6mI6M63kxpoAum7rSpy0yy858AR9myFCjCIWN%2B11FFrj6hriNd41gNNa4YZybH6yLJpjMArHez%2BirOSdQBbykoAPqVJV0G5O1y4kgAZ6BgcxHkTdiLc%2FAIEau9Kx0NsDPhxJLcys85h2Rz8E84Mb0b2QV4wrx5DempN6PAr%2BzBp%2BrUfm1H3hY8tjKbD81VWqFvxLmbtHUX6vvneuwPGqxo%2BYp6WeDXderqIioHavxXzErNVgLUkXQRgR%2FzpMh44rD2JK3OPKlCq6%2FlEFmHtdpaLkhiUFU8CaEhrzrA7L0H2QvimnpUWhmiVweNQW6JpINvHOzpwhDgBMNNax51xU%2FuX2qX3dLz9ADFIVfbI5XT0cCNpFapKsRNuE0J3Q7LHmpKmgncIakXdugOJ5O4hAbM7aRzIMXcfd3l6r1xRSyNalSp9WHrsUPExnee1yhBIFeNxdlJwXsqyHzLkDXNggxX9USrXzolF%2Fj%2BTp9uee0WJnWKmt5aoyZjEilnCwN0L2k1NHdQQ4FZqFVOGQajqYXq%2Bbd%2Bnxi1i8ok5Bjpt%2BiuyoD1tjOxEYNR56fAQapKVT6Bp8HITVoGWFv%2FI7pxhaA4o4zJqaIq1UragY7PV6nt%2Bq5H0S7tSD0zOjDAXgR%2FGKKmEwX%2FHAR96M8uTEhtHydE9nvbi4F88BUDB3Z%2BDH1lk8m25MuW%2FV2UMbzbvKYnNhTBBKQesvLXfhTJ%2FYlUMoOZlETrkGp6rtdiFn7mgJQMGlEIh55sCRM8GegW4zV%2FakbkWUISgpeDmBX0T%2BXo0NTIjFOz5k2ryvWMKwIBzRysDcAVcsCsFUu8Cy1JkY7Bz8dzzw%2Ff3hXXh2KCtdWisTpXrnndoHSE%2Fn6B817vf4614%2Bl4XhOGgyGpcGQUJ336a8OgNVL6O6OND1JUnuyVY1P%2B7ygnidMej9OiyaQvWSGj3y2qI9PiFuRsfA4krBgjCrmPDv6vHROLmEzHoPAx%2BU2g7GZFHAz2PF1mwtCDXFA6AKnlIb6ZIl3HDh%2BjhpWnGRsAgpoPYedCLeV32c77WdKgZvu7z3n%2FZGPTP%2FreSTKtDKUcUcwatZxRrPs4n3zM7DA43i8q1R3NzSIgu%2Byyzm9oujhB7oNgsOtzZbXXlyyGtTLLZuUz3tvcU8I15VVsw%2FjruDd7URXuPzr4KZ3j%2BV3vXpQehwQws%2Bpi5ApFwTNhWVwX8rUWerH6dTQ5Ha8yu39AJwaQeEFS4%2FhjIx%2FOHEWFrRoptSa%2BrFJkko2efqpBoIHuvfgqLXRhkkHiL39ALQXwr9nht%2Fr2gTjmGIZvBPTLuLYxmAN0nCaLskOcxQnkeriSRo%2BQulWESgcwdt4T49Bg8CLUfQujoAXJk1V1LTr%2BH7BfE5lq%2Bcrem%2B6jPmTU%2B53oOW1TUul7TgtbEnODHs107Q4j1iAjkAmuQ18o2%2Fqhj14DSVRJENZDThKCuhc4y8I5acRkaoQ4Ff6RmnJZ8E6QxqDUcTPvAk%2BSEr2pIlHBEDA7BkSwvYORl8npQeRaoLl1VNWAJu%2BK%2B5vK5cnymIzToBIn750zeEycei9s%2FiIsQX2SFqTDtsXaJW7w490o4g9B%2BqKVYlsiDZF8L5ck7UNEaUGX8pC60nopyBuKBrHbOD0d%2FuNbeBvYJTHt8ixEQd%2BHz%2F7CtZgdjsvx6fLVXjY8jmsa8AMsYkj%2BRf%2FQqmmz2j8zhtFsrXjB%2BDheoVgQeXWeOw%2FB8t7n7lHtOBMGlVBZAe6NQOMcrKsBVQ8OwQJFyZlK%2BUQ0WC3NshtSUl1gbrk63VioZ0s4KqghPnbc4TcM644WOs3Od6zDvUyWsLNjN8%2B0jAFlkGDQaP7GhCFcLBvhV%2BdD7oX%2Fe1VchlAsL66vY8HBpoKLUhsBrV8LxJSLpIfDhe0g2XCL%2FolMrHLTq88S7aR3J1qZtY%3D');
      this.portal_menu=this._storageService.get('portal_menu');
    }
  ngOnInit() {
    this.loadInitialData();
  }

  ngAfterViewInit() {}

  async loadInitialData(): Promise<any> {
    try {
      
      const request = [this.loadDataMenu()];

      const [dataMenu] = await Promise.all(request);

      var dataMenuPortal = dataMenu.result;

      console.log(dataMenuPortal);

      for (let i = 0; i < dataMenuPortal.length; i++) {
        this.portal_menu.push({
          id: i + 1,
          link_icon: null,
          class: {
            menu: "col-md-3",
            card: "",
            icon: "card-icon icon-info",
          },
          title: dataMenuPortal[i].keterangan,
          subtitle: dataMenuPortal[i].aplikasi.toUpperCase(),
          internal: dataMenuPortal[i].link ? false : true,
          icon: dataMenuPortal[i].icon,
          type_menu: "general",
          sub_menu: [],
          link: dataMenuPortal[i].link
            ? dataMenuPortal[i].link
            : dataMenuPortal[i].aplikasi,
          app_id: dataMenuPortal[i].aplikasi,
          kode_klien: dataMenuPortal[i].kode_klien,
          password: dataMenuPortal[i].password,
        });
      }
    } catch (error) {
      //this.showSpinner();
    }
  }

  loadDataMenu(): Promise<any> {
    return this.dataService
      .getRequestLocal<any>("", {
        action:"master/aplikasi",
        where: " id >= '200' AND id_aktif ='Y'",
      })
      .toPromise();
  }

  toRoute(menu) {
    if (menu) {
      console.log(menu);
      this._storageService.set("route_id", menu.link);
      this._storageService.set("app_id", menu.app_id);
      this._storageService.set("keterangan_aplikasi", menu.title);
      this._storageService.set("kklien", menu.kode_klien);
      this._storageService.set("pklien", menu.password);

      this.router.navigate([menu.link]).then((result) => {});
      // this.router.navigate([]).then((result) => {
      //   window.open("#/" + menu.link, "_blank");
      // });
    }
  }
}
