import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

// both this and the parent component could be folded into one component as they're both simple, but it illustrates how
// a fuller example could work
@Component({
    selector: 'clickable-cell',
    template: `
        <ag-clickable 
        (onEditClicked)="onEditClicked($event)" 
        (onDeleteClicked)="onDeleteClicked($event)" 
        (onViewClicked)="onViewClicked($event)" 
        [cell]="cell"></ag-clickable>
    `
})
export class ActionParentComponent implements ICellRendererAngularComp {
    private params: any;
    public cell: any;

    agInit(params: any): void {
        this.params = params;
        this.cell = {
            row: params.value, col: params.colDef.headerName,
            data: params.data
        };
    }

    public onViewClicked(cell: any): void {
        this.params.context.componentParent.onViewClicked(cell);
    }


    public onEditClicked(cell: any): void {
        this.params.context.componentParent.onEditClicked(cell);
    }

    public onDeleteClicked(cell: any): void {
        this.params.context.componentParent.onDeleteClicked(cell);
    }

    refresh(): boolean {
        return false;
    }
}