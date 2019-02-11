import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router'

import { HeaderComponent } from "../shared/header/header.component";
import { SidebarComponent } from "../shared/sidebar/sidebar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { LayoutComponent } from './layout.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../core/guards/auth.guard';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BlockUIModule } from 'ng-block-ui';

const routes: Routes = [
    // { path: '', redirectTo: '/layout', pathMatch: 'full', data: { title: 'Layout' } },
    {
        path: 'layout', component: LayoutComponent, canActivateChild: [AuthGuard],
        children:
            [
                { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
                { path: 'employees', loadChildren: './employees/employees.module#EmployeeModule' },
                { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' }
            ]
    },
    { path: '**', redirectTo: '/layout', pathMatch: 'full' }
]

@NgModule({
    declarations: [HeaderComponent, SidebarComponent, FooterComponent, LayoutComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        RouterModule.forChild(routes),
        BlockUIModule.forRoot(), // Import BlockUIModule
        BlockUIHttpModule.forRoot(), // Import Block UI Http Module
    ],
    exports: [RouterModule],
    providers: [AuthGuard],
    bootstrap: [LayoutComponent]
})
export class LayoutModule {
} 
