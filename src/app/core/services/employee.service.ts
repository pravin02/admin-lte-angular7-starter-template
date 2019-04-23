import { Injectable } from '@angular/core';
import { Api } from '../providers/api';



@Injectable()
export class EmployeeService {

    constructor(private api: Api) { }

    getEmployeeList() {
        return this.api.get("employees");
    }

    public getUserDetail(userId: String) {
        return this.api.get("employees/" + userId);
    }
}