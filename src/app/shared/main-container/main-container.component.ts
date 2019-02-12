import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dso-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent implements OnDestroy {

  @Input() displayMainActions: boolean;

  subRoute: Subscription;

  constructor(private router: Router) {
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

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }
}
