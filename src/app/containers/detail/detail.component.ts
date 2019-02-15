import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'dso-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {

    @ViewChild('contentContainer') contentContainer: ElementRef;

    constructor(private sharingService: SharingService) {}

    ngOnInit() {
        const device = this.sharingService.getMyDevice();

        if (device === 'desktop') {
            const element = this.contentContainer.nativeElement;
            element.style.maxWidth = environment.fixedWidth;
            element.style.position = 'relative';
            element.style.margin = 'auto';
        }
    }
}
