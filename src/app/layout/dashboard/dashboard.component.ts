import { Component } from "@angular/core";


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent {

    public status: string = "APPROVED";
    public disabled: boolean = false;

    public approvedClicked() {
        this.status = "APPROVED";
    }

    public rejectedClicked() {
        this.status = "REJECTED";
    }

    public doneClicked() {
        this.status = "DONE";
    }

    public statusClicked(status: string) {
        console.log(status);
    }

    public toggle() {
        this.disabled = !this.disabled;
    }

}