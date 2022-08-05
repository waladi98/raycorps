import {
  Component,
  OnInit,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { DataService } from "../../core/services/data.service";
import { environment } from "../../../environments/environment";
import * as CryptoJS from "crypto-js";
import { StorageService } from "../../core/services/storage.service";
declare var $: any;

@Component({
  selector: "app-pmb-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  test: Date = new Date();
  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;

  @ViewChild("signInNgForm") signInNgForm: NgForm;
  signInForm: FormGroup;
  title: any;
  hide = true;
  showAlert: boolean = false;
  isLoading = false;

  constructor(
    private element: ElementRef,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private dataService: DataService,
    private _storageService: StorageService,
  ) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.title = this._storageService.get("keterangan_aplikasi");
    this.signInForm = this._formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      rememberMe: [""],
    });
  }

  signIn(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      this.isLoading = false;
      return;
    }

    // Disable the form
    this.signInForm.disable();
    // Hide the alert
    this.showAlert = false;

    // Sign in
    this._authService.signIn(this.signInForm.value).subscribe(
      (data) => {
        if (data.code == 200) {
          console.log(data);

          this.loadInitData(this.signInForm.value.username);
        } else if (data.code == 401) {
          this.isLoading = false;
          // Re-enable the form
          this.signInForm.enable();

          swal.fire({
            icon: "warning",
            title: "Mohon Maaf..",
            text: data.message,
          });
          this.showAlert = true;
        } else if (data.code == 500) {
          this.isLoading = false;
          // Re-enable the form
          this.signInForm.enable();

          swal.fire({
            icon: "info",
            title: "Internal Server Error-500",
            text: "Mohon maaf, sepertinya sedang ada kendala diserver kami, silahkan hubungin Administrator untuk informasi lebih lanjut!",
          });
          this.showAlert = true;
        } else {
          this.isLoading = false;
          // Re-enable the form
          this.signInForm.enable();

          swal.fire({
            icon: "error",
            title: "Mohon Maaf..",
            text: "Sepertinya Username/Password salah!!",
          });

          this.showAlert = true;
        }
      },
      (response) => {
        // Re-enable the form
        this.isLoading = false;
        this.signInForm.enable();

        swal.fire({
          icon: "error",
          title: "koneksi internetmu tergangung!",
          text: "Yuk, pastikan internetmu lancar dengan cek ulang paket data, WIFI, atau jaringan di tempatmu",
        });

        // Show the alert
        this.showAlert = true;
      }
    );
  }

  toggleLoading(): void {
    this.isLoading = true;
    this.signIn();
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 4000);
  }

  async loadInitData(username): Promise<any> {
    try {
      var route_id = this._storageService.get("route_id");
      const request = [this.getListKelompok(username), this.getRole(username)];

      const [listKelompok, role] = await Promise.all(request);
      var listDataKelompok = listKelompok.result;
      this._authService.setKelompok(listDataKelompok);

      let route_dashboard = "/" + route_id + "/dashboard";

      if (listDataKelompok.length > 0) {
        if (listDataKelompok[0].id_kelompok == "100") {
          route_dashboard = "/" + route_id + "/dashboard";
        }
        // else if (listDataKelompok[0].id_kelompok == "921") {
        //   route_dashboard = "/pmb/dashboard";
        // } else if (listDataKelompok[0].id_kelompok == "922") {
        //   route_dashboard = "/pmb/dashboard-pmb-adm";
        // } else if (listDataKelompok[0].id_kelompok == "923") {
        //   route_dashboard = "/pmb/dashboard-pmb-adm";
        // } else if (listDataKelompok[0].id_kelompok == "925") {
        //   route_dashboard = "/pmb/dashboard-pmb-keuangan";
        // } else if (listDataKelompok[0].id_kelompok == "929") {
        //   route_dashboard = "/pmb/dashboard-pmb-adm";
        // }
      }

      this._storageService.set("home", route_dashboard);
      
      this._storageService.set("role", role.result[0]);

      const redirectURL =
        this._activatedRoute.snapshot.queryParamMap.get("redirectURL") ||
        route_dashboard;

      this._router.navigateByUrl(redirectURL);
    } catch (error) {
      console.log(error);
    }
  }

  getListKelompok(username): Promise<any> {
    let app_id = this._storageService.get("app_id");
    return this.dataService
      .getPostRequestLocal<any>("", {
        action:"pengguna/kelompok",
        select: "id_kelompok,kelompok",
        where:
          "kode_pengguna='" +
          username +
          "' AND EXISTS (SELECT 0 FROM sv_menu_kelompok WHERE aplikasi = '" +
          app_id +
          "' AND sv_pengguna_kelompok.id_kelompok = sv_menu_kelompok.id_kelompok AND sv_menu_kelompok.id_aktif = 'Y')",
      })
      .toPromise();
  }

  getRole(username): Promise<any> {
    return this.dataService
      .getPostRequest<any>("/klien/pengguna", {
        where:
          "kode_pengguna = '" +
          username +
          "' and kode_klien = '" +
          environment.kodePmb +
          "'",
      })
      .toPromise();
  }
}
