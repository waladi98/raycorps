import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    
    private _status: boolean;

    constructor() {
        this._status = false;
    }

    getStatus(): boolean{
        return this._status;
    }

    changeStatus(status: boolean) {
        this._status = status;
    }
}
