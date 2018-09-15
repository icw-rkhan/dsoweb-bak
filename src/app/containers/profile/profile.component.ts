import { Component, OnInit } from '@angular/core';

import { AuthService, ProfileService } from '../../services/index';

@Component({
  selector: 'dso-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  is_student: number;
  userInfo: any;
  userProfile: any;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    this.userInfo = this.authService.getUserInfo();
  }

  ngOnInit() {
    this.is_student = +localStorage.getItem('is_student');
    this.fetchProfile(this.userInfo.user_name);
  }

  fetchProfile(email: string) {
    this.profileService.findOneByEmail({ email: email }).subscribe(
      (data: any) => {
        this.userProfile = data.resultMap.data;
        this.parseData();
      }
    );
  }

  parseData() {
    // console.log(this.userProfile);
    const start_time = 1536733013604;
    const end_time = 1544595413604;
    console.log(new Date(start_time));
    console.log(new Date(end_time));
  }
}
