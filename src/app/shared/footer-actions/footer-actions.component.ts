import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavLinkModel } from '../../models/nav-link.model';

@Component({
  selector: 'dso-footer-actions',
  templateUrl: './footer-actions.component.html',
  styleUrls: ['./footer-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterActionsComponent implements OnInit {

  navFooterLinks: NavLinkModel[] = [];

  ngOnInit(): void {
    // Footer links
    this.navFooterLinks.push({
      label: 'For You',
      route: '/feed/tip-sheets',
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
    this.navFooterLinks.push({
      label: 'Download',
      route: '/feed/tip-sheets',
      icon: 'cloud_download'
    });
  }

}
