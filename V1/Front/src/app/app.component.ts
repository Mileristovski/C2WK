import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    id!: string;
    title = 'C2WK';

    constructor(public router: Router, private route: ActivatedRoute) {
        if (sessionStorage.getItem('userId')) {
            this.id = sessionStorage.getItem('userId') ?? '';
        }
    }
}
