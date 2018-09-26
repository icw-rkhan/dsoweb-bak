import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AuthService, ProfileService } from '../../services/index';
import {SharingService} from '../../services/sharing.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'dso-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  is_student: number;
  userInfo: any;
  userProfile: any;
  baseUrl: String;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private sharingService: SharingService
  ) {
    this.userInfo = this.authService.getUserInfo();
    this.sharingService.showLoading̣̣(true);
    this.baseUrl = environment.profileApiUrl;
  }

  ngOnInit() {
    this.is_student = +localStorage.getItem('is_student');
    this.fetchProfile(this.userInfo.user_name);
  }

  fetchProfile(email: string) {
    this.profileService.findOneByEmail({ email: email }).subscribe(
      (data: any) => {
        this.sharingService.showLoading̣̣(false);
        this.userProfile = data.resultMap.data;
        this.parseData();
      }
    );
  }

  parseData() {
    ['educations', 'experiences', 'profileResidency'].map((key: any) => {
      this.userProfile[key].map((item: any) => {
        item.start_time = moment(item.start_time).format();
        item.end_date = moment(item.end_time).format();
      });
    });
  }
}
