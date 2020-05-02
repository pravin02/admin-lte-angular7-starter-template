import { Injectable } from '@angular/core';
import { Api } from '../providers/api';
import { User } from 'src/app/models/user.model';
import { AppService } from 'src/app/app.service';

@Injectable()
export class AuthService {

    constructor(public api: Api, private appService: AppService) { }

    login(user: User) {
        return this.api.get(this.appService.getUrl() + 'login.json', user);
    }

    register(user: User) {
        return this.api.post('signup', user);
    }

    forgotPassword(email: any) {
        return this.api.post('forgot/password', email);
    }

    updateUserProfile(user: User) {
        return this.api.post('Save/User', user);
    }

    getUserProfile(userID: Number) {
        return this.api.get('User/Profile/' + userID);
    }
    updatePassword(user: User) {
        return this.api.post('update/password', user);
    }
}