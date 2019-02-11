import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/core/validators/custom.validators';
import { onSubmitFormGroup } from 'src/app/utils/on-submit-form';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html'
})
export class UpdatePasswordComponent implements OnInit {
  private user: User = { fullName: '', email: 'admin@gmail.com', password: '', confirmPassword: '' };

  public updatePasswordFormGroup;
  constructor(private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.updatePasswordFormGroup = new FormGroup({
      email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: CustomValidators.confirmPassword });

    this.updatePasswordFormGroup.patchValue(this.user);
  }

  get email(): FormControl {
    return this.updatePasswordFormGroup.get('email');
  }
  get password(): FormControl {
    return this.updatePasswordFormGroup.get('password');
  }
  get confirmPassword(): FormControl {
    return this.updatePasswordFormGroup.get('confirmPassword');
  }

  public onUpdatePasswordClicked(updatePasswordFormGroup) {
    if (updatePasswordFormGroup.invalid)
      onSubmitFormGroup(updatePasswordFormGroup);
    let user = updatePasswordFormGroup.value;
    console.log(user);
    this.toastrService.success('Passsword updated successfully', 'Success');
  }
}