import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from './app.service';
import { SwUpdate } from '@angular/service-worker';
import { interval, concat } from 'rxjs';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private appRef: ApplicationRef, private titleService: Title, router: Router, private appService: AppService,
    private swUpdate: SwUpdate) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let title = 'Admin LTE - ' + this.getTitle(router.routerState, router.routerState.root).join('-');
        this.setTitle(title);
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.appService.getUrl());
    }, 1000);

    if (this.swUpdate.isEnabled) {
      // Allow the app to stabilize first, before starting polling for updates with `interval()`.
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const everySixHours$ = interval(6 * 60 * 60 * 1000);
      const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

      everySixHoursOnceAppIsStable$.subscribe(() => this.swUpdate.checkForUpdate());
      this.swUpdate.available.subscribe(() => {
        console.log('updates available');
        if (confirm("New version available. Load New Version?")) {
          window.location.reload();
        }
      });
    }
  }

  /**
   * 
   * @param state 
   * @param parent 
   *  collect that title data properties from all child routes
   * there might be a better way but this worked for me
   */
  getTitle(state, parent) {
    let data: string[] = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  /**
   * 
   * @param title 
   */
  setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
