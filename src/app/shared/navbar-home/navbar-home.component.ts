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
import { DataService } from "../../core/services/data.service";

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
  selector: "app-navbar-home-cmp",
  templateUrl: "navbar-home.component.html",
})
export class NavbarHomeComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private nativeElement: Node;
  private toggleButton: any;
  private sidebarVisible: boolean;
  private _router: Subscription;
  public menuItems: any[];
  storageService = new StorageService();

  @ViewChild("app-navbar-cmp", { static: false }) button: any;
  isScreenSmall: boolean;

  id_menu_active = null;

  listDataKelompok = [];

  private _serviceSubscription;

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
  onResize(event) {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
  sidebarOpen() {
    console.log('open');
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
            this._storageService.remove('list_kelompok');
            this._storageService.remove('menu');
            this._storageService.remove('username');
            this._storageService.remove('kelompok');
            this._storageService.remove('user_token');
            this._storageService.remove('welcome');
            // this._storageService.clear();
            this._storageService.remove('peserta_id');

            this.router.navigate(["/pmb"]);
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
  }

  clickMenuActive(id) {
    console.log(id);
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

  changeListMenu(id_kelompok): void {
    this.dataService
      .getPostRequest<any>("/master/menuKelompok", {
        where: "id_kelompok=" + id_kelompok + " AND aplikasi= 'pmb'",
        limit: "100",
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

    console.log(menu);

    this._storageService.set("menu", JSON.stringify(menu));

    return menu;
  }

  toRoute(id,link) {
    console.log(link);
    if (link) {
      var element = document.getElementById(id);
      element.classList.remove("show");
      this.router.navigate([link.path]);
    }
  }

  toHome() {
    var home = this._storageService.get('home');
    if (home) {
      this.router.navigate([home]);
    }
  }
}
