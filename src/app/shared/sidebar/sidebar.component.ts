import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { NavLinkModel } from '../../models/nav-link.model';

import { AuthService, ProfileService } from '../../services';
import { NavLinksService } from '../../services/links.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'dso-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() toggleMenu = new EventEmitter();
  userName: string;
  userspecialtyName: string;
  userPhoto: string;
  baseUrl: String;

  links: NavLinkModel[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private navLinksService: NavLinksService) {

    this.getUserInfo();
    this.baseUrl = environment.profileApiUrl;
    this.links = this.navLinksService.getNavLinks();
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
        this.userspecialtyName = res.specialty ? res.specialty.name : '';
        this.userPhoto = res.photo_url;
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
