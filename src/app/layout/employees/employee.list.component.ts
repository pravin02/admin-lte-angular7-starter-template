import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { ActionParentComponent } from 'src/app/utils/action.parent.component';

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
        { headerName: 'Make', field: 'make' },
        { headerName: 'Model', field: 'model' },
        { headerName: 'Price', field: 'price' },
        {
            headerName: 'Action', field: 'name',
            cellRendererFramework: ActionParentComponent,
        }
    ];

    rowData: any;
    constructor(private http: HttpClient) {
        this.context = { componentParent: this };
    }

    ngOnInit() {
        this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
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
        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"/>`;
    }

    public onViewClicked(cell: any): void {
        console.log("View Employee List " + JSON.stringify(cell.data));
    }

    public onEditClicked(cell: any): void {
        console.log("Edit Employee List " + JSON.stringify(cell.data));
    }

    public onDeleteClicked(cell: any): void {
        console.log("Delete Employee List " + JSON.stringify(cell.data));
    }



}