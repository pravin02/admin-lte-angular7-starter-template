import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: 'ag-clickable',
    template: `
    <button class="btn btn-sm btn-link" (click)="onView()"
    > <i class="fa fa-eye text-green"></i>
     </button>
    <button class="btn btn-sm btn-link" (click)="onEdit()"
    > <i class="fa fa-pencil text-blue"></i>
     </button>
    <button class="btn btn-sm btn-link" (click)="onDelete()"> 
    <i class="fa fa-trash text-red"></i> 
    </button>
    `    
})
export class ActionComponent {
    @Input() cell: any;
    @Output() onEditClicked = new EventEmitter<boolean>();
    @Output() onDeleteClicked = new EventEmitter<boolean>();
    @Output() onViewClicked = new EventEmitter<boolean>();

    onView(): void {
        this.onViewClicked.emit(this.cell);
    }

    onEdit(): void {
        this.onEditClicked.emit(this.cell);
    }

    onDelete(): void {
        this.onDeleteClicked.emit(this.cell);
    }
}