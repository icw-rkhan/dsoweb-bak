import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';

import { AuthService, ProfileService } from '../../services/index';
import { Residency } from '../../models/residency.model';

import {NgForm} from '@angular/forms';

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
  residencyIndex: number;

  constructor(private authService: AuthService,
              private profileService: ProfileService) {
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
    this.profileService.findOneByEmail({email: email}).subscribe(
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
    this.editResidencyModel.hide();
    this.userProfile.profileResidency.push({
      residency_school: {
        id: e.id
      },
      end_time: e.year + '-01-01T00:00:00.000Z',
      start_time: null
    });
    this.residency = null;
  }

  selectResidency() {
    this.residency_page = this.RESIDENCY_AT;
  }

  cancelResidency() {
    this.residency = null;
    this.editResidencyModel.hide();
  }

  updateResidency(e: Residency) {
    this.residency = null;
    this.userProfile.profileResidency[this.residencyIndex] = {
      residency_school: {
        id: e.id
      },
      end_time: e.year + '-01-01T00:00:00.000Z',
      start_time: null
    };
    this.editResidencyModel.hide();
  }

  editResidency(i) {
    this.residencyIndex = i;
    this.residency = null;
    for (let j = 0; j < this.metadata.residency.length; j++) {
      if (parseInt(this.metadata.residency[j].id) == this.userProfile.profileResidency[i].residency_school.id) {
        const dt = {
          id: this.metadata.residency[j].id,
          name: this.metadata.residency[j].name,
          year: this.userProfile.profileResidency[i].end_time.split('-')[0];
        };
        this.residency = new Residency().deserialize(dt);
        break;
      }
    }
    this.editResidencyModel.show();
    this.residency_page = this.RESIDENCY_EDIT;
  }

  deleteResidency() {
    if (this.residencyIndex >= 0) {
      if (this.userProfile.profileResidency[this.residencyIndex]) {
        (<any[]>this.userProfile.profileResidency).splice(this.residencyIndex, 1);
      }
    }
    this.editResidencyModel.hide();
    this.residencyIndex = -1;
  }

  onSave(form: NgForm) {
    if (form.valid) {
      this.profileService.saveProfile(this.userProfile).subscribe(profile => {
          console.log(profile);
        },
        error => {
          console.log(error);
        });
    }
  }
}
