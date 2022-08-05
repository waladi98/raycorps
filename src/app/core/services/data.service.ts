import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest,HttpHandler,HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FormResponse } from '../../shared/types/common';
import { catchError, tap,map, finalize } from 'rxjs/operators';
import * as CryptoJS from "crypto-js";
import { StorageService } from "../services/storage.service";

@Injectable({
    providedIn: 'root',
})
export class DataService{
    /**
     * Endpoint
     */
    private _endPoint: string;
    private _endPoint_local: string;

    /**
     * Creates an instance of data service.
     * @param http http client
     */
    constructor(private http: HttpClient,
        private _storage: StorageService) {
        this._endPoint = environment.baseURL + '';
        this._endPoint_local = environment.baseLocalURL + '';
    }

   

    /**
     * Make request with get request
     * @template T interface template
     * @param  url url of resource
     * @param params http parameters
     * @returns Observables<T>
     */
    getRequest<T>(url: string, params?: object): Observable<T> {
        let headers = new HttpHeaders({
            'Cache-Control':
                'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
            Pragma: 'no-cache',
            Expires: '0',
            user_token: 'befbc006c58142110805e7312442065e33b37889af1f9cd31116a0fe85bcd0ef09491ddf533cf6154bd1ecbdf80bb675b2005549c026d9514ba45089e58d1791',
        });

        let httpParams = new HttpParams();

        if (typeof params === 'object') {
            Object.keys(params).forEach((key) => {
                if (typeof params[key] !== 'undefined') {
                    httpParams = httpParams.append(key, params[key]);
                }
            });
        }

        if (this._storage.get('user_token')) {
            httpParams = httpParams.append('user_token', this._storage.get('user_token'));
        }

        if (this._storage.get('token')) {
            httpParams = httpParams.append('token', this._storage.get('token'));
        }

        if (this._storage.get('username')) {
            var username=(this._storage.get('data_delegasi'))?this._storage.get('data_delegasi').kode_delegasi_dari:this._storage.get('username');
            httpParams = httpParams.append('username', username);
        }

        return this.http.get<T>(this._endPoint + url, {
            params: httpParams,
            headers: headers,
        }).pipe(
            tap( // Log the result or error
                {
                    next: (data) => this.clearconsole(),
                    error: (error) => this.clearconsole()
                }
            )
        );
    }

    getRequestLocal<T>(url: string, params?: object): Observable<T> {
        let headers = new HttpHeaders({
            'Cache-Control':
                'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
            Pragma: 'no-cache',
            Expires: '0',
            user_token: 'befbc006c58142110805e7312442065e33b37889af1f9cd31116a0fe85bcd0ef09491ddf533cf6154bd1ecbdf80bb675b2005549c026d9514ba45089e58d1791',
        });

        let httpParams = new HttpParams();
        const obj = {};

      
        if (typeof params === 'object') {
            Object.keys(params).forEach((key) => {
                if (typeof params[key] !== 'undefined') {
                    obj[key] = params[key];
                    // httpParams = httpParams.append(key, params[key]);
                }
            });
        }
        if (this._storage.get('user_token')) {
            obj['user_token'] = this._storage.get('user_token');

            // httpParams = httpParams.append('user_token', this._storage.get('user_token'));
        }

        if (this._storage.get('token')) {
            obj['token'] = this._storage.get('token');

            // httpParams = httpParams.append('token', this._storage.get('token'));
        }

        if (this._storage.get('username')) {
            var username=(this._storage.get('data_delegasi'))?this._storage.get('data_delegasi').kode_delegasi_dari:this._storage.get('username');
            obj['username'] = username;

            // httpParams = httpParams.append('username', this._storage.get('username'));
        }

        const CryptoJSAesJson = {
            stringify: function (cipherParams) {
                const vbJsonString = {
                  ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
                };
                if (cipherParams.iv) {
                  vbJsonString['iv'] = cipherParams.iv.toString()
                };
                if (cipherParams.salt) {
                  vbJsonString['s'] = cipherParams.salt.toString()
                };
                return JSON.stringify(vbJsonString);
            },
            parse: function (jsonStr) {
                const vbJsonParse = JSON.parse(jsonStr);
                const cipherParams = CryptoJS.lib.CipherParams.create({
                  ciphertext: CryptoJS.enc.Base64.parse(vbJsonParse.ct)
                });
                if (vbJsonParse.iv) {
                  cipherParams['iv'] = CryptoJS.enc.Hex.parse(vbJsonParse.iv)
                }
                if (vbJsonParse['s']) {
                  cipherParams.salt = CryptoJS.enc.Hex.parse(vbJsonParse.s)
                }
                return cipherParams;
            }    
        }
        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(obj), environment.secret_key, {format: CryptoJSAesJson}).toString();
        let enc = encodeURIComponent(window.btoa(encrypted));

        httpParams = httpParams.append('_a', enc);
       
    
        return this.http.get<T>(this._endPoint_local + url, {
            params: httpParams,
            headers: headers,
        }).pipe(
            tap( // Log the result or error
                {
                    next: (data) => this.clearconsole(),
                    error: (error) => this.clearconsole()
                }
            )
        );
    }


    clearconsole() {
        if (window.console) {
            // console.clear();
        }
    }

    
    getPostRequest<T>(url: string, params: any): Observable<T> {

        params.user_token = this._storage.get('user_token');
        params.token = this._storage.get('token');
        params.username = this._storage.get('username');

        return this.http.post<T>(this._endPoint + url, params).pipe(
            tap( // Log the result or error
                {
                    next: (data) => this.clearconsole(),
                    error: (error) => this.clearconsole()
                }
            )
        );
    }

    getPostRequestLocal<T>(url: string, params: any): Observable<T> {
        params.user_token = this._storage.get('user_token');
        params.token = this._storage.get('token');
        if(this._storage.get('username')){
            params.username = this._storage.get('username');
        }

        const CryptoJSAesJson = {
            stringify: function (cipherParams) {
                const vbJsonString = {
                  ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
                };
                if (cipherParams.iv) {
                  vbJsonString['iv'] = cipherParams.iv.toString()
                };
                if (cipherParams.salt) {
                  vbJsonString['s'] = cipherParams.salt.toString()
                };
                return JSON.stringify(vbJsonString);
            },
            parse: function (jsonStr) {
                const vbJsonParse = JSON.parse(jsonStr);
                const cipherParams = CryptoJS.lib.CipherParams.create({
                  ciphertext: CryptoJS.enc.Base64.parse(vbJsonParse.ct)
                });
                if (vbJsonParse.iv) {
                  cipherParams['iv'] = CryptoJS.enc.Hex.parse(vbJsonParse.iv)
                }
                if (vbJsonParse['s']) {
                  cipherParams.salt = CryptoJS.enc.Hex.parse(vbJsonParse.s)
                }
                return cipherParams;
            }    
        }
        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(params), environment.secret_key, {format: CryptoJSAesJson}).toString();
        let enc = encodeURIComponent(window.btoa(encrypted));
        
        let httpParams = {
            _a:enc
        };


        return this.http.post<T>(this._endPoint_local + url, httpParams).pipe(
            tap( // Log the result or error
                {
                    next: (data) => this.clearconsole(),
                    error: (error) => this.clearconsole()
                }
            )
        );
    }


    /**
     * Post Request Wrapper
     *
     * @param url url of posted data
     * @param body data will be sended
     */
    postRequest<T>(url: string, body: any): Observable<T> {
        return this.http.post<T>(this._endPoint + url, body).pipe(
            tap( // Log the result or error
                {
                    next: (data) => this.clearconsole(),
                    error: (error) => this.clearconsole()
                }
            )
        );
    }

    /**
     * Delete request wrapper
     *
     * @param url url of deleted data
     */
    deleteRequest<T>(url: string): Observable<T> {
        return this.http.delete<T>(this._endPoint + url).pipe(
            tap( // Log the result or error
                {
                    next: (data) => this.clearconsole(),
                    error: (error) => this.clearconsole()
                }
            )
        );
    }

    /**
     * Put request wrapper
     *
     * @param url url of api
     * @param body data
     */
    putRequest<T>(url: string, body: any): Observable<T> {
        return this.http.put<T>(url, body).pipe(
            tap( // Log the result or error
                {
                    next: (data) => this.clearconsole(),
                    error: (error) => this.clearconsole()
                }
            )
        );
    }

    /**
     * Head request wrapper
     *
     * webpack not allowed this request by design
     *
     * @param url url of api
     * @returns Observable
     */
    headRequest(url: string): Observable<any> {
        return this.http.head(url, { observe: 'response' });
    }

    /**
     * Upload file
     *
     * @param url url of uploaded data
     * @param formData form data
     */
    uploadFile(
        url: string,
        formData: FormData,
        method: string = 'post'
    ): Observable<any> {
        return this.http[method]<any>(url, formData, {
            reportProgress: true,
            observe: 'events',
        });
    }

    /**
     * check file exist
     *
     * @param url url of file
     */
    fileExists(url: string) {
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, false);
        xhr.send();

        return xhr.status;
    }

    /**
     * Change endpoint
     * @param endpoint new endpoint that will be added
     */
    changeEndpoint(endpoint: string): void {
        this._endPoint = endpoint;
    }

    /**
     * get endpoint
     * @returns endpoint
     */
    getEndpoint(): string {
        return this._endPoint;
    }

    /**
     * set cookie for reguest not using jwt
     */
    setCookie(): void {
        const data: object = {
            action: 'setCookie',
        };
        const response = this.postRequest<FormResponse>('/auth', data);
        response
            .toPromise()
            .then((data) => console.log('success'))
            .catch((data) => console.log('failed'));
    }

    /**
     * get file from asset
     *
     * @param urlToFile string
     * @returns Observable<T>
     */
    getAssetJson<T>(urlToFile: string): Observable<T> {
        return this.http
            .get<T>('assets/' + urlToFile)
            .pipe(catchError(() => of(null)));
    }

    /**
     * download file from server
     *
     * @param endpoint
     * @param params
     * @returns
     */
    download(endpoint: string, params: any): Observable<any> {
        let headers = new HttpHeaders({
            'Cache-Control':
                'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
            Pragma: 'no-cache',
            Expires: '0',
        });

        let httpParams = new HttpParams();

        if (typeof params === 'object') {
            Object.keys(params).forEach((key) => {
                if (typeof params[key] !== 'undefined') {
                    httpParams = httpParams.append(key, params[key]);
                }
            });
        }

        return this.http.get<any>(this._endPoint + endpoint, {
            params: httpParams,
            observe: 'response',
            headers: headers,
            responseType: 'blob' as 'json'
        }).pipe(
            tap( // Log the result or error
                {
                    next: (data) => this.clearconsole(),
                    error: (error) => this.clearconsole()
                }
            )
        );
    }

    getIPAddress<T>(url: string, params?: object): Observable<T> {

        return this.http.get<T>("https://api.ipify.org/?format=json", {
        }).pipe(
            tap( // Log the result or error
                {
                    next: (data) => this.clearconsole(),
                    error: (error) => this.clearconsole()
                }
            )
        );
    }

    postRequestPmb<T>(url: string, params: any): Observable<T> {

        params.token = this._storage.get('token');

        return this.http.post<T>(this._endPoint + url, params).pipe(
            tap( // Log the result or error
                {
                    next: (data) => this.clearconsole(),
                    error: (error) => this.clearconsole()
                }
            )
        );
    }
}
