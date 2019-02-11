import { Component } from "@angular/core";
import { WebcamInitError, WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
    selector: 'app-profile-company',
    templateUrl: './company-profile.component.html'
})
export class CompanyProfileComponent {

    public profile = {image:'assets/dist/img/user2-160x160.jpg'};
    public showWebcam= false;
    public errors: WebcamInitError[] = [];
    // latest snapshot
    public webcamImage: WebcamImage = null;
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    public videoOptions: MediaTrackConstraints = {
        // width: {ideal: 1024},
        // height: {ideal: 576}
    };

    constructor() {
    }

    public triggerSnapshot(): void {
        this.trigger.next();
    }

    public handleInitError(error: WebcamInitError): void {
        this.errors.push(error);
    }

    public handleImage(webcamImage: WebcamImage): void {
        console.info('received webcam image', webcamImage);
        this.webcamImage = webcamImage;
    }

    public get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
    }

    public stopCamera(){
        this.showWebcam = !this.showWebcam;
    }

}