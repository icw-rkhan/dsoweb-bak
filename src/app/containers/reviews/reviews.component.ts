import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'dso-reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss']
})

export class ReviewsComponent implements OnInit {
    @ViewChild('reviewContainer') reviewContainer: ElementRef;

    constructor(private sharingService: SharingService) { }

    ngOnInit() {
        const device = this.sharingService.getMyDevice();

        if (device === 'desktop') {
            const element = this.reviewContainer.nativeElement;
            element.style.maxWidth = environment.fixedWidth;
            element.style.position = 'relative';
            element.style.margin = 'auto';
        }
    }
}
