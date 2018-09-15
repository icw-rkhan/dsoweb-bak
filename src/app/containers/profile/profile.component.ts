import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

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
    ['educations', 'experiences', 'profileResidency'].map((key: any) => {
      this.userProfile[key].map((item: any) => {
        item.start_time = moment(item.start_time).format('MMMM YYYY');
        item.end_date = moment(item.start_time).isBefore(moment())
                        ? moment(item.end_time).format('MMMM YYYY')
                        : 'Present';
      });
    });
  }
}
