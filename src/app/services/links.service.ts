import { Injectable } from '@angular/core';

import { NavLinkModel } from '../models/nav-link.model';

@Injectable({
    providedIn: 'root'
  })
export class NavLinksService {
  links: NavLinkModel[] = [];
  uniteMainLinks: NavLinkModel[] = [];
  uniteMoreLinks: NavLinkModel[] = [];

  constructor() {
    this.makeGeneralLinks();
    this.makeUniteMainLinks();
    this.makeUniteFeaturesLinks();
  }

  makeGeneralLinks() {
    this.links.push({
      label: 'Browse Content',
      icon: 'general',
      route: '/posts',
      state: 'active'
    });
    this.links.push({
      label: 'Education',
      icon: 'education',
      route: '#',
      state: 'inactive'
    });
    this.links.push({
      label: 'Careers',
      icon: 'careers',
      route: '#',
      state: 'inactive'
    });
    this.links.push({
      label: 'Events',
      icon: 'events',
      route: '#',
      state: 'inactive'
    });
    this.links.push({
      label: 'UNITE',
      icon: 'unite',
      route: '/unite',
      state: 'inactive'
    });
    this.links.push({
      label: 'My Profile',
      icon: 'profile',
      route: '/profile',
      state: 'inactive'
    });
    this.links.push({
      label: 'Logout',
      icon: 'logout',
      route: '',
      state: 'inactive'
    });
  }

  makeUniteMainLinks() {
    this.uniteMainLinks.push({
      label: 'All Issues',
      icon: 'assets/images/unite/arrow-right.png',
      route: '/unite/all',
      state: 'active'
    });

    this.uniteMainLinks.push({
      label: 'Downloaded',
      icon: 'assets/images/unite/arrow-right.png',
      route: '/unite/type/downloaded',
      state: 'active'
    });

    this.uniteMainLinks.push({
      label: 'Go to Bookmarks',
      icon: 'assets/images/unite/arrow-right.png',
      route: '/unite/bookmark',
      state: 'active'
    });
  }

  makeUniteFeaturesLinks() {
    this.uniteMoreLinks.push({
      label: 'Bookmark',
      icon: 'assets/images/unite/bookmark.png',
      route: '/unite/bookmark',
      state: 'active'
    });

    this.uniteMoreLinks.push({
      label: 'Search',
      icon: 'assets/images/unite/search.png',
      route: '/unite/search',
      state: 'active'
    });

    this.uniteMoreLinks.push({
      label: 'Share',
      icon: 'assets/images/unite/share.png',
      route: '/unite/bookmark',
      state: 'active'
    });

    this.uniteMoreLinks.push({
      label: 'Thumbnails',
      icon: 'assets/images/unite/thumbnail.png',
      route: '/unite/thumbnails',
      state: 'active'
    });

    this.uniteMoreLinks.push({
      label: 'Go to Bookmarks',
      icon: 'assets/images/unite/arrow-right.png',
      route: '/unite/bookmark',
      state: 'active'
    });
  }

  getNavLinks() {
    return this.links;
  }

  initNavLinks() {
    this.links.map(link => {
      link.state = 'inactive';
    });
  }

  setNavLink(link: NavLinkModel) {
    this.links.map(item => {
      if (item === link) {
        if (item.icon !== 'logout') {
          item.state = 'active';
        } else {
          this.links[0].state = 'active';
        }
      }
    });
  }
}
