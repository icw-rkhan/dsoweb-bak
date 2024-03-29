import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NavLinkModel } from '../../models/nav-link.model';

import { SharingService } from 'src/app/services/sharing.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-main-actions',
  templateUrl: './main-actions.component.html',
  styleUrls: ['./main-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainActionsComponent implements OnInit, OnDestroy, AfterViewInit {

  navFooterLinks: NavLinkModel[] = [];

  private currentUrl: string;
  showNavBar = false;

  subRoute: Subscription;

  @ViewChild('actionsContainer') actionsContainer: ElementRef;

  constructor(private router: Router, private sharingService: SharingService) {
    this.currentUrl = router.url;
  }

  ngOnInit(): void {
    this.subRoute = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });

    // Footer links
    this.navFooterLinks.push({
      id: 0,
      label: 'For You',
      route: '/posts',
      icon: 'assets/images/feed/feed_inactive.png',
      iconActive: 'assets/images/feed/feed_active.png'
    });
    this.navFooterLinks.push({
      id: 1,
      label: 'Search',
      route: '/search',
      icon: 'assets/images/feed/search_inactive.png',
      iconActive: 'assets/images/feed/search_active.png'
    });
    this.navFooterLinks.push({
      id: 2,
      label: 'Category',
      route: '/category',
      icon: 'assets/images/feed/category_inactive.png',
      iconActive: 'assets/images/feed/category_active.png'
    });
    this.navFooterLinks.push({
      id: 3,
      label: 'Bookmarks',
      route: '/bookmarks',
      icon: 'assets/images/feed/bookmark_inactive.png',
      iconActive: 'assets/images/feed/bookmark_active.png'
    });
  }

  ngAfterViewInit() {
    const device = this.sharingService.getMyDevice();

    if (device === 'desktop') {
      const element = this.actionsContainer.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
    }
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }

  isActive(link: NavLinkModel) {
    if (0 === link.id) {
      return this.currentUrl === '/posts/latest' || this.currentUrl.startsWith('/posts/type');
    } else if (1 === link.id) {
      return this.currentUrl === '/search';
    } else if (2 === link.id) {
      return this.currentUrl === '/category';
    } else if (3 === link.id) {
      return this.currentUrl === '/bookmarks';
    }
    return false;
  }

  onSwipeUp(event) {
    this.showNavBar = true;
  }

  onSwipeDown(event) {
    this.showNavBar = false;
  }

}
