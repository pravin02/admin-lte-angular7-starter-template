import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebcamModule } from 'ngx-webcam';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user/user-profile.component';
import { CompanyProfileComponent } from './company/company-profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'user', component: UserProfileComponent, data: { title: 'User Profile' } },
    { path: 'company', component: CompanyProfileComponent, data: { title: 'Company Profile' } },
    { path: 'update-password', component: UpdatePasswordComponent, data: { title: 'Update Password' } }
]

@NgModule({
    declarations: [UserProfileComponent, CompanyProfileComponent, UpdatePasswordComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        RouterModule.forChild(routes),
        WebcamModule],
    exports: [RouterModule]
})
export class ProfileModule {

}