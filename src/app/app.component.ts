import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 

  constructor(private titleService: Title, router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let title = 'Admin LTE - ' + this.getTitle(router.routerState, router.routerState.root).join('-');
        this.setTitle(title);
      }
    });
    // this.blockUI.start(); // Start blocking

    // setTimeout(() => {
    //   this.blockUI.stop(); // Stop blocking
    // }, 2000);
  }

  // collect that title data properties from all child routes
  // there might be a better way but this worked for me
  getTitle(state, parent) {
    let data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  setTitle(title: string) {
    //console.log('title', title);
    this.titleService.setTitle(title);
  }
}
