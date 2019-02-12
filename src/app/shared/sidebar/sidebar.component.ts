import { Component, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { NavLinkModel } from '../../models/nav-link.model';

import { AuthService, ProfileService } from '../../services';
import { NavLinksService } from '../../services/links.service';

import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dso-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnDestroy {
  @Output() toggleMenu = new EventEmitter();

  userName: string;
  userLocation: string;
  userPhoto: string;
  baseUrl: String;

  links: NavLinkModel[] = [];

  subRoute: Subscription;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private profileService: ProfileService,
    private navLinksService: NavLinksService) {
      this.links = this.navLinksService.getNavLinks();

      this.subRoute = this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {

          this.links.map(link => {
            if (link.label !== 'Logout') {
              link.state = 'inactive';
              if (event.url.includes(link.route)) {
                link.state = 'active';
              }
            }
          });
        }
      });

      this.getUserInfo();
      this.baseUrl = environment.profileApiUrl;
  }

  ngOnDestroy() {
    this.subRoute.unsubscribe();
  }

  onClick(link: NavLinkModel) {
    this.navLinksService.initNavLinks();
    this.navLinksService.setNavLink(link);

    this.links = this.navLinksService.getNavLinks();

    this.toggleMenu.emit();
    if (link.label === 'Logout') {
      this.authService.logOut();
      this.router.navigate(['/']);
    } else {
      if (link.route !== '#') {
        this.router.navigate([link.route]);
      }
    }
  }

  getUserInfo() {
    const email = this.authService.getUserInfo().user_name;

    const profileSub = this.profileService.findOneByEmail({ email: email }).subscribe(
      (data: any) => {
        const res = data.resultMap.data;
        this.userName = res.full_name;
        if (res.practiceAddress && res.practiceAddress.city && res.practiceAddress.states) {
          this.userLocation = res.practiceAddress.city + ', ' + res.practiceAddress.states;
        }
        this.userPhoto = res.photo_url;

        this.cdr.markForCheck();
        profileSub.unsubscribe();
      },
      err => {
        profileSub.unsubscribe();
      });
  }

  getIcons(index) {
    return `url(assets/images/hamburger/${this.links[index].icon}_${this.links[index].state}.png)`;
  }
}
