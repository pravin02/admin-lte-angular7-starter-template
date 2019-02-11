import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';


@Injectable()
export class AuthGuard implements CanActivateChild {

    constructor(private router: Router, private sessionService: SessionService) {
    }

    public canActivateChild(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            //console.log('auth guard', this.sessionService.getUserID(), this.sessionService.getUserID() == null);
        if (this.sessionService.getUserID() != null)
            return true;
        else {
            this.sessionService.logOut();
            this.router.navigate(['/login']);
            return false;
        }
    }
}