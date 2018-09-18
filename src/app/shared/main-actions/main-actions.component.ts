import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavLinkModel } from '../../models/nav-link.model';

@Component({
  selector: 'dso-main-actions',
  templateUrl: './main-actions.component.html',
  styleUrls: ['./main-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainActionsComponent implements OnInit {

  navFooterLinks: NavLinkModel[] = [];

  ngOnInit(): void {
    // Footer links
    this.navFooterLinks.push({
      label: 'For You',
      route: '/feed/latest',
      icon: 'receipt'
    });
    this.navFooterLinks.push({
      label: 'Search',
      route: '/search',
      icon: 'search'
    });
    this.navFooterLinks.push({
      label: 'Category',
      route: '/category',
      icon: 'view_list'
    });
    this.navFooterLinks.push({
      label: 'Bookmarks',
      route: '/bookmarks',
      icon: 'bookmarks'
    });
  }

}
