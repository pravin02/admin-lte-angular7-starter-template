import { Injectable } from "@angular/core";


@Injectable()
export class SessionService {
    private USERID_KEY = 'USERID_KEY';
    private FULLNAME_KEY = 'FULLNAME_KEY';
    private PROFILE_PIC_KEY = 'PROFILE_PIC_KEY';
    private JWT_TOKEN_KEY = 'JWT_TOKEN_KEY';

    

    public getUserID() {
        return localStorage.getItem(this.USERID_KEY);
    }
    public setUserID(userID) {
        localStorage.setItem(this.USERID_KEY, userID);
    }

    public getFullName() {
        return localStorage.getItem(this.FULLNAME_KEY);
    }
    public setFullName(fullName) {
        localStorage.setItem(this.FULLNAME_KEY, fullName);
    }

    public getProfilePic() {
        return localStorage.getItem(this.PROFILE_PIC_KEY);
    }

    public setProfilePic(profilePic) {
        localStorage.setItem(this.PROFILE_PIC_KEY, profilePic);
    }

    public getToken() {
        return localStorage.getItem(this.JWT_TOKEN_KEY);
    }
    
    public setToken(token) {
        localStorage.setItem(this.JWT_TOKEN_KEY, token);
    }

    public logOut() {
        localStorage.setItem(this.USERID_KEY, null);
        localStorage.setItem(this.FULLNAME_KEY, null);
        localStorage.setItem(this.PROFILE_PIC_KEY, null);
    }
}