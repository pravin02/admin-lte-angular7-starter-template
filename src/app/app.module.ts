import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './core/services/auth.service';
import { Api } from './core/providers/api';
import { BaseUrlProvider } from './core/providers/base.url.provider';
import { SessionService } from './core/services/session.service';
import { CommonService } from './core/services/common.service';
import { JWTUtils } from './core/services/jwt.utils';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { TitleCasePipe } from '@angular/common';

import { KeyboardShortcutsModule, KeyboardShortcutsService } from 'ng-keyboard-shortcuts';
import { UserService } from './core/services/user.service';
import { EmployeeService } from './core/services/employee.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppService } from './app.service';

const routes: Routes = [
  { path: '', loadChildren: "./layout/layout.module#LayoutModule" },
  { path: 'auth', loadChildren: "./auth/auth.module#AuthModule" }
];

@NgModule({
  schemas: [],
  declarations: [
    AppComponent
  ],
  imports: [
    KeyboardShortcutsModule,
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),

    BlockUIModule.forRoot(), // Import BlockUIModule
    BlockUIHttpModule.forRoot(), ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }), // Import Block UI Http Module
    HttpClientModule

  ],
  exports: [RouterModule],
  providers: [
    TitleCasePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    JWTUtils,
    BaseUrlProvider,
    SessionService,
    AuthService,
    CommonService,
    UserService,
    EmployeeService,
    KeyboardShortcutsService,
    AppService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private keyboard: KeyboardShortcutsService) {
    this.keyboard.add([
      {
        key: 'ctrl f',
        command: () => console.log('ctrl + f')
      },
      {
        key: 'ctrl p',
        command: () => console.log('ctrl + p')
      },
      {
        key: 'ctrl shift f',
        command: () => console.log('ctrl + shift + f'),
      },
      {
        key: 'cmd f',
        command: () => console.log('cmd + f'),
        preventDefault: true
      }
    ]);


    this.keyboard.add({
      key: ['cmd + shift + g', 'cmd + g'],
      command: ({ event, key }) => console.log(key, event)
    })
  }
}
