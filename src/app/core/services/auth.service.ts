import { Injectable } from '@angular/core';
import { Api } from '../providers/api';
import { User } from 'src/app/models/user.model';

@Injectable()
export class AuthService {

    constructor(public api: Api) { }

    login(user: User) {
        return this.api.post('auth/doctor/signin', user);
    }

    register(user: User) {
        return this.api.post('auth/doctor/signup', user);
    }

    forgotPassword(user) {
        return this.api.post('User/ForgotPassword', user);
    }

    updateUserProfile(user: User) {
        return this.api.post('Save/User', user);
    }

    getUserProfile(userID: Number) {
        return this.api.get('User/Profile/' + userID);
    }
    updatePassword(user: User) {
        return this.api.post('user/ChangePassword', user);
    }
}