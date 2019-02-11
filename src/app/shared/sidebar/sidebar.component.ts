import { Component, AfterViewInit, OnInit, AfterContentInit } from "@angular/core";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit {

    ngOnInit() {
        $(document).ready(() => {
            const trees: any = $('[data-widget="tree"]');
            trees.tree();
        });

    }
}
