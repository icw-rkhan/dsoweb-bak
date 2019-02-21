import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild, 
        ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-education-container',
  templateUrl: './education-container.component.html',
  styleUrls: ['./education-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationContainerComponent implements OnInit, OnDestroy {

  showActionBar: boolean;

  subRoute: Subscription;

  @ViewChild('educationContainer') educationContainer: ElementRef;

  constructor(
    private router: Router,
    private sharingService: SharingService) {
      this.showActionBar = true;

      this.subRoute = this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          const url = event.url;
        }
      });
  }

  ngOnInit() {
    const device = this.sharingService.getMyDevice();

    if (device === 'desktop') {
      const element = this.educationContainer.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
      element.style.position = 'relative';
      element.style.margin = 'auto';
    }
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }
}
