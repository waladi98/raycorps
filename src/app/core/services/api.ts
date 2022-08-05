import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FormResponse } from '../../shared/types/common';
import { catchError, tap, map, finalize } from 'rxjs/operators';
import * as CryptoJS from "crypto-js";

export class ApiInterceptor implements HttpInterceptor {

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler) {
        if (httpRequest.responseType === 'json') {
        //     // If the expected response type is JSON then handle it here.
            return this.handleJsonResponse(httpRequest, next);
        } else {
            return next.handle(httpRequest);
        }
    }

    private handleJsonResponse(httpRequest: HttpRequest<any>, next: HttpHandler) {
        // Override the responseType to disable the default JSON parsing.
        httpRequest = httpRequest.clone({ responseType: 'json' });
        // Handle the response using the custom parser.
        return next.handle(httpRequest).pipe(map(event => this.parseJsonResponse(event)));
    }

    private parseJsonResponse(event: HttpEvent<any>) {
        if (event instanceof HttpResponse) {
            if (event.body._a === undefined) {
                return event;
            }
            return event.clone({body: this.response(event.body)});
            
            //   return this.response(event.body);
        } else {
            return event;
        }
    }

    response(response) {
        //console.log(response);
        var obj_json = JSON.parse(JSON.parse(window.atob(response._a)));

       
        var encrypted = obj_json._qiey;
        var _qwy = CryptoJS.enc.Hex.parse(obj_json._qwy);
        var _qeqs = CryptoJS.enc.Hex.parse(obj_json._qeqs);

        var key = CryptoJS.PBKDF2(environment.secret_key, _qwy, { hasher: CryptoJS.algo.SHA512, keySize: 64 / 8, iterations: 999 });


        var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: _qeqs });
        // console.log(JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)));
        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
        // return decrypted;
    }
}