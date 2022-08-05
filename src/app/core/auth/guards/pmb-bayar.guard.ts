import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../auth.service";
import { switchMap } from "rxjs/operators";
import { AppCode } from "../../../shared/types/enum";
import { environment } from "../../../../environments/environment";
import swal from "sweetalert2";
import { StorageService } from "../../services/storage.service";

@Injectable({
  providedIn: "root",
})
export class PmbBayarGuard implements CanActivate, CanActivateChild, CanLoad {
  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _storage: StorageService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Can activate
   *
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const redirectUrl = state.url === "/auth/sign-out" ? "/" : state.url;
    return this._check(redirectUrl);
  }

  /**
   * Can activate child
   *
   * @param childRoute
   * @param state
   */
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const redirectUrl = state.url === "/auth/sign-out" ? "/" : state.url;
    return this._check(redirectUrl);
  }

  /**
   * Can load
   *
   * @param route
   * @param segments
   */
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this._check("/");
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Check the authenticated status
   *
   * @param redirectURL
   * @private
   */
  private _check(redirectURL: string): Observable<any> {
    var kode = this._storage.get("username");

    return this._authService.getInfoFormulirOnline(kode).pipe(
      switchMap((result) => {
        //console.log(result);

        if (!result) {
          this._router.navigate(["pmb/dashboard"], {
            queryParams: { redirectURL },
          });

          return of(false);
        } else {
          var dataFromulir =
            result.result.length > 0 ? result.result[0] : false;
          if (dataFromulir) {
            console.log("DATA", dataFromulir);
            if (
              dataFromulir.id_status_bayar == "N" ||
              dataFromulir.id_status_bayar == "G" ||
              dataFromulir.id_status_bayar == "T" ||
              dataFromulir.id_status_bayar == "S"
            ) {
              swal
                .fire({
                  icon: "warning",
                  title: "Menu belum bisa diakses",
                  text: "Selesaikan pembayaran formulir terlebih dahulu",
                })
                .then((result) => {
                  this._router.navigate(["pmb/dashboard"], {
                    queryParams: { redirectURL },
                  });
                });

              return of(false);
            }
          } else {
            swal
              .fire({
                icon: "warning",
                title: "Menu belum bisa diakses",
                text: "Selesaikan pembayaran formulir terlebih dahulu",
              })
              .then((result) => {
                this._router.navigate(["pmb/dashboard"], {
                  queryParams: { redirectURL },
                });
              });

            return of(false);
          }
        }

        return of(true);
      })
    );
  }
}
