import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter,
        ChangeDetectorRef, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { NavLinkModel } from '../../models/nav-link.model';
import { NavLinksService } from '../../services/links.service';
import { Subscription } from 'rxjs';
import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-career-actions',
  templateUrl: './career-actions.component.html',
  styleUrls: ['./career-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerActionsComponent implements OnInit, OnDestroy {

  flag: boolean;
  showNavBar = false;

  links: NavLinkModel[];

  @Output() moreEvent = new EventEmitter<number>();

  subRoute: Subscription;

  @ViewChild('actionsContainer') actionsContainer: ElementRef;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private linkService: NavLinksService,
    private sharingService: SharingService) {
    this.flag = false;

    this.links = this.linkService.careerActionLinks;

    this.subRoute = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;

        this.clear();

        this.links.map(link => {
          if (link.route === url) {
            link.state = 'active';

            this.cdr.markForCheck();
          }
        });
      }
    });
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScrollEvent, true);

    const device = this.sharingService.getMyDevice();

    if (device === 'desktop') {
      const element = this.actionsContainer.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
      element.style.margin = 'auto';
    }
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();

    window.removeEventListener('scroll', this.onScrollEvent, true);
  }

  onScrollEvent = (): void => {
    if (this.links[4].state === 'active') {
      this.onGoTo(4);
    }
  }

  onGoTo(i: number) {
    this.clear();
    this.links[i].state = 'active';

    if (this.links[i].route !== '#more') {
      this.flag = false;

      this.moreEvent.emit(0);

      this.router.navigate([this.links[i].route]);
    } else {
      this.flag = !this.flag;
      if (this.flag) {
        this.links[i].state = 'active';
      } else {
        this.links[i].state = 'inactive';
      }

      this.moreEvent.emit(1);
    }
  }

  onSwipeUp(event) {
    this.showNavBar = true;
  }

  onSwipeDown(event) {
    this.showNavBar = false;
  }

  clear() {
    this.links.map(link => {
      link.state = 'inactive';
    });
  }
}
