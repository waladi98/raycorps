import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { isEmpty } from 'lodash';
import { MenuService } from './menu.service';
import { StorageService } from '../services/storage.service';

@Injectable({
    providedIn: 'root',
})
export class SubMenuResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private menuService: MenuService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        let parentMenu = this.menuService.getParentMenuId();
        if (!parentMenu) {
            return of([]);
        }
        // load sub menu
        return this.menuService.loadSubMenuItem(parentMenu);
    }
}
