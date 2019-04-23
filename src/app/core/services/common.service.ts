import { Injectable } from '@angular/core';
import { Api } from '../providers/api';
import { User } from 'src/app/models/user.model';

@Injectable()
export class CommonService {

    constructor(public api: Api) { }

    public getCountryList() {
        return this.api.get('countries');
    }

    public getStateList(countryID : Number) {
        return this.api.get(`states/${countryID}`);
    }

    public getCityList(stateID: Number) {
        return this.api.get(`cities/${stateID}`);
    }
}