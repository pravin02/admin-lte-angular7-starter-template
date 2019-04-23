import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/core/validators/custom.validators';
import { onSubmitFormGroup } from 'src/app/utils/on-submit-form';
import { SessionService } from 'src/app/core/services/session.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Constants } from 'src/app/core/constants';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html'
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
  private user: User = { fullName: '', email: 'admin@gmail.com', password: '', newPassword: '' };
  private subscription: Subscription;

  public updatePasswordFormGroup;
  constructor(private toastrService: ToastrService,
    private sessionService: SessionService,
    private authService: AuthService) { }

  ngOnInit() {
    this.updatePasswordFormGroup = new FormGroup({
      fullName: new FormControl({ value: this.sessionService.getFullName(), disabled: true }),
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: CustomValidators.confirmPassword });

  }

  get fullName(): FormControl {
    return this.updatePasswordFormGroup.get('fullName');
  }
  get password(): FormControl {
    return this.updatePasswordFormGroup.get('password');
  }
  get newPassword(): FormControl {
    return this.updatePasswordFormGroup.get('newPassword');
  }
  get confirmPassword(): FormControl {
    return this.updatePasswordFormGroup.get('confirmPassword');
  }

  public onUpdatePasswordClicked(updatePasswordFormGroup) {
    if (updatePasswordFormGroup.invalid) {
      onSubmitFormGroup(updatePasswordFormGroup);
      return;
    }
    let user = updatePasswordFormGroup.value;
    user.userId = this.sessionService.getUserID();
    console.log(user);
    this.subscription = this.authService.updatePassword(user
    ).subscribe((response: any) => {
      if (response.status) {
        updatePasswordFormGroup.reset();
        this.fullName.setValue(this.sessionService.getFullName());
        this.toastrService.success('Passsword updated successfully', 'Success');
      }
    }, (error: HttpErrorResponse) => {
      this.toastrService.error(error.error.message, Constants.TITLE_ERROR);
    })
  }

  ngOnDestroy() {
    if (this.subscription != null && this.subscription !== undefined)
      this.subscription.unsubscribe();
  }
}