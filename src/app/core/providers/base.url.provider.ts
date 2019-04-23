import { Injectable } from "@angular/core";

@Injectable()
export class BaseUrlProvider{
    public apiBaseUrl= "http://localhost:8080/api/";
    public profilePictureBaseUrl= "http://localhost:4200/assets/dist/img/";
}