import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { ActionParentComponent } from 'src/app/utils/action.parent.component';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/core/constants';
import { resetCompiledComponents } from '@angular/core/src/render3/jit/module';

@Component({
    selector: 'app-employee-list',
    templateUrl: 'employee.list.component.html'
})

export class EmployeeListComponent implements OnInit {

    @ViewChild('agGrid') agGrid: AgGridNg2;
    public context = {};
    gridOptions = { rowHeight: 50 };

    columnDefs = [
        { headerName: 'Image', field: '', cellRenderer: this.customCellRendererFunc },
        { headerName: 'Employee Name', field: 'fullName' },
        { headerName: 'Email ID', field: 'email' },
        { headerName: 'Mobile Number', field: 'mobileNumber' },
        { headerName: 'Address', field: 'address' },
        {
            headerName: 'Action', field: 'name',
            cellRendererFramework: ActionParentComponent,
        }
    ];

    rowData: any;
    constructor(private employeeService: EmployeeService,
        private toastrService: ToastrService) {
        this.context = { componentParent: this };
    }

    ngOnInit() {
        this.getEmployeeList();
    }

    public getEmployeeList() {
        this.employeeService.getEmployeeList()
            .subscribe((response: any) => {
                if (response.status)
                    this.rowData = new Promise((resolve, reject) =>
                        resolve(response.data)
                    );
            }, error => {
                this.toastrService.error(error.error.message, Constants.TITLE_ERROR);
            });
    }

    onGridReady(data) {
    }

    getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }

    onCellClicked(row) {
        //alert('double clicked on ' + row.data.make);
    }
    onCellDoubleClicked(row) {
        alert('double clicked on ' + row.data.make);
    }

    public customCellRendererFunc(params): string {
        return `<img height="40" width="70"
        src="http://localhost:4200/assets/dist/img/user2-160x160.jpg"/>`;
    }

    public onViewClicked(cell: any): void {
        alert("View Employee " + JSON.stringify(cell.data));
    }

    public onEditClicked(cell: any): void {
        alert("Edit Employee " + JSON.stringify(cell.data));
    }

    public onDeleteClicked(cell: any): void {
        alert("Delete Employee " + JSON.stringify(cell.data));
    }



}