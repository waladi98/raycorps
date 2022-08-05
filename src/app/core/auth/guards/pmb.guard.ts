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
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../services/storage.service';

@Injectable({
    providedIn: 'root',
})
export class PmbGuard implements CanActivate, CanActivateChild, CanLoad {
    /**
     * Constructor
     */
    constructor(private _authService: AuthService, private _router: Router,private _storageService: StorageService) { }

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
        const redirectUrl = state.url === '/auth/sign-out' ? '/' : state.url;
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
        const redirectUrl = state.url === '/auth/sign-out' ? '/' : state.url;
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
        return this._check('/');
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
        var kode = environment.kodePmb;
        var password = environment.passPmb;

        this._storageService.set('kklien', kode);
        this._storageService.set('pklien', password);
        this._storageService.set('route_id', 'pmb');
        this._storageService.set('app_id', 'pmb');

        return this._authService.getTokenKlien(kode, password).pipe(
            switchMap((authenticated) => {
                // If the user is not authenticated...
                if (!authenticated) {
                    // Redirect to the sign-in page
                    this._router.navigate(['pmb/auth/login'], {
                        queryParams: { redirectURL },
                    });

                    // Prevent the access
                    return of(false);
                } else {
                    const appCode = this._authService.getAppCode();
                    if (!appCode || appCode !== AppCode.YARSI) {
                        this._router.navigate([''], {
                            queryParams: { redirectURL },
                        });

                        return of(false);
                    }
                }

                // Allow the access
                return of(true);
            })
        );
    }
}
