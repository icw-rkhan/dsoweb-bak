import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavLinkModel } from '../../models/nav-link.model';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Params } from '@angular/router/src/shared';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './feed-page.html',
  styleUrls: ['./feed-page.scss'],
})
export class FeedPageComponent implements OnInit, OnDestroy {

  url: string;
  headerImageUrl: string;
  navLinks: NavLinkModel[] = [];

  private currentUrl: string;
  private routerSubs: Subscription;
  private paramsSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.currentUrl = router.url;

    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        if (event.url.includes('/posts/sponsor')) {
          const sponsorId = event.url.split('/')[3];
          if (sponsorId === '197') {
            this.headerImageUrl = 'assets/images/sponsor/gsk-header.png';
          } else if (sponsorId === '259') {
            this.headerImageUrl = 'assets/images/sponsor/nobel-header.png';
          } else if (sponsorId === '260') {
            this.headerImageUrl = 'assets/images/sponsor/align-header.png';
          }
        } else if (event.url.includes('/posts')) {
          this.headerImageUrl = 'assets/images/header-pic.png';
        }
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });

    // Check when it is a sponsor page
    const children = this.route.children[0];
    const childrenSubs = children.params.subscribe((p: Params) => {
      this.navLinks = this.renderTabs(p['sponsorId']);
      if (childrenSubs) {
        childrenSubs.unsubscribe();
      }
    });

    this.routerSubs = this.router.events.subscribe((event: Event) => {
      const innerChildren = this.route.children[0];
      if (event instanceof NavigationEnd) {
        const innerChildrenSubs = innerChildren.params.subscribe((p: Params) => {
          this.navLinks = this.renderTabs(p['sponsorId']);
          if (innerChildrenSubs) {
            innerChildrenSubs.unsubscribe();
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubs.unsubscribe();
  }

  isActive(link: NavLinkModel) {
    return this.currentUrl === link.route;
  }

  private renderTabs(sponsorId: number) {
    const navLinks: NavLinkModel[] = [];
    console.log(`sponsorId: ${sponsorId}`);
    if (sponsorId) {
      navLinks.push({
        label: 'LATEST',
        route: `/posts/sponsor/${sponsorId}`,
      });
      navLinks.push({
        label: 'VIDEOS',
        route: `/posts/sponsor/${sponsorId}/29`,
      });
      navLinks.push({
        label: 'ARTICLES',
        route: `/posts/sponsor/${sponsorId}/28`,
      });
      navLinks.push({
        label: 'PODCASTS',
        route: `/posts/sponsor/${sponsorId}/30`,
      });
      navLinks.push({
        label: 'TECH GUIDES',
        route: `/posts/sponsor/${sponsorId}/31`,
      });
      navLinks.push({
        label: 'ANIMATIONS',
        route: `/posts/sponsor/${sponsorId}/195`,
      });
      navLinks.push({
        label: 'INTERVIEWS',
        route: `/posts/sponsor/${sponsorId}/194`,
      });
      navLinks.push({
        label: 'TIP SHEETS',
        route: `/posts/sponsor/${sponsorId}/196`,
      });
    } else {
      navLinks.push({
        label: 'LATEST',
        route: '/posts/type',
      });
      navLinks.push({
        label: 'VIDEOS',
        route: '/posts/type/29',
      });
      navLinks.push({
        label: 'ARTICLES',
        route: '/posts/type/28',
      });
      navLinks.push({
        label: 'PODCASTS',
        route: '/posts/type/30',
      });
      navLinks.push({
        label: 'TECH GUIDES',
        route: '/posts/type/31',
      });
      navLinks.push({
        label: 'ANIMATIONS',
        route: '/posts/type/195',
      });
      navLinks.push({
        label: 'INTERVIEWS',
        route: '/posts/type/194',
      });
      navLinks.push({
        label: 'TIP SHEETS',
        route: '/posts/type/196',
      });
    }
    return navLinks;
  }

}
