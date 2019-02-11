import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { TestingComponent } from './test.component';
import { StatusDirective } from 'src/app/core/directives/status.directive';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: DashboardComponent, data: { title: 'Dashboard' } }
];

@NgModule({
    schemas: [NO_ERRORS_SCHEMA],
    declarations: [DashboardComponent, TestingComponent, StatusDirective],
    imports: [CommonModule, RouterModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardModule {

}