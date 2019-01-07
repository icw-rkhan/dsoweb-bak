import { Injectable } from '@angular/core';

import { NavLinkModel } from '../models/nav-link.model';

@Injectable({
    providedIn: 'root'
  })
export class NavLinksService {
  links: NavLinkModel[] = [];
  careerActionLinks: NavLinkModel[] = [];
  uniteMainLinks: NavLinkModel[] = [];
  uniteMoreLinks: NavLinkModel[] = [];

  constructor() {
    this.makeGeneralLinks();
    this.makeUniteMainLinks();
    this.makeCareerActionLinks();
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
      label: 'Career',
      icon: 'careers',
      route: '/career',
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
      label: 'Go to Bookmarks',
      icon: 'assets/images/unite/arrow-right.png',
      route: '/unite/bookmark',
      state: 'active'
    });
  }

  makeUniteFeaturesLinks() {
    this.uniteMoreLinks.push({
      label: 'Search',
      icon: 'assets/images/unite/search.png',
      route: '/unite/search',
      state: 'active'
    });

    this.uniteMoreLinks.push({
      label: 'Thumbnails',
      icon: 'assets/images/unite/thumbnail.png',
      route: '/unite/thumbnail',
      state: 'active'
    });

    this.uniteMoreLinks.push({
      label: 'Fullscreen',
      icon: 'assets/images/unite/full-screen.png',
      route: '/unite/view',
      state: 'active'
    });

    this.uniteMoreLinks.push({
      label: 'Go to Bookmarks',
      icon: 'assets/images/unite/arrow-right.png',
      route: '/unite/bookmark',
      state: 'active'
    });
  }

  makeCareerActionLinks() {
    this.careerActionLinks.push({
      label: 'Explore',
      icon: 'explore',
      route: '/career',
      state: 'active'
    });
    this.careerActionLinks.push({
      label: 'Find Job',
      icon: 'find',
      route: '/career/search',
      state: 'inactive'
    });
    this.careerActionLinks.push({
      label: 'My Jobs',
      icon: 'my-jobs',
      route: '/career/my-job',
      state: 'inactive'
    });
    this.careerActionLinks.push({
      label: 'Alerts',
      icon: 'bottom_alert',
      route: '/career/alert',
      state: 'inactive'
    });
    this.careerActionLinks.push({
      label: 'More',
      icon: 'more',
      route: '#more',
      state: 'inactive'
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
