import { Component, OnInit, Inject, AfterViewInit, AfterViewChecked } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';

import * as $ from 'jquery';
declare var jQuery:any;

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html'
})

export class LayoutComponent implements OnInit{

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    ngOnInit() {
        this.document.body.className = "hold-transition skin-blue sidebar-mini";        
        this.loadScript();
    }

    public loadScript(){
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src= "assets/dist/js/app.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}