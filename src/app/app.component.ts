import { Component } from '@angular/core';
import {SharingService} from './services/sharing.service';

@Component({
  selector: 'dso-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading = true;

  constructor(public sharingService: SharingService) {
    this.sharingService.isLoading.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
