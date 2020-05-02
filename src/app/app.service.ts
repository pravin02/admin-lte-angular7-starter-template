import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * This is AppService available on root module level so all the modules can access it.
 * 
 * @author Pravin P Patil
 */
@Injectable({ providedIn: "root" })
export class AppService {
    
    /**
     * variable to hold base url
     */
    private url: string;

    /**
     * Reading base url from configuration file
     * 
     * @param http httclient to read configuration file
     * 
     */
    constructor(private http: HttpClient) {
        this.getJson().subscribe(data => {
            this.url = data.url;
        });
    }
    
    /**
     * configuration file will return a configurable json
     * 
     * @return observable
     */
    getJson(): Observable<any> {
        return this.http.get('./assets/conf.url.json');
    }

    /**
     * this function return configurable url can be accessed by services or components.
     * 
     * @return base url
     */
    getUrl(): string {
        return this.url;
    }
}