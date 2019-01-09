import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { NavLinkModel } from '../../models/nav-link.model';
import { NavLinksService } from '../../services/links.service';

@Component({
  selector: 'dso-career-actions',
  templateUrl: './career-actions.component.html',
  styleUrls: ['./career-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerActionsComponent implements OnInit {

  flag: boolean;
  showNavBar = false;

  links: NavLinkModel[];

  @Output() moreEvent = new EventEmitter<number>();

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private linkService: NavLinksService) {
    this.flag = false;

    this.links = this.linkService.careerActionLinks;

    this.router.events.subscribe((event: Event) => {
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

  ngOnInit() {}

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
