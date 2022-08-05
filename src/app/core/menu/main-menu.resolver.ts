import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { MenuService } from './menu.service';

@Injectable({
    providedIn: 'root',
})
export class MainMenuResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(
        private menuService: MenuService,
        private storageService: StorageService
    ) {}

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
        // load sub menu
        // const menu = this.storageService.get('main_menu');
        // if (menu) {
        //     return of(menu);
        // }
        return this.menuService.loadMainMenu();
    }
}
