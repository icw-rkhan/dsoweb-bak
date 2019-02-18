import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild, 
        ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-career-container',
  templateUrl: './career-container.component.html',
  styleUrls: ['./career-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerContainerComponent implements OnInit, OnDestroy {

  showActionBar: boolean;
  showMoreActionBar: boolean;

  subRoute: Subscription;

  @ViewChild('menuMask') menuMask: ElementRef;
  @ViewChild('careerContainer') careerContainer: ElementRef;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private sharingService: SharingService) {
      this.showActionBar = true;
      this.showMoreActionBar = false;

      this.subRoute = this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          const url = event.url;

          this.clear();

          if (url.includes('/career/detail') || url.includes('/career/dso-profile/detail') ||
            url.includes('/career/review/add') || url.includes('/career/alert/add')) {
            this.showActionBar = false;
          } else {
            this.showActionBar = true;
          }
        }
      });
  }

  ngOnInit() {
    const device = this.sharingService.getMyDevice();

    if (device === 'desktop') {
      const element = this.careerContainer.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
      element.style.position = 'relative';
      element.style.margin = 'auto';
    }
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }

  clear() {
    this.showMoreActionBar = false;
  }

  onShowMoreActionBar(flag: number) {
    if (flag === 1) {
      this.showMoreActionBar = !this.showMoreActionBar;
    } else {
      this.clear();
    }
  }

  onGoTo(url: string) {
    this.showMoreActionBar = false;

    if (url === 'me') {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate([`/career/${url}`]);
    }
  }
}
