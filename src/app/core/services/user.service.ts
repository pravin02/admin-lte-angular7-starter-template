import { Injectable } from "@angular/core";
import { Api } from '../providers/api';
import { User } from 'src/app/models/user.model';


@Injectable()
export class UserService {
    constructor(private api: Api) { }

    public updateUser(user: User) {
        return this.api.post("users", user);
    }
}