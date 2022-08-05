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
import swal from "sweetalert2";
import { StorageService } from '../../services/storage.service';

@Injectable({
    providedIn: 'root',
})
export class PmbChildGuard implements CanActivate, CanActivateChild, CanLoad {
    /**
     * Constructor
     */
    constructor(private _authService: AuthService, private _router: Router,
        private _storageService: StorageService) { }

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
    private _check(redirectURL: string): Observable<any> {

        return this._authService.chekToken().pipe(
            switchMap((res) => {
                //console.log(res);


                // If the user is not authenticated...
                if (res) {
                    if (res.result['sisa waktu'] == '00:00:00' || res.result['sisa waktu'].indexOf("-") != -1) {
                        swal
                            .fire({
                                title: "Informasi Login",
                                text: "Session Login Telah Berakhir, Silahkan Login Ulang !",
                                icon: "warning",
                                showCancelButton: false,
                                customClass: {
                                    confirmButton: "btn btn-success",
                                    cancelButton: "btn btn-danger",
                                },
                                confirmButtonText: "Ok !",
                                cancelButtonText: "Batal",
                                buttonsStyling: false,
                            })
                            .then((result) => {
                                if (result.value) {
                                    this._storageService.remove('list_kelompok');
                                    this._storageService.remove('menu');
                                    this._storageService.remove('username');
                                    this._storageService.remove('kelompok');
                                    this._storageService.remove('user_token');
                                    
                                    var route_id = this._storageService.get('route_id');

                                    var to ="home";

                                    if(route_id){
                                        to =route_id+"/auth/login";
                                    }

                                    this._router.navigate([to], {
                                        queryParams: { redirectURL },
                                    });
                                }
                            });

                    } else {
                        return of(true);
                    }

                    // Prevent the access
                    return of(false);
                } else {
                    swal
                        .fire({
                            title: "Informasi Login",
                            text: "Session Login Telah Berakhir, Silahkan Login Ulang !",
                            icon: "warning",
                            showCancelButton: false,
                            customClass: {
                                confirmButton: "btn btn-success",
                                cancelButton: "btn btn-danger",
                            },
                            confirmButtonText: "Ok !",
                            cancelButtonText: "Batal",
                            buttonsStyling: false,
                        })
                        .then((result) => {
                            if (result.value) {
                                this._storageService.remove('list_kelompok');
                                this._storageService.remove('menu');
                                this._storageService.remove('username');
                                this._storageService.remove('kelompok');
                                this._storageService.remove('user_token');
                                var route_id = this._storageService.get('route_id');

                                    var to ="home";

                                    if(route_id){
                                        to =route_id+"/auth/login";
                                    }

                                    this._router.navigate([to], {
                                        queryParams: { redirectURL },
                                    });
                            }
                        });

                }

                // Allow the access
                return of(true);
            })
        );
    }
}
