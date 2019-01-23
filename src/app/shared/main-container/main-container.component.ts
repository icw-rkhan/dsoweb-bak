import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'dso-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {

  @Input() displayMainActions: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/unite') || event.url.includes('/setting')) {
          this.displayMainActions = false;
        } else {
          this.displayMainActions = true;
        }
      }
    });
  }
}
