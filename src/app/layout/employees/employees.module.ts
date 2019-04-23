import { NgModule } from "@angular/core";

import { AgGridModule } from 'ag-grid-angular';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee.list.component';
import { CommonModule } from '@angular/common';
import { ActionComponent } from 'src/app/utils/action.component';
import { ActionParentComponent } from 'src/app/utils/action.parent.component';
import { EmployeeService } from 'src/app/core/services/employee.service';

const routes: Routes = [{ path: '', component: EmployeeListComponent, data: { title: 'Employees' } }]

@NgModule({
    entryComponents: [ActionParentComponent],
    declarations: [EmployeeListComponent, ActionComponent, ActionParentComponent],
    imports: [
        CommonModule,
        AgGridModule.withComponents([]),
        RouterModule,
        RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [ActionComponent, ActionParentComponent, EmployeeService]

})
export class EmployeeModule {

}