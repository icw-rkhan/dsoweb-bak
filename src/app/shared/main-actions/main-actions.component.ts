import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavLinkModel } from '../../models/nav-link.model';
import { Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'dso-main-actions',
  templateUrl: './main-actions.component.html',
  styleUrls: ['./main-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainActionsComponent implements OnInit {

  navFooterLinks: NavLinkModel[] = [];

  private currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = router.url;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });

    // Footer links
    this.navFooterLinks.push({
      id: 0,
      label: 'For You',
      route: '/posts/latest',
      icon: 'receipt'
    });
    this.navFooterLinks.push({
      id: 1,
      label: 'Search',
      route: '/search',
      icon: 'search'
    });
    this.navFooterLinks.push({
      id: 2,
      label: 'Category',
      route: '/category',
      icon: 'view_list'
    });
    this.navFooterLinks.push({
      id: 3,
      label: 'Bookmarks',
      route: '/bookmarks',
      icon: 'bookmarks'
    });
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

}
