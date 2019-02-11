import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseUrlProvider } from './base.url.provider';


/**
 * Api is a generic REST Api handler. Set your API apiURL first.
 */
@Injectable()
export class Api {

    private apiURL: string = "";
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(public http: HttpClient, private _baseAppUrl: BaseUrlProvider) {
        this.apiURL = this._baseAppUrl.apiBaseUrl;
    }

    get(endpoint: string, params?: any) {

        return this.http.get(this.apiURL + endpoint, this.httpOptions);
    }

    post(endpoint: string, body: any) {
        return this.http.post(this.apiURL + endpoint, body, this.httpOptions);
    }

    put(endpoint: string, body: any) {
        return this.http.put(this.apiURL + endpoint, body, this.httpOptions);
    }

    delete(endpoint: string) {
        return this.http.delete(this.apiURL + endpoint, this.httpOptions);
    }

    patch(endpoint: string, body: any) {
        return this.http.put(this.apiURL + endpoint, body, this.httpOptions);
    }
}
