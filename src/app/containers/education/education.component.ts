import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @ViewChild('educationContainer') educationContainer: ElementRef;

  constructor(private sharingService: SharingService) { }

  ngOnInit() {
    const device = this.sharingService.getMyDevice();

    if (device === 'desktop') {
      const element = this.educationContainer.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
      element.style.position = 'relative';
      element.style.margin = 'auto';
    }
  }

}
