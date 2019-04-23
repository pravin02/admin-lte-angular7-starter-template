import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { onSubmitFormGroup } from 'src/app/utils/on-submit-form';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/core/constants';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  public forgotPasswordGroup;
  private subscription: Subscription;


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService) {

    this.forgotPasswordGroup = this.fb.group({
      email: new FormControl('',
        [Validators.required, Validators.email])
    });
  }

  get email() {
    return this.forgotPasswordGroup.get('email');
  }

  ngOnInit() {
    this.document.body.className = "hold-transition login-page";
  }

  public onRecoverPasswordClicked(forgotPasswordGroup) {
    let user = forgotPasswordGroup.value;
    console.log(user);
    if (forgotPasswordGroup.invalid) {
      onSubmitFormGroup(forgotPasswordGroup)
      this.toastrService.error('Please enter email ID', Constants.TITLE_ERROR);
      return;
    }

    this.subscription = this.authService.forgotPassword({email : user.email}
    ).subscribe((response: any) => {
      console.log(response);
      if (response.status) {
        this.toastrService.success(response.message, Constants.TITLE_SUCCESS);
        this.forgotPasswordGroup.reset();        
      } else {
        this.toastrService.error(response.message, Constants.TITLE_ERROR);
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.toastrService.error(error.error.message, Constants.TITLE_ERROR);
    });
    //this.router.navigate(["/login"]);
  }

  ngOnDestroy() {
    if (this.subscription != null && this.subscription !== undefined)
      this.subscription.unsubscribe();
  }
}