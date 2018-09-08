import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavLinkModel } from '../../models/nav-link.model';

@Component({
  selector: 'dso-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  links: NavLinkModel[] = [];

  constructor(private router: Router) {
    this.links.push({
      label: 'General Content',
      icon: 'folder_open',
      route: ''
    });
    this.links.push({
      label: 'Education',
      icon: 'account_balance',
      route: ''
    });
    this.links.push({
      label: 'Careers',
      icon: 'notifications_active',
      route: ''
    });
    this.links.push({
      label: 'Events',
      icon: 'calendar_today',
      route: ''
    });
    this.links.push({
      label: 'Unite',
      icon: 'bookmarks',
      route: ''
    });
    this.links.push({
      label: 'My Profile',
      icon: 'account_box',
      route: ''
    });
    this.links.push({
      label: 'Settings',
      icon: 'settings_applications',
      route: ''
    });
  }

}
