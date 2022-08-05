import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  Directive,
} from "@angular/core";

import { ROUTES } from "../../sidebar/sidebar.component";
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
} from "@angular/router";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { StorageService } from "../../core/services/storage.service";
import { AuthService } from "../../core/auth/auth.service";
import { finalize, takeUntil } from "rxjs/operators";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { DataService } from "../../../app/core/services/data.service";

//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  is_collapse?: boolean;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  icontype?: string;
  ab: string;
  type?: string;
  is_frame?: boolean;
  modul?: string;
}

//Menu Items
export const MENUSPMB: RouteInfo[] = [];

const misc: any = {
  navbar_menu_visible: 0,
  active_collapse: true,
  disabled_collapse_init: 0,
};

declare var $: any;
@Component({
  selector: "app-navbar-pmb-cmp",
  templateUrl: "navbar-pmb.component.html",
})
export class NavbarPmbComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private nativeElement: Node;
  private toggleButton: any;
  private sidebarVisible: boolean;
  private _router: Subscription;
  public menuItems: any[];
  storageService = new StorageService();
  listDataSalam: {
    kode;
    salam;
  };
  listDataPengguna = {
    akses_terakhir: null,
    kode: null,
    kode_hash: null,
    nama: null,
    path_to_foto: null,
    pengguna: null,
    tipe_login: null,
  };
  keterangan_aplikasi: null;
  @ViewChild("app-navbar-cmp", { static: false }) button: any;
  isScreenSmall: boolean;

  id_menu_active = null;

  listDataKelompok = [];
  listDataDelegasi = [];
  dataDelegasi = {
    id_kelompok: null,
    kelompok: null,
  };
  spinnerStatus = "Mohon Tunggu sedang memuat data..";
  isPreparingForm = false;
  isLoading = false;
  isDoneMakeForm = false;
  spinnerName = "formPmbSpinner";
  isOpenShortcut = false;
  id_kelompok = null;
  listDataBahasa = [
    { value: "id", viewValue: "Indonesia" },
    { value: "en", viewValue: "English" },
  ];
  private _serviceSubscription;
  portal_menu = [];

  constructor(
    location: Location,
    private renderer: Renderer2,
    private element: ElementRef,
    private router: Router,
    public breakpointObserver: BreakpointObserver,
    private _storageService: StorageService,
    public authService: AuthService,
    private dataService: DataService
  ) {
    this._serviceSubscription = this.authService.getLoggedInStatus.subscribe({
      next: (event: any) => {
        if (event.message == "1") {
          this.inisialisasiData(true);
        } else {
          this.inisialisasiData(false);
        }
        console.log(`Received message #${event.eventId}: ${event.message}`);
      },
    });

    let data_kelompok = this._storageService.get("list_kelompok");
    this.listDataKelompok = data_kelompok;

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenSmall = true;
          console.log("Matches small viewport or handset in portrait mode");
        } else {
          this.isScreenSmall = false;
        }
      });
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;

    this.portal_menu = this._storageService.get("portal_menu");
  }
  minimizeSidebar() {
    const body = document.getElementsByTagName("body")[0];

    if (misc.sidebar_mini_active === true) {
      body.classList.remove("sidebar-mini");
      misc.sidebar_mini_active = false;
    } else {
      setTimeout(function () {
        body.classList.add("sidebar-mini");

        misc.sidebar_mini_active = true;
      }, 300);
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function () {
      window.dispatchEvent(new Event("resize"));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function () {
      clearInterval(simulateWindowResize);
    }, 1000);
  }
  hideSidebar() {
    const body = document.getElementsByTagName("body")[0];
    const sidebar = document.getElementsByClassName("sidebar")[0];

    if (misc.hide_sidebar_active === true) {
      setTimeout(function () {
        body.classList.remove("hide-sidebar");
        misc.hide_sidebar_active = false;
      }, 300);
      setTimeout(function () {
        sidebar.classList.remove("animation");
      }, 600);
      sidebar.classList.add("animation");
    } else {
      setTimeout(function () {
        body.classList.add("hide-sidebar");
        // $('.sidebar').addClass('animation');
        misc.hide_sidebar_active = true;
      }, 300);
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function () {
      window.dispatchEvent(new Event("resize"));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function () {
      clearInterval(simulateWindowResize);
    }, 1000);
  }

  ngOnInit() {
    this.keterangan_aplikasi = this._storageService.get("app_id");
    let kelompok = this._storageService.get("kelompok");
    if (kelompok) {
      let data_kelompok = this._storageService.get("kelompok");

      this.changeListMenu(data_kelompok.id_kelompok);
    } else {
      this.menuItems = [];
    }
    // let kelompok = this._storageService.get("kelompok");
    // if (kelompok) {
    //   let kelompok = this._storageService.get("kelompok");
    //   // this.changeListMenu(kelompok.id_kelompok);
    // } else {
    //   this.menuItems = [];
    // }
    this.listTitles = ROUTES.filter((listTitle) => listTitle);

    const navbar: HTMLElement = this.element.nativeElement;
    const body = document.getElementsByTagName("body")[0];
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    if (body.classList.contains("sidebar-mini")) {
      misc.sidebar_mini_active = true;
    }
    if (body.classList.contains("hide-sidebar")) {
      misc.hide_sidebar_active = true;
    }
    this._router = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.sidebarClose();

        const $layer = document.getElementsByClassName("close-layer")[0];
        if ($layer) {
          $layer.remove();
        }
      });
  }
  async loadInitialData(id_kelompok): Promise<any> {
    this.isPreparingForm = true;
    const request = [
      this.loadDataSalam(),
      this.loadDataPengguna(),
      this.getDelegasiUser(id_kelompok),
      this.loadDataMenu(),
    ];
    const [listDataSalam, listDataPengguna, listDataDelegasi, dataMenu] =
      await Promise.all(request);
    this.listDataSalam = listDataSalam.result[0];
    this.listDataPengguna = listDataPengguna.result[0];
    this._storageService.set("pengguna", listDataPengguna);
    this.listDataDelegasi = listDataDelegasi.result;

    // console.log("TES-2", this.listDataPengguna.kode_hash.toString());
    this._storageService.set(
      "kode_pengguna",
      this.listDataPengguna.kode_hash.toString()
    );
    //console.log("TES-3", this.listDataPengguna.kode_hash);
    this.listDataDelegasi.unshift({
      delegasi_dari: this.listDataPengguna.pengguna,
      delegasi_kepada: this.listDataPengguna.pengguna,
      id_kelompok: id_kelompok,
      kode_delegasi_dari: this.listDataPengguna.kode,
      kode_delegasi_kepada: this.listDataPengguna.kode,
      kode_kelompok_pengguna: this.listDataPengguna.kode,
    });

    this.dataDelegasi = this._storageService.get("data_delegasi")
      ? this._storageService.get("data_delegasi")
      : this.listDataDelegasi[0];
    //console.log("TESTING", this.dataDelegasi.id_kelompok);
    if (!this._storageService.get("portal_menu")) {
      localStorage.setItem(
        "portal_menu",
        "U2FsdGVkX19oPoDNFpD6Dyhay3dLYeQwt5Ec0bYW%2BEVmgDQUR%2Fcat%2BdAgSlTsfCcaMCh%2Blg1cVlJJ0j9Hb3l4WMTDdgIC2mNFKYhYuBusAfLIrl9EnsdxkJ%2Fq9GjDj7kvxgjK3J9bgXtuCS0gtbBoFa4iQXX4u%2Fh2puD0w8mN7gG6PP%2BuKtPSEi%2FAvLCPvSIPrI4cGjTIzah5E0nsBUzGk8DLukj8X%2Fph887XTd%2BoiWb05ex%2FrVk%2BMFB8Dgh570eQWnZj96HIGqDZeo72svepG1OjnzVfn0cEH%2F0IG2JK9MaFgJJsag9BeUOttRL8UIViJ1%2FoKRCnBrhMNSL0WTIwk%2BJvbQ7WLpSNpWjqZnY6ic0ab8V3Okc6tcUmi4VQnxgxQUZlqsq%2BwBd2cb8xtoTmte%2FSDaQvT4ueWp%2F3J7YUlYsBsQiZS4u5RVhJJQnUCURwEkayoSOGeeY07Vwiw2k2PBQPXhYDAF3ql%2FtXRTc1xz99xlYLqzwpOWFfwOLdsF6kTmyjmXjSTQ5x6innZutZIbzhuaTrCukGWmbB7S8DlccDoiYwEzsEEss2nlN2%2BD%2FKQiFtHcPhhoa9aSGGC%2FjDmS2lme3%2BabtKyBhSRdzjaDPh8%2FQIvmNHndOLTG7MwB7YpbJIl0YGShE33uc4Sme007UjDK74PHPF3pEa%2FZbah4vK1f5NcOtQWm9Bf%2BzwIa9abpNVER0Qivxep20gZk%2FnqASdQSgAaAXe5D2dn5UwcqecMTBm8uY1Ou9k0cmiPo4t5rSGraZ8D3IGT0%2FgTnMWWk754%2FFMZUf9M%2F9wjoW1dhpZwhDpSWDCKr3MAtwExULrKvtDrNe9iiEjIkr%2Bo8EKqnVBWXEgwqSNwp4MzBUMcUdw30sae1g0D%2B0YEBhhIE7HQk6Wp2wficlth%2F6P6CkbOhcQaBRGmXJfPIeur5S%2By8jtxSmOmAlmfsd0eut24htsXEIoPJaZIbAKaHe1pBbP4RXzNQ6QFFM0dZyL4IANUBspCzlVLp7LZKj6zl2iAslsGWowDg9kboWZBMFRg%2FO0Zn7wCS00sUqhgkZ7O42eAb5gdeRY1lBGAynDKXLatnkUGTAyW91YMunEJv%2FKHx%2BK%2BCo3Hi%2Feb1Qp%2FC3FdtlWCFYW00lHA6IEacpLbia3MEzCWULOavgEmWYdiwNOolyyfQ1QO6fB63PiTnftTYnh3N6ycavpIHnXwr3nraTC2h64W0Vc%2FREpcyfuyp45C8HTBkTM8ov%2F82%2Fwlhx3dYHze6jrWzTHA291iquRivTi7jvw3HAKOzOwBgLS2%2BbxfrSS8AhOjQWl6cSQMQ%2FS9VDCUSH26cl4LwxmLaNbnlMSfy0bV0vsmv9I4zQKLr1iu%2FqmftazzyaLL9n2MaTYt4YlqYIL8%2FTs%2BWXD5JzO0CcA8fWCCNu%2BTC4WFw8mf3GKr9O82Pagaed3ZWfplcbS7RlRHdgm8aFVRJJOGwowgoL3p%2FwRmuTampI4yHjiMFfE1yp5Vw4TpEbGewc%2FvFhu2mwGTgc2VJzqO8isQBNiezraan%2Fl4FRmy4bnVFq3I7ZuoLFyW2gqCLGEV7SOG%2BFJ0emSB%2FC6lpF3EUvDCTXNbOyUcz1chKKpj3Q7i%2FfZDnHbZYp4Y7pXa17EeMA%2B8fcMPcCCTv%2BcPFRGoR0fONBVkd4v9g9oLMFXQddbMQiXeeN6R2vlzNaGDdoVoZNsSE9Kfq28NYZfklKtWAZHx2EVJM3Cw0gnMU0WMF7B7yAdxxxZ%2F4tF%2B6gvkp76IQkXY42y8M6fqSnsH7qTXd6mI6M63kxpoAum7rSpy0yy858AR9myFCjCIWN%2B11FFrj6hriNd41gNNa4YZybH6yLJpjMArHez%2BirOSdQBbykoAPqVJV0G5O1y4kgAZ6BgcxHkTdiLc%2FAIEau9Kx0NsDPhxJLcys85h2Rz8E84Mb0b2QV4wrx5DempN6PAr%2BzBp%2BrUfm1H3hY8tjKbD81VWqFvxLmbtHUX6vvneuwPGqxo%2BYp6WeDXderqIioHavxXzErNVgLUkXQRgR%2FzpMh44rD2JK3OPKlCq6%2FlEFmHtdpaLkhiUFU8CaEhrzrA7L0H2QvimnpUWhmiVweNQW6JpINvHOzpwhDgBMNNax51xU%2FuX2qX3dLz9ADFIVfbI5XT0cCNpFapKsRNuE0J3Q7LHmpKmgncIakXdugOJ5O4hAbM7aRzIMXcfd3l6r1xRSyNalSp9WHrsUPExnee1yhBIFeNxdlJwXsqyHzLkDXNggxX9USrXzolF%2Fj%2BTp9uee0WJnWKmt5aoyZjEilnCwN0L2k1NHdQQ4FZqFVOGQajqYXq%2Bbd%2Bnxi1i8ok5Bjpt%2BiuyoD1tjOxEYNR56fAQapKVT6Bp8HITVoGWFv%2FI7pxhaA4o4zJqaIq1UragY7PV6nt%2Bq5H0S7tSD0zOjDAXgR%2FGKKmEwX%2FHAR96M8uTEhtHydE9nvbi4F88BUDB3Z%2BDH1lk8m25MuW%2FV2UMbzbvKYnNhTBBKQesvLXfhTJ%2FYlUMoOZlETrkGp6rtdiFn7mgJQMGlEIh55sCRM8GegW4zV%2FakbkWUISgpeDmBX0T%2BXo0NTIjFOz5k2ryvWMKwIBzRysDcAVcsCsFUu8Cy1JkY7Bz8dzzw%2Ff3hXXh2KCtdWisTpXrnndoHSE%2Fn6B817vf4614%2Bl4XhOGgyGpcGQUJ336a8OgNVL6O6OND1JUnuyVY1P%2B7ygnidMej9OiyaQvWSGj3y2qI9PiFuRsfA4krBgjCrmPDv6vHROLmEzHoPAx%2BU2g7GZFHAz2PF1mwtCDXFA6AKnlIb6ZIl3HDh%2BjhpWnGRsAgpoPYedCLeV32c77WdKgZvu7z3n%2FZGPTP%2FreSTKtDKUcUcwatZxRrPs4n3zM7DA43i8q1R3NzSIgu%2Byyzm9oujhB7oNgsOtzZbXXlyyGtTLLZuUz3tvcU8I15VVsw%2FjruDd7URXuPzr4KZ3j%2BV3vXpQehwQws%2Bpi5ApFwTNhWVwX8rUWerH6dTQ5Ha8yu39AJwaQeEFS4%2FhjIx%2FOHEWFrRoptSa%2BrFJkko2efqpBoIHuvfgqLXRhkkHiL39ALQXwr9nht%2Fr2gTjmGIZvBPTLuLYxmAN0nCaLskOcxQnkeriSRo%2BQulWESgcwdt4T49Bg8CLUfQujoAXJk1V1LTr%2BH7BfE5lq%2Bcrem%2B6jPmTU%2B53oOW1TUul7TgtbEnODHs107Q4j1iAjkAmuQ18o2%2Fqhj14DSVRJENZDThKCuhc4y8I5acRkaoQ4Ff6RmnJZ8E6QxqDUcTPvAk%2BSEr2pIlHBEDA7BkSwvYORl8npQeRaoLl1VNWAJu%2BK%2B5vK5cnymIzToBIn750zeEycei9s%2FiIsQX2SFqTDtsXaJW7w490o4g9B%2BqKVYlsiDZF8L5ck7UNEaUGX8pC60nopyBuKBrHbOD0d%2FuNbeBvYJTHt8ixEQd%2BHz%2F7CtZgdjsvx6fLVXjY8jmsa8AMsYkj%2BRf%2FQqmmz2j8zhtFsrXjB%2BDheoVgQeXWeOw%2FB8t7n7lHtOBMGlVBZAe6NQOMcrKsBVQ8OwQJFyZlK%2BUQ0WC3NshtSUl1gbrk63VioZ0s4KqghPnbc4TcM644WOs3Od6zDvUyWsLNjN8%2B0jAFlkGDQaP7GhCFcLBvhV%2BdD7oX%2Fe1VchlAsL66vY8HBpoKLUhsBrV8LxJSLpIfDhe0g2XCL%2FolMrHLTq88S7aR3J1qZtY%3D"
      );
    }

    this.portal_menu = this._storageService.get("portal_menu");

    var dataMenuPortal = dataMenu.result;

    //console.log(dataMenuPortal);

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
    this.isPreparingForm = false;
    this.isDoneMakeForm = true;
  }
  onResize(event) {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
  sidebarOpen() {
    //console.log("open");
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);
    body.classList.add("nav-open");
    setTimeout(function () {
      $toggle.classList.add("toggled");
    }, 430);

    var $layer = document.createElement("div");
    // $layer.setAttribute("class", "close-layer");

    if (body.querySelectorAll(".main-panel-pmb")) {
      document.getElementsByClassName("main-panel-pmb")[0].appendChild($layer);
    } else if (body.classList.contains("off-canvas-sidebar")) {
      document
        .getElementsByClassName("wrapper-full-page")[0]
        .appendChild($layer);
    }

    setTimeout(function () {
      // $layer.classList.add("visible");
    }, 100);

    $layer.onclick = function () {
      //asign a function
      body.classList.remove("nav-open");
      this.mobile_menu_visible = 0;
      this.sidebarVisible = false;

      $layer.classList.remove("visible");
      setTimeout(function () {
        $layer.remove();
        $toggle.classList.remove("toggled");
      }, 400);
    }.bind(this);

    body.classList.add("nav-open");
    this.mobile_menu_visible = 1;
    this.sidebarVisible = true;
  }
  sidebarClose() {
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];
    const body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    var $layer = document.createElement("div");
    // $layer.setAttribute("class", "close-layer");

    this.sidebarVisible = false;
    body.classList.remove("nav-open");
    // $('html').removeClass('nav-open');
    body.classList.remove("nav-open");
    if ($layer) {
      $layer.remove();
    }

    setTimeout(function () {
      $toggle.classList.remove("toggled");
    }, 400);

    this.mobile_menu_visible = 0;
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }
    for (let i = 0; i < this.listTitles.length; i++) {
      if (
        this.listTitles[i].type === "link" &&
        this.listTitles[i].path === titlee
      ) {
        return this.listTitles[i].title;
      } else if (this.listTitles[i].type === "sub") {
        for (let j = 0; j < this.listTitles[i].children.length; j++) {
          let subtitle =
            this.listTitles[i].path + "/" + this.listTitles[i].children[j].path;
          // console.log(subtitle)
          // console.log(titlee)
          if (subtitle === titlee) {
            return this.listTitles[i].children[j].title;
          }
        }
      }
    }
    return "Dashboard";
  }
  getPath() {
    return this.location.prepareExternalUrl(this.location.path());
  }

  onHoverMenu(index) {
    for (let i = 0; i < this.menuItems.length; i++) {
      this.menuItems[i].is_collapse = false;
    }

    if (index >= 0) {
      this.menuItems[index].is_collapse = true;
    }
  }

  logout() {
    this.authService
      .signOut()
      .pipe(
        finalize(() => {
          swal.fire({
            title: "Logout !",
            text: "I will close in 1 seconds.",
            timer: 1000,
            showConfirmButton: false,
          });
          this.menuItems = [];
          setTimeout(() => {
            this._storageService.remove("list_kelompok");
            this._storageService.remove("menu");
            this._storageService.remove("username");
            this._storageService.remove("kelompok");
            this._storageService.remove("user_token");
            this._storageService.remove("hsiotyr");
            this._storageService.remove("hsiotyr_header");
            this._storageService.remove("frame_title");
            this._storageService.remove("title");
            this._storageService.remove("home");
            this._storageService.remove("kode_pengguna");
            this._storageService.remove("welcome");
            this._storageService.remove("notif");
            this._storageService.remove("notifKelengkapan");
            this._storageService.remove("peserta_id");
            this._storageService.remove("proses_persyaratan");
            this._storageService.remove("kode_daftar_periksa_audit");
            // this._storageService.clear();
            var route_id = this._storageService.get("route_id");
            if (route_id == "pmb") {
              this.router.navigate(["/" + route_id]);
            } else {
              this.router.navigate([route_id + "/auth/login"]);
            }
          }, 1000);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );

    console.log("logout");
  }

  clickMenu(id, menuitem) {
    var element = document.getElementById(id);
    element.classList.remove("show");
    this._storageService.set("frame_url", menuitem.frame_url);
    this._storageService.set("title", menuitem.title);
    this._storageService.set("frame_title", menuitem.frame_title);
    var route_id = this._storageService.get("route_id");

    if (menuitem.is_frame) {
      this.router.navigate([route_id + "/frame/" + menuitem.modul]);
    }
  }

  clickMenuActive(id) {
    //console.log(id);
    if (this.id_menu_active) {
      var element = document.getElementById(this.id_menu_active);
      element.classList.remove("show");
    }
    this.id_menu_active = id;
  }

  get loggedIn() {
    return this._storageService.get("user_token") ? true : false;
  }

  inisialisasiData(statusLogin) {
    if (statusLogin) {
      let kelompok = this._storageService.get("kelompok");
      if (kelompok) {
        let data_kelompok = this._storageService.get("kelompok");
        this.changeListMenu(data_kelompok.id_kelompok);
      } else {
        this.menuItems = [];
      }

      let data_kelompok = this._storageService.get("list_kelompok");
      this.listDataKelompok = data_kelompok;
    } else {
      this.menuItems = [];
    }
  }

  changeUserKelompok(data) {
    this._storageService.set("kelompok", data);
    this.changeListMenu(data.id_kelompok);
  }
  loadDataSalam(): Promise<any> {
    return this.dataService
      .getRequest<any>("/master/salam", {
        where: "kode='" + this._storageService.get("username") + "'",
      })
      .toPromise();
  }
  loadDataPengguna(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pengguna", {
        where: "kode='" + this._storageService.get("username") + "'",
      })
      .toPromise();
  }
  changeListMenu(id_kelompok): void {
    this.loadInitialData(id_kelompok);
    var app_id = this._storageService.get("app_id");
    if (app_id) {
      this.dataService
        .getPostRequest<any>("/master/menuKelompok", {
          where:
            "id_kelompok=" +
            id_kelompok +
            " AND aplikasi= '" +
            app_id +
            "' AND id_aktif = 'Y'",
          limit: "200",
        })
        .subscribe(
          (response) => {
            // this.menuItems=[];
            this.menuItems = this.buildMenu(response.result);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.menuItems = this.buildMenu([]);
    }
  }

  buildMenu(list) {
    let filteredArr = list.reduce((acc, current) => {
      const x = acc.find((item) => item.modul === current.modul);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    let menu = [];

    for (let i = 0; i < filteredArr.length; i++) {
      let children = [];
      for (let j = 0; j < list.length; j++) {
        if (list[j].modul == filteredArr[i].modul) {
          children.push({
            path: list[j].link,
            title: list[j].menu,
            frame_title: list[j].frame_title,
            icontype: "",
            ab: "I",
            is_frame: list[j].frame_param ? true : false,
            modul: list[j].frame_param,
            frame_url: list[j].frame_url,
            line_break: list[j].line_break,
          });
        }
      }

      menu.push({
        path: "",
        title: filteredArr[i].modul,
        type: "sub",
        icontype: "storagel",
        collapse: filteredArr[i].modul,
        is_collapse: false,
        children: children,
      });
    }

    //console.log(menu);

    this._storageService.set("menu", JSON.stringify(menu));

    return menu;
  }

  toRoute(id, link) {
    //console.log(link);
    if (link) {
      var element = document.getElementById(id);
      element.classList.remove("show");
      this.router.navigate([link.path]);
    }
  }

  toHome() {
    var home = this._storageService.get("home");
    if (home) {
      this.router.navigate([home]);
    }
  }

  toLogin() {
    var route_id = this._storageService.get("route_id");
    if (route_id) {
      this.router.navigate([route_id + "/auth/login"]);
    }
  }

  getDelegasiUser(id_kelompok): Promise<any> {
    return this.dataService
      .getRequest<any>("/master/penggunaDelegasi", {
        select:
          "kode_delegasi_dari,kode_delegasi_kepada,delegasi_dari,delegasi_kepada,id_kelompok,kode_kelompok_pengguna",
        where:
          "kode_delegasi_kepada= '" +
          this._storageService.get("username") +
          "' and id_kelompok = '" +
          id_kelompok +
          "'",
      })
      .toPromise();
  }

  changeDelegasi(data) {
    this._storageService.set("data_delegasi", data);

    this.dataDelegasi = data;
  }

  loadDataMenu(): Promise<any> {
    return this.dataService
      .getRequestLocal<any>("", {
        action: "master/aplikasi",
        where: " id >= '200' AND id_aktif ='Y'",
      })
      .toPromise();
  }

  toRouteMenuPortal(menu) {
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
