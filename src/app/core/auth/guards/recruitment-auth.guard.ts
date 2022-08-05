import { Injectable } from '@angular/core';
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
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { switchMap } from 'rxjs/operators';
import { AppCode } from '../../../shared/types/enum';

@Injectable({
    providedIn: 'root',
})
export class RecruitmentAuthGuard
    implements CanActivate, CanActivateChild, CanLoad
{
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
        const redirectUrl =
            state.url === '/recruitment/logout'
                ? '/recruitment/login'
                : state.url;
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
        const redirectUrl =
            state.url === '/recruitment/logout'
                ? '/recruitment/login'
                : state.url;
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
        return this._check('/recruitment/login');
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
    private _check(redirectURL: string): Observable<boolean> {
        // Check the authentication status

        return this._authService.check().pipe(
            switchMap((authenticated) => {
                // If the user is not authenticated...
                if (!authenticated) {
                    // Redirect to the sign-in page
                    this._router.navigate(['recruitment-login']);
                    // Prevent the access
                    return of(false);
                } else {
                    const appCode = this._authService.getAppCode();
                    if (appCode !== AppCode.RECRUITMENT) {
                        this._router.navigate(['']);

                        return of(false);
                    }
                }

                // Allow the access
                return of(true);
            })
        );
    }
}
