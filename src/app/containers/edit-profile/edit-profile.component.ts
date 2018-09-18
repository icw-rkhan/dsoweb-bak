import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';

import { AuthService, ProfileService } from '../../services/index';
import { Residency } from '../../models/residency.model';

@Component({
  selector: 'dso-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {
  @ViewChild('editResidencyModel') private editResidencyModel: ModalDirective;
  is_student: number;
  userInfo: any;
  userProfile: any;
  metadata: any;
  isEdit: boolean;
  isEditSpeciality: boolean;
  isEditExperience: boolean;

  RESIDENCY_AT = 1;
  RESIDENCY_ADD = 2;
  RESIDENCY_EDIT = 3;
  residency_page = 2;
  residency: Residency;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    this.isEdit = true;
    this.isEditSpeciality = false;
    this.isEditExperience = false;
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
    this.isEditSpeciality = !this.isEditSpeciality;
  }

  setSpeciality(item: any) {
    this.userProfile.residency_id = item.id;
    this.userProfile.speciality = item.name;
    this.selectSpeciality();
  }

  selectedResidency(e: Residency) {
    this.residency = e;
    this.residency_page = this.RESIDENCY_ADD;
  }

  addResidency(e: Residency) {
    this.residency = e;
    this.residency_page = this.RESIDENCY_EDIT;
  }

  selectResidency() {
    this.residency_page = this.RESIDENCY_AT;
  }

  cancelResidency() {
    this.residency = null;
    this.editResidencyModel.hide();
  }

  updateResidency(e: Residency) {
    console.log(e);
    this.residency = e;
    this.editResidencyModel.hide();
  }
}
