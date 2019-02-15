import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  @ViewChild('authContainer') authContainer: ElementRef;

  constructor(private sharingService: SharingService) { }

  ngOnInit() {
    const device = this.sharingService.getMyDevice();

    if (device === 'desktop') {
      const element = this.authContainer.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
      element.style.position = 'relative';
      element.style.margin = 'auto';
    }
  }

}
