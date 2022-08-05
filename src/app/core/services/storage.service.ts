import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import * as CryptoJS from "crypto-js";

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor() { }

    /**
     * setData
     * @param key string
     * @param data any
     */
    public set(key: string, data: any): boolean {
        if (typeof data === 'object') {
            let encryp_role = encodeURIComponent(
                CryptoJS.AES.encrypt(
                    JSON.stringify(data),
                    environment.secret_key
                ).toString()
            );
            localStorage.setItem(key, encryp_role);
        } else if (typeof data !== 'undefined') {
            let encryp_role = encodeURIComponent(
                CryptoJS.AES.encrypt(
                    data,
                    environment.secret_key
                ).toString()
            );
            localStorage.setItem(key, encryp_role);
        } else {
            return false;
        }
       
        return true;
    }

    /**
     * @param key string
     */
    public get(key: string): any {
        let response = null;
        if (key) {
            const data = localStorage.getItem(key);
            var decrypt_data = CryptoJS.AES.decrypt(decodeURIComponent(data), environment.secret_key);

            var decrypt=decrypt_data.toString(CryptoJS.enc.Utf8);
            if (this.isJson(decrypt)) {
                response = JSON.parse(decrypt);
            } else {
                response = decrypt;
            }
        }

        return response;
    }

    /**
     *
     * isJson
     * @param str string
     * @returns boolean
     *
     */
    private isJson(str: string): boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    /**
     * remove remove data from localStorage
     * @param key
     */
    public remove(key: string): boolean {
        localStorage.removeItem(key);
        return true;
    }

    /**
     * clear
     */
    public clear(): void {
        localStorage.clear();
    }
}
