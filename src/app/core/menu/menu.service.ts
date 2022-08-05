import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { SubMenu, MainMenu } from './menu';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    private _subMenu: ReplaySubject<any[]> = new ReplaySubject<
        any[]
    >(1);
    private _mainMenu: ReplaySubject<MainMenu[]> = new ReplaySubject<
        MainMenu[]
    >(1);

    menuTitle: Subject<string> = new Subject();

    constructor(
        private dataService: DataService,
        private storageService: StorageService
    ) {}

    /**
     * Setter & getter for submenu
     *
     * @param value
     */
    set subMenu(value: any[]) {
        this._subMenu.next(value);
    }

    get subMenu$(): Observable<any[]> {
        return this._subMenu.asObservable();
    }any

    /**
     * Setter & getter for mainmenu
     *
     * @param value
     */
    set mainMenu(value: MainMenu[]) {
        // Store the value
        this.storageService.set('main_menu', value);
        this._mainMenu.next(value);
    }

    get mainMenu$(): Observable<MainMenu[]> {
        const menu = this.storageService.get('main_menu');
        if (menu) {
            return of(menu);
        }
        return this._mainMenu.asObservable();
    }

    /**
     * Loads sub menu item
     * @param parentMenu string
     * @returns FuseNavigationItem[] sub menu
     */
    loadSubMenuItem(parentMenu: string): Observable<any[]> {
        return this.dataService
            .getRequest<any[]>('/auth', {
                action: 'getSubMenu',
                main_menu_id: parentMenu,
            })
            .pipe(
                catchError((err) => {
                    return of([]);
                })
            );
    }

    /**
     * Loads sub main menu
     * @param parentMenu string
     * @returns MainMenu[] sub menu
     */
    loadMainMenu(): Observable<MainMenu[]> {
        return this.dataService
            .getRequest<MainMenu[]>('/auth', {
                action: 'getMainMenu',
            })
            .pipe(
                catchError((err) => {
                    return of([]);
                })
            );
    }

    /**
     * Set parent id to storage
     *
     * name in storage is obfuscated
     *
     * @param parentId any
     */
    setParentMenuId(parentId: any): void {
        this.storageService.set('pm_id', parentId);
    }

    /**
     * get parent menu from storage
     *
     * @returns string
     */
    getParentMenuId(): string {
        return this.storageService.get('pm_id');
    }

    /**
     * remove parent menu id from storage
     */
    removeParentMenuId(): void {
        this.storageService.remove('pm_id');
    }
}
