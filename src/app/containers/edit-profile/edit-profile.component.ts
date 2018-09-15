import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AuthService, ProfileService } from '../../services/index';

@Component({
  selector: 'dso-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {

  is_student: number;
  userInfo: any;
  userProfile: any;
  metadata: any;
  isEdit: boolean;
  isSpeciality: boolean;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    this.isEdit = true;
    this.isSpeciality = false;
    this.metadata = {
      dentalSchool: [],
      residency: [],
      practiceRole: [],
      practiceType: []
    };
    this.userInfo = this.authService.getUserInfo();
  }

  ngOnInit() {
    this.is_student = +localStorage.getItem('is_student');
    this.getMetaData();
    this.fetchProfile(this.userInfo.user_name);
  }

  getMetaData() {
    this.profileService.getMetaData().subscribe(
      (data: any) => {
        console.log(data);
        if (data[0]) {
          this.metadata.residency = data[0].resultMap.data;
        }
        if (data[1]) {
          this.metadata.dentalSchool = data[1].resultMap.data;
        }
        if (data[2]) {
          this.metadata.practiceRole = data[2].resultMap.data;
        }
        if (data[3]) {
          this.metadata.practiceType = data[3].resultMap.data;
        }
      }
    );
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

  selectSpeciality() {
    this.isEdit = !this.isEdit;
    this.isSpeciality = !this.isSpeciality;
  }

  setSpeciality(item: any) {
    this.userProfile.residency_id = item.id;
    this.userProfile.speciality = item.name;
    this.selectSpeciality();
  }
}
