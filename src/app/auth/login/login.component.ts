import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/models/user.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { onSubmitFormGroup } from 'src/app/utils/on-submit-form';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';
import { Constants } from 'src/app/core/constants';
import { HttpErrorResponse } from '@angular/common/http';
import { JWTUtils } from 'src/app/core/services/jwt.utils';

/**
 * variable to hold reference of jquery instance
 */
declare const jQuery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  private user: User = { fullName: '', email: '', password: '' };
  public loginFormGroup;
  private subscription: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private sessionService: SessionService,
    private jwt: JWTUtils
  ) {
    this.loginFormGroup = this.fb.group({
      email: new FormControl('',
        [Validators.required, Validators.pattern(/^[0-9a-zA-z]+[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z.]{2,5}$/)]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    });
  }

  ngOnInit() {
    this.document.body.className = "hold-transition login-page";
  }

  get email() {
    return this.loginFormGroup.get('email');
  }
  get password() {
    return this.loginFormGroup.get('password');
  }
  get rememberMe() {
    return this.loginFormGroup.get('rememberMe');
  }

  public onLoginClicked(loginFormGroup) {
    let user = loginFormGroup.value;
    //console.log(user);

    if (loginFormGroup.invalid) {
      onSubmitFormGroup(loginFormGroup);
      this.toastrService.error('Please enter email ID and password', Constants.TITLE_ERROR);
      return;
    }

    //this.router.navigate(["/layout/dashboard"]);

    this.subscription = this.authService.login(user
    ).subscribe((response: any) => {
      //this.router.navigate(["/layout/dashboard"]);
      if (response.status) {
        jQuery('#loginModal').modal('hide');

        this.sessionService.setUserID(response.data.userId);
        this.sessionService.setFullName(`${response.data.fullName}`);
        this.sessionService.setProfilePic(response.data.image);
        this.sessionService.setEmail(response.data.email);

        this.router.navigate(["/layout/dashboard"]);
        this.toastrService.success(response.message, Constants.TITLE_SUCCESS);
      } else {
        this.toastrService.error(response.message, Constants.TITLE_ERROR);
      }
    }, (error: HttpErrorResponse) => {
      this.toastrService.error(error.error.message, Constants.TITLE_ERROR);
    });
  }

  ngOnDestroy() {
    if (this.subscription != null && this.subscription !== undefined)
      this.subscription.unsubscribe();
  }
}