import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  Observable,
  of,
  ReplaySubject,
  throwError,
  BehaviorSubject,
} from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { AuthUtils } from "./auth.utils";
import { UserService } from "../user/user.service";
import { environment } from "../../../environments/environment";
import { StorageService } from "../services/storage.service";
import * as CryptoJS from "crypto-js";
import { DataService } from "../../../app/core/services/data.service";

export class MyServiceEvent {
  message: string;
  eventId: number;
}

@Injectable()
export class AuthService {
  public isLoggedIn$: BehaviorSubject<boolean>;
  public getLoggedInStatus: EventEmitter<MyServiceEvent> =
    new EventEmitter<MyServiceEvent>();
  private _authenticated: boolean = false;

  lastRegisterIdCard: ReplaySubject<string> = new ReplaySubject(1);

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService,
    private _storage: StorageService,
    private dataService: DataService
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    this._storage.set("token", token);
  }

  get accessToken(): string {
    return this._storage.get("token") ?? "";
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post("api/auth/forgot-password", email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this._httpClient.post("api/auth/reset-password", password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { username: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    // if (this._authenticated) {
    //     return throwError('User is already logged in.');
    // }

    const url = "";
    const params = {
      action: "pengguna/otorisasi",
      username: credentials.username,
      password: credentials.password,
      appID: environment.appID,
      token: this.accessToken,
    };

    return this.dataService.getPostRequestLocal(url, params).pipe(
      switchMap((response: any) => {
        //console.log(response);

        if (response.code == 200) {

          this._authenticated = true;

          this._storage.set("username", credentials.username);
          this.setUserToken(response.result.user_token);
        } else {
          this._authenticated = false;
        }

        return of(response);
      })
    );
  }

  getListKelompok(user_token, username): Observable<any> {
    const url = environment.baseURL + "/pengguna/kelompok";
    return this._httpClient
      .post(url, {
        username: username,
        user_token: user_token,
        select: "id_kelompok,kelompok",
        where: "kode_pengguna='" + username + "'",
      })
      .pipe(
        switchMap((response: any) => {
          return of(response);
        })
      );
  }

  signInCandidate(credentials: {
    username: string;
    password: string;
  }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError("User is already logged in.");
    }

    const url = environment.baseURL + "/endpoint/auth";
    const params = {
      username: credentials.username,
      password: credentials.password,
      appID: environment.appID,
      action: "doLoginRecruitment",
    };

    return this._httpClient.post(url, params).pipe(
      switchMap((response: any) => {
        // Store the access token in the local storage
        this.accessToken = response.token;

        // Set the authenticated flag to true
        this._authenticated = true;

        // set token
        this.setToken(response.token);
        this._storage.set("isAdmin", false);

        // Return a new observable with the response
        return of(response);
      })
    );
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any> {
    // Renew token
    const url = environment.baseURL + "/endpoint/auth";

    const token = this._storage.get("token");

    this.setToken(token);
    return of(true);

    // return this._httpClient
    //     .post(url, {
    //         tokenID: this._storage.get('tokenID'),
    //         appID: environment.appID,
    //         action: 'refreshToken',
    //     })
    //     .pipe(
    //         catchError(() => {
    //             // Return false
    //             const token = this._storage.get('token');

    //             this.setToken(token);
    //             return of(true);
    //             // return of(false);
    //         }),
    //         switchMap((response: any) => {
    //             // Store the access token in the local storage
    //             this.accessToken = response.token;

    //             // Set the authenticated flag to true
    //             this._authenticated = true;

    //             // set token
    //             this.setToken(response.token);

    //             // Return true
    //             return of(true);
    //         })
    //     );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    // this._storage.clear();

    localStorage.removeItem("token");
    this.getLoggedInStatus.emit({ message: "0", eventId: 400 });

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: {
    name: string;
    email: string;
    password: string;
    company: string;
  }): Observable<any> {
    return this._httpClient.post("api/auth/sign-up", user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this._httpClient.post("api/auth/unlock-session", credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    // if (AuthUtils.isTokenExpired(this.accessToken)) {
    //     return of(false);
    // }

    // If the access token exists and it didn't expire, sign in using it
    return this.signInUsingToken();
    // return of(true);
  }

  /*
   * @param token
   * get token
   */
  public setToken(token: string): void {
    if (token) {
      // const decodeToken = AuthUtils.decodeChiperToken(token);
      const user: any = {
        expired: "6000000",
        flagApp: "yarsi",
        group: "admin",
        images: null,
        name: "Admin User",
        nama: "Admin User",
        section: "admin",
        userID: "admin",
        username: "admin",
        email: "admin@mail.com",
        avatar: null,
        status: "online",
        photo: null,
      };
      this._storage.set("kode", "demo");
      this._storage.set("token", token);
      // this._storage.set('tokenID', decodeToken.tokenID);
      // this._storage.set('appID', decodeToken.appID);

      // Object.keys(decodeToken.data).forEach((val) => {
      //     this._storage.set(val, decodeToken.data[val]);
      //     if (val === 'photo') {
      //         this._storage.set('avatar', decodeToken.data[val]);
      //         user['avatar'] = decodeToken.data[val];
      //     }
      //     user[val] = decodeToken.data[val];
      // });
      // Store the user on the user service
      this._userService.user = user;
    }
  }

  public setUserToken(user_token: string): void {
    if (user_token) {
      this._storage.set("user_token", user_token);
    }
  }

  getAppCode(): string | null {
    const token = this._storage.get("token");
    if (!token) {
      return null;
    }
    // const decodeToken = AuthUtils.decodeChiperToken(token);

    return "yarsi" || null;
  }

  getTokenKlien(kode, password): Observable<boolean> {
    if(kode=='ws_smart'){
      return this.aksesUsingTokenKlienHome(true, kode, password);
    }else{
      return this.aksesUsingTokenKlien(true, kode, password);
    }
  }

  aksesUsingTokenKlienHome(status, kode, password): Observable<any> {
    // Renew token

    var klien="pmb";
    if(kode=='ws_smart'){
      klien="smart";
    }


    const url = environment.baseLocalURL + "/"+klien;
    return this._httpClient
      .post(url, {})
      .pipe(
        catchError(() => {
          // Return false
          const token = this._storage.get("token");

          this.setToken(token);
          if (status) {
            return of(true);
          } else {
            return of(false);
          }
          // return of(false);
        }),
        switchMap((response: any) => {
          // Store the access token in the local storage
          this.accessToken = response.result.token;

          // Set the authenticated flag to true
          this._authenticated = true;

          // set token
          this.setToken(response.result.token);

          if (status) {
            return of(true);
          } else {
            return of(false);
          }
          // Return true
        })
      );
  }

  aksesUsingTokenKlien(status, kode, password): Observable<any> {
    // Renew token

    var klien = "pmb";
    if (kode == 'ws_smart') {
      klien = "smart";
    }

    var param = {
      action: 'klien/login',
      kode: this._storage.get('kklien'),
      password: this._storage.get('pklien'),
    }

    return this.dataService
      .getPostRequestLocal<any>("", param)
      .pipe(
        catchError(() => {
          // Return false
          const token = this._storage.get("token");

          this.setToken(token);
          if (status) {
            return of(true);
          } else {
            return of(false);
          }
        }),
        switchMap((response: any) => {
          // Store the access token in the local storage
          this.accessToken = response.result.token;

          // Set the authenticated flag to true
          this._authenticated = true;

          // set token
          this.setToken(response.result.token);

          if (status) {
            return of(true);
          } else {
            return of(false);
          }
        })
      );
  }

  public setKelompok(data): void {
    if (data) {
      this._storage.set("kelompok", data[0]);
      this._storage.set("list_kelompok", data);
      this.getLoggedInStatus.emit({ message: "1", eventId: 200 });
    }
  }

  checkUserLogin(): Observable<boolean> {
    if (this._authenticated) {
    } else {
    }

    if (!this.accessToken) {
      return of(false);
    }
  }

  chekToken(): Observable<any> {
    return this.aksesUsingCheckToken();
  }

  aksesUsingCheckToken(): Observable<any> {
    // Renew token

    let user_token = this._storage.get("user_token");

    if (user_token) {
      const url = environment.baseURL + "/pengguna/check";
      return this._httpClient
        .post(url, {
          user_token: user_token,
        })
        .pipe(
          catchError(() => {
            return of(false);
            // return of(false);
          }),
          switchMap((response: any) => {
            // Return true
            return of(response);
          })
        );
    }

    return of(false);
  }

  chekUserToken(kode, password): Observable<boolean> {
    return (
      this.aksesUsingCheckUserToken(),
      this.aksesUsingTokenKlien(false, kode, password)
    );
  }

  aksesUsingCheckUserToken(): Observable<any> {
    // Renew token

    let user_token = this._storage.get("user_token");

    if (user_token) {
      return of(true);
    }

    return of(false);
  }

  getRole(): any {
    //console.log('datas');
    let role_encryp = this._storage.get("role");

    if (!role_encryp) {
      return null;
    }

    return role_encryp;
  }

  getInfoFormulirOnline(kode): Observable<any> {
    return this.infoFormulirOnline(kode);
  }

  infoFormulirOnline(kode): Observable<any> {
    return this.dataService
      .getRequest<any>("/pmb/formulirOnline", {
        where: "id='" + kode + "'",
      })
      .pipe(
        catchError(() => {
          return of(false);
        }),
        switchMap((response: any) => {
          return of(response);
        })
      );
  }

  getInfoPeserta(kode): Observable<any> {
    return this.infoPesertaLulus(kode);
  }

  infoPesertaLulus(kode): Observable<any> {
    return this.dataService
      .getRequest<any>("/pmb/peserta", {
        where: "formulir_id='" + kode + "'",
      })
      .pipe(
        catchError(() => {
          return of(false);
        }),
        switchMap((response: any) => {
          return of(response);
        })
      );
  }
}
