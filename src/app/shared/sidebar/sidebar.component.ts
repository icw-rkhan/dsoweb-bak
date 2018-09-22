import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavLinkModel } from '../../models/nav-link.model';
import { AuthService, ProfileService } from '../../services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'dso-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  userName: string;
  userPhoto: string;
  baseUrl: String;

  links: NavLinkModel[] = [];

  constructor(private router: Router, private authService: AuthService, private profileService: ProfileService) {
    this.getUserInfo();
    this.baseUrl = environment.profileApiUrl;
    this.links.push({
      label: 'General Content',
      icon: 'folder_open',
      route: '/posts'
    });
    this.links.push({
      label: 'Education',
      icon: 'account_balance',
      route: '#'
    });
    this.links.push({
      label: 'Careers',
      icon: 'notifications_active',
      route: '#'
    });
    this.links.push({
      label: 'Events',
      icon: 'calendar_today',
      route: '#'
    });
    this.links.push({
      label: 'Unite',
      icon: 'bookmarks',
      route: '#'
    });
    this.links.push({
      label: 'My Profile',
      icon: 'account_box',
      route: '/profile'
    });
    this.links.push({
      label: 'Logout',
      icon: 'exit_to_app',
      route: ''
    });
  }

  onClick(link: NavLinkModel) {
    console.log(link);
    if (link.label == 'Logout') {
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
        this.userPhoto = res.photo_url;

        console.log(data.resultMap.data);

        profileSub.unsubscribe();
      });
  }
}
