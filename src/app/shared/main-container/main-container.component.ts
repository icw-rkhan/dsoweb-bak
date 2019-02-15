import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent implements OnInit, OnDestroy {

  @Input() displayMainActions: boolean;

  subRoute: Subscription;

  @ViewChild('contentContainer') contentContainer: ElementRef;

  constructor(private router: Router, private sharingService: SharingService) {
    this.subRoute = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/unite') || event.url.includes('/setting')) {
          this.displayMainActions = false;
        } else {
          this.displayMainActions = true;
        }
      }
    });
  }

  ngOnInit() {
    const device = this.sharingService.getMyDevice();

    if (device === 'desktop') {
      const element = this.contentContainer.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
      element.style.position = 'relative';
      element.style.margin = 'auto';
    }
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }
}
