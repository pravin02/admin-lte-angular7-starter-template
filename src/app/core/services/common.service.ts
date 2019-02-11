import { Injectable } from '@angular/core';
import { Api } from '../providers/api';
import { User } from 'src/app/models/user.model';

@Injectable()
export class CommonService {

    constructor(public api: Api) { }

    public getStateList() {
        return this.api.get('states');
    }

    public getCityList(stateID: Number) {
        return this.api.get(`cities?stateID=${stateID}`);
    }
}