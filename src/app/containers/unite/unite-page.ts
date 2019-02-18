import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'dso-unite-page',
    templateUrl: './unite-page.html',
    styleUrls: ['./unite-page.scss']
})
export class UnitePageComponent implements OnInit {
    @ViewChild('uniteContainer') uniteContainer: ElementRef;

    constructor(private sharingService: SharingService) { }

    ngOnInit() {
      const device = this.sharingService.getMyDevice();

      if (device === 'desktop') {
        const element = this.uniteContainer.nativeElement;
        element.style.maxWidth = environment.fixedWidth;
        element.style.position = 'relative';
        element.style.margin = 'auto';
      }
    }
}
