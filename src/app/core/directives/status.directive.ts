import { Directive, ElementRef, Input, Renderer2, HostListener } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Directive({
    selector: '[status]'       
})
export class StatusDirective {
    @Input()
    private status: string;
    @Input()
    private text: string;
    @Input()
    private disabled: boolean = false;

    private statusColors = [
        { status: 'APPROVED', color: 'orange' },
        { status: 'REJECTED', color: 'red' },
        { status: 'DONE', color: 'green' }
    ];

    constructor(private el: ElementRef, private renderer: Renderer2, private titlecase: TitleCasePipe) {
        this.highlight(this.status);
    }


    @HostListener('change') ngOnChanges() {
        this.highlight(this.status);
    }

    public highlight(status : string) {
        this.el.nativeElement.innerHTML = this.titlecase.transform(this.text);
        
        this.renderer.setStyle(this.el.nativeElement, 'background-color', this.getColorCode(status));
        this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
        this.renderer.setStyle(this.el.nativeElement, 'padding', '5px');
        this.renderer.setStyle(this.el.nativeElement, 'padding-left', '10px');
        this.renderer.setStyle(this.el.nativeElement, 'padding-right', '10px');
        this.renderer.setStyle(this.el.nativeElement, 'border-radius', '15px');
        this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
        this.renderer.setAttribute(this.el.nativeElement, 'class', 'disabled');
        if (this.disabled) {
            this.renderer.setStyle(this.el.nativeElement, 'cursor', 'not-allowed');
            this.renderer.setStyle(this.el.nativeElement, 'color', 'gray');
        }
    }

    public getColorCode(status: string): string {
        let obj = this.statusColors.filter(item => item.status == status);
        if (obj.length >= 1)
            return obj[0].color;
        return 'gray';
    }

}