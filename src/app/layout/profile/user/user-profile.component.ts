import { Component, OnInit } from "@angular/core";
import { WebcamInitError, WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { onSubmitFormGroup } from 'src/app/utils/on-submit-form';

@Component({
    selector: 'app-profile-user',
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
    public countries = [];
    public user: User = {
        email: 'admin@gmail.com', fullName: 'Pravin',
        image: 'assets/dist/img/user2-160x160.jpg', mobileNumber: ''
    };

    public showWebcam = false;
    public errors: WebcamInitError[] = [];
    // latest snapshot
    public webcamImage: WebcamImage = null;
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    public videoOptions: MediaTrackConstraints = {};

    public userProfileFormGroup;

    constructor(private fb: FormBuilder) {
        //User profile form group with custom validators
        this.userProfileFormGroup = this.fb.group({
            fullName: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z -]+$/)]),
            //fullName: new FormControl('', [Validators.required, CustomValidators.fullName]),
            email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
            mobileNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/[0-9]+/)]),
            //mobileNumber: new FormControl('', [Validators.required, CustomValidators.mobileNumber]),
            address: new FormControl('', [Validators.pattern(/^[A-Za-z0-9 , . - ' "]+$/)]),
            //address: new FormControl('', [CustomValidators.address]),
            country: new FormControl('', [Validators.required]),
            state: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required])
        });

        this.userProfileFormGroup.patchValue(this.user);
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

    public ngOnInit() { }

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
        if (formGroup.invalid)
            onSubmitFormGroup(formGroup);
        let user = formGroup.value;
        console.log(user);
    }

}