import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { onSubmitFormGroup } from 'src/app/utils/on-submit-form';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SessionService } from 'src/app/core/services/session.service';
import { Constants } from 'src/app/core/constants';
import { CommonService } from 'src/app/core/services/common.service';
import { City } from 'src/app/models/city.model';
import { State } from 'src/app/models/state.model';
import { CommonResponse } from 'src/app/models/common.response';
import { Country } from 'src/app/models/country.model';
import { UserRole } from 'src/app/models/user.role';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registerFormGroup;
  private subscription: Subscription;

  public countries: Country[];
  public states: State[];
  public cities: City[];

  constructor(@Inject(DOCUMENT) private document: Document,
    private router: Router,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private sessionService: SessionService,
    private commonService: CommonService) {

    this.registerFormGroup = this.fb.group({
      fullName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[0-9a-zA-z]+[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z.]{2,5}$/)]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      agreeTerms: new FormControl(false, [Validators.required])
    });
  }

  get fullName(): FormControl {
    return this.registerFormGroup.get('fullName');
  }
  get email() {
    return this.registerFormGroup.get('email');
  }
  get country() {
    return this.registerFormGroup.get('country');
  }
  get state() {
    return this.registerFormGroup.get('state');
  }
  get city() {
    return this.registerFormGroup.get('city');
  }
  get password() {
    return this.registerFormGroup.get('password');
  }
  get confirmPassword() {
    return this.registerFormGroup.get('confirmPassword');
  }
  get agreeTerms() {
    return this.registerFormGroup.get('agreeTerms');
  }

  ngOnInit() {
    this.document.body.className = "hold-transition register-page";
    this.getCountryList();
  }

  public getCountryList() {
    this.subscription = this.commonService.getCountryList()
      .subscribe((response: CommonResponse) => {
        if (response.status) {
          this.countries = response.data;
        }
        else {
          this.toastrService.error(response.message, Constants.TITLE_ERROR);
        }
      }, error => {
        this.toastrService.error(error.error.message, Constants.TITLE_ERROR);
      })
  }

  public getStateList(country: Country) {
    this.subscription = this.commonService.getStateList(country.countryId)
      .subscribe((response: CommonResponse) => {
        if (response.status) {
          this.states = response.data;
        }
        else {
          this.toastrService.error(response.message, Constants.TITLE_ERROR);
        }
      }, error => {
        this.toastrService.error(error.error.message, Constants.TITLE_ERROR);
      })
  }

  public getCityList(state: State) {
    this.subscription = this.commonService.getCityList(state.stateId)
      .subscribe((response: CommonResponse) => {
        if (response.status) {
          this.cities = response.data;
        }
        else {
          this.toastrService.error(response.message, Constants.TITLE_ERROR);
        }
      }, error => {
        this.toastrService.error(error.error.message, Constants.TITLE_ERROR);
      })
  }

  public onRegister(registerFormGroup) {
    let user = registerFormGroup.value;
    if (registerFormGroup.invalid) {
      onSubmitFormGroup(registerFormGroup);
      this.toastrService.error('Please fill all the fields are mandatory', Constants.TITLE_ERROR);
      return;
    }

    console.log(user);
    user.role = UserRole.EMPLOYEE;

    this.subscription = this.authService.register(user
    ).subscribe((response: any) => {
      console.log(response);
      if (response.status) {
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
      console.log(error);
      this.toastrService.error(error.error.message, Constants.TITLE_ERROR);
    });
  }

  ngOnDestroy() {
    if (this.subscription != null && this.subscription !== undefined)
      this.subscription.unsubscribe();
  }
}
