import { Component, OnInit, OnDestroy } from "@angular/core";
import { WebcamInitError, WebcamImage } from 'ngx-webcam';
import { Subject, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { onSubmitFormGroup } from 'src/app/utils/on-submit-form';
import { CommonService } from 'src/app/core/services/common.service';
import { CommonResponse } from 'src/app/models/common.response';
import { Constants } from 'src/app/core/constants';
import { Country } from 'src/app/models/country.model';
import { State } from 'src/app/models/state.model';
import { City } from 'src/app/models/city.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { SessionService } from 'src/app/core/services/session.service';
import { EmployeeService } from 'src/app/core/services/employee.service';


@Component({
  selector: 'app-profile-user',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  public user: any = {
    email: 'admin@gmail.com', fullName: 'Pravin',
    image: 'assets/dist/img/user2-160x160.jpg', mobileNumber: ''
  };

  public countries: Country[];
  public states: State[];
  public cities: City[];

  private subscription: Subscription;

  public showWebcam = false;
  public errors: WebcamInitError[] = [];
  // latest snapshot
  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  public videoOptions: MediaTrackConstraints = {};

  public userProfileFormGroup;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private userService: UserService,
    private employeeService: EmployeeService,
    private toastrService: ToastrService,
    private sessionService: SessionService
  ) {
    //User profile form group with custom validators
    this.userProfileFormGroup = this.fb.group({
      fullName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]),
      email: new FormControl({ value: '', disabled: true }, [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/[0-9]+/)]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.pattern(/^[A-Za-z0-9 , . - ' "]+$/)])
    });

  }

  get fullName(): FormControl {
    return this.userProfileFormGroup.get('fullName');
  }
  get email(): FormControl {
    return this.userProfileFormGroup.get('email');
  }
  get mobileNumber(): FormControl {
    return this.userProfileFormGroup.get('mobileNumber');
  }
  get address(): FormControl {
    return this.userProfileFormGroup.get('address');
  }
  get country(): FormControl {
    return this.userProfileFormGroup.get('country');
  }
  get state(): FormControl {
    return this.userProfileFormGroup.get('state');
  }
  get city(): FormControl {
    return this.userProfileFormGroup.get('city');
  }

  public ngOnInit() {
    this.fullName.setValue(this.sessionService.getFullName());
    this.getCountryList();

    this.getUserDetail(this.sessionService.getUserID());
  }

  public getUserDetail(userID: string) {
    this.subscription = this.employeeService.getUserDetail(userID)
      .subscribe((response: CommonResponse) => {
        if (response.status) {
          this.user = response.data;
          this.userProfileFormGroup.patchValue(this.user);
          this.country.setValue(this.user.city.state.country);
          //this.state.setValue(this.user.city.state.stateId);
          //this.city.setValue(this.user.city.cityId);
        }
        else {
          this.toastrService.error(response.message, Constants.TITLE_ERROR);
        }
      }, error => {
        this.toastrService.error(error.error.message, Constants.TITLE_ERROR);
      })
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

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public stopCamera() {
    this.showWebcam = !this.showWebcam;
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => { // called once readAsDataURL is completed                
        this.user.image = event.target.result;
      }
    }
  }
  public onSubmitUserProfile(formGroup) {
    if (formGroup.invalid) {
      onSubmitFormGroup(formGroup);
      return;
    }
    let user = formGroup.value;
    user.email = this.user.email;
    user.role = this.user.role;
    console.log(user);
    user.userId = this.sessionService.getUserID();

    this.subscription = this.userService.updateUser(user)
      .subscribe((response: CommonResponse) => {
        if (response.status) {
          this.toastrService.success(response.message, Constants.TITLE_SUCCESS);
        }
        else {
          this.toastrService.error(response.message, Constants.TITLE_ERROR);
        }
      }, error => {
        this.toastrService.error(error.error.message, Constants.TITLE_ERROR);
      })
  }

  ngOnDestroy() {
    if (this.subscription != null && this.subscription !== undefined)
      this.subscription.unsubscribe();
  }

}