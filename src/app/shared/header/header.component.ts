import { Component } from "@angular/core";
import { BaseUrlProvider } from 'src/app/core/providers/base.url.provider';
import { SessionService } from 'src/app/core/services/session.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {

    public profilePicture: string = '';
    public fullName: string;

    constructor(private baseUrlProvider: BaseUrlProvider,
        private sessionService: SessionService,
        private router: Router) {
        this.fullName = sessionService.getFullName();
        this.profilePicture = baseUrlProvider.profilePictureBaseUrl + sessionService.getProfilePic();
    }

    public logOut() {
        this.sessionService.logOut();
        this.router.navigate(['/login']);
    }
}