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

@Injectable({
  providedIn: "root",
})
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  /**
   * Constructor
   */
  constructor(private _authService: AuthService, private _router: Router) {}

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
    return this._check();
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
    return this._check();
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
    return this._check();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Check the authenticated status
   *
   * @private
   */
  private _check(): Observable<boolean> {
    //console.log("no auth");
    // Check the authentication status
    return this._authService.check().pipe(
      switchMap((authenticated) => {
        // If the user is authenticated...
        if (authenticated) {
          const appCode = this._authService.getAppCode();
          switch (appCode) {
            case AppCode.HRPORTAL:
              this._router.navigate(["main-sign-in"]);
              break;
            case AppCode.RECRUITMENT:
              this._router.navigate(["recruitment-login"]);
              break;
            default:
              this._router.navigate(["/404"]);
              break;
          }

          // Prevent the access
          return of(false);
        }

        // Allow the access
        return of(true);
      })
    );
  }
}
