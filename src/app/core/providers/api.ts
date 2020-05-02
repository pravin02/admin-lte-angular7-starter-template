import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrlProvider } from './base.url.provider';

/**
 * Api is a generic REST Api handler. Set your API apiURL first.
 * @author Pravin P Patil
 */
@Injectable({
    providedIn: "root"
})
export class Api {
    /**
     * variable to store base url
     */
    private apiURL: string = "";
    /**
     * Common http options for all api calls
     */
    private httpOptions = {
        /**
         * Headers as application/json
         */
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    /**
     * 
     * @param http http service to call apis
     * @param _baseAppUrl base url can prefix to resources
     */
    constructor(public http: HttpClient, private _baseAppUrl: BaseUrlProvider) {
        this.apiURL = this._baseAppUrl.apiBaseUrl;
    }

    /**
     * function to call get api
     * 
     * @param endpoint controller url
     * @param params parameters if any
     */
    get(endpoint: string, params?: any) {

        return this.http.get(this.apiURL + endpoint, this.httpOptions);
    }

    /**
     * Post method to call api securely to insert new record
     * 
     * @param endpoint controller url
     * @param body data if any as payload
     */
    post(endpoint: string, body: any) {
        return this.http.post(endpoint, body, this.httpOptions);
    }

    /**
     * Put method to call api securely to update record
     * 
     * @param endpoint controller url
     * @param body data if any as payload
     */
    put(endpoint: string, body: any) {
        return this.http.put(this.apiURL + endpoint, body, this.httpOptions);
    }

    /**
     * Delete method to call api for remove record
     * 
     * @param endpoint controller url
     */
    delete(endpoint: string) {
        return this.http.delete(this.apiURL + endpoint, this.httpOptions);
    }

    /**
     * Patch record if required to update partially
     * 
     * @param endpoint controller url
     * @param body data if any as payload
     */
    patch(endpoint: string, body: any) {
        return this.http.put(this.apiURL + endpoint, body, this.httpOptions);
    }
}
