import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter,
        ChangeDetectorRef, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { NavLinkModel } from '../../models/nav-link.model';
import { NavLinksService } from '../../services/links.service';
import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-education-actions',
  templateUrl: './education-actions.component.html',
  styleUrls: ['./education-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationActionsComponent implements OnInit, OnDestroy, AfterViewInit {

  flag: boolean;
  showNavBar = false;

  links: NavLinkModel[];

  subRoute: Subscription;

  @ViewChild('actionsContainer') actionsContainer: ElementRef;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private linkService: NavLinksService,
    private sharingService: SharingService) {
    this.flag = false;

    this.links = this.linkService.educationActionLinks;

    this.subRoute = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;

        this.clear();

        this.links.map(link => {
          if (url.includes(link.route)) {
            link.state = 'active';
          }
        });

        this.cdr.markForCheck();
      }
    });
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScrollEvent, true);
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();

    window.removeEventListener('scroll', this.onScrollEvent, true);
  }

  ngAfterViewInit() {
    const device = this.sharingService.getMyDevice();

    if (device === 'desktop') {
      const element = this.actionsContainer.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
    }
  }

  onScrollEvent = (): void => {
    if (this.links[4].state === 'active') {
      this.onGoTo(4);
    }
  }

  onGoTo(i: number) {
    this.clear();
    this.links[i].state = 'active';

    this.flag = false;

    this.router.navigate([this.links[i].route]);
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
