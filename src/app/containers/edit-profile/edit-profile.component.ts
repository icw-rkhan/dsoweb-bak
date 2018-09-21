import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import * as moment from 'moment';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {AuthService, ProfileService} from '../../services/index';
import {Residency} from '../../models/residency.model';

import {NgForm} from '@angular/forms';
import {SharingService} from '../../services/sharing.service';
import {AlertService} from '../../services/alert.service';
import {Speciality} from '../../models/speciality.model';
import {EditProfileService} from './edit-profile.service';

@Component({
  selector: 'dso-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [EditProfileService],
  animations: [
    trigger('slideUpDown', [
      state('up', style({bottom: 0})),
      state('down', style({bottom: '-110px'})),
      transition(':enter', [
        style({bottom: '-110px'}),
        animate(300)
      ]),
      transition('up => down', animate('300ms')),
      transition('down => up', animate('300ms')),
    ])
  ]
})
export class EditProfileComponent implements OnInit {
  @ViewChild('editResidencyModel') private editResidencyModel: ModalDirective;
  @ViewChild('SpecialityModal') private specialityModal: ModalDirective;
  is_student: number;
  userInfo: any;
  userProfile: any;
  metadata: any;
  isEditSpeciality: boolean;
  isEditExperience: boolean;
  isUploadResume: boolean;
  isUploadResumeSlide: boolean;

  RESIDENCY_AT = 1;
  RESIDENCY_ADD = 2;
  RESIDENCY_EDIT = 3;
  residency_page = 2;
  education_page = 3;
  residency: Residency;
  residencyIndex: number;

  filteredSpeciality: any;
  speciality: Speciality;

  experiences: any;

  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private sharingService: SharingService,
              private alertService: AlertService,
              private editProfileService: EditProfileService) {
    this.sharingService.showLoading̣̣(true);
    this.isEditSpeciality = false;
    this.isEditExperience = false;
    this.isUploadResume = false;
    this.isUploadResumeSlide = false;

    this.metadata = {
      dentalSchool: [],
      residency: [],
      practiceRole: [],
      practiceType: [],
      practiceDSO: []
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
          this.filteredSpeciality = this.metadata.residency;
        }
        if (data[1]) {
          this.metadata.dentalSchool = data[1].resultMap.data;
        }
        if (data[2]) {
          this.metadata.practiceRole = data[2].resultMap.data;
          this.editProfileService.S_practiceRoles.next(data[2].resultMap.data);
        }
        if (data[3]) {
          this.metadata.practiceType = data[3].resultMap.data;
          this.editProfileService.S_practiceTypes.next(data[3].resultMap.data);
        }
        if (data[4]) {
          this.metadata.practiceType = data[4].resultMap.data;
          this.editProfileService.S_practiceDSO.next(data[4].resultMap.data);
        }
      }
    );
  }

  fetchProfile(email: string) {
    this.profileService.findOneByEmail({email: email}).subscribe(
      (data: any) => {
        this.sharingService.showLoading̣̣(false);
        this.userProfile = data.resultMap.data;
        this.userProfile.educations.push({});
        this.experiences = this.userProfile.experiences;
        this.userProfile['is_student'] = this.is_student;
        this.parseData();
      }
    );
  }

  parseData() {
    ['educations', 'experiences'].map((key: any) => {
      this.userProfile[key].map((item: any) => {
        item.start_time = moment(item.start_time).format('MMMM YYYY');
        item.end_date = moment(item.start_time).isBefore(moment())
          ? moment(item.end_time).format('MMMM YYYY')
          : 'Present';
      });
    });

    this.userProfile['profileResidency'].map((item: any) => {
      item.start_time = moment(item.start_time).format();
      item.end_time = moment(item.end_time).format();
    });
  }

  setSpeciality(speciality: any) {
    this.speciality = speciality;
    if (this.userProfile.educations.length !== 0) {
      this.userProfile.educations[0].major = speciality.name;
    }
    this.closeSpecialityModal();
  }

  closeSpecialityModal() {
    this.specialityModal.hide();
    this.isEditSpeciality = false;
  }

  editExperience(ex) {
    this.experiences = ex;
    this.userProfile.experiences = ex;
  }

  selectedResidency(e: Residency) {
    this.residency = e;
    this.residency_page = this.RESIDENCY_ADD;
  }

  addResidency(e: Residency) {
    this.editResidencyModel.hide();
    this.userProfile.profileResidency.push({
      residency_school: {
        id: e.id,
        name: e.name
      },
      end_time: e.year + '-01-01T00:00:00.000Z',
      start_time: (e.year - 1) + '-01-01T00:00:00.000Z'
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
        id: e.id,
        name: e.name
      },
      end_time: e.year + '-01-01T00:00:00.000Z',
      start_time: (e.year - 1) + '-01-01T00:00:00.000Z'
    };
    this.editResidencyModel.hide();
  }

  editResidency(i) {
    console.log(this.userProfile.profileResidency);
    this.residencyIndex = i;
    this.residency = null;
    const dt = {
      id: this.userProfile.profileResidency[i].residency_school.id,
      name: this.userProfile.profileResidency[i].residency_school.name,
      year: this.userProfile.profileResidency[i].end_time.split('-')[0]
    };
    this.residency = new Residency().deserialize(dt);
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
      this.sharingService.showLoading̣̣(true);

      (this.userProfile.is_linkedin !== 1) ? this.userProfile.is_linkedin = 0 : this.userProfile.is_linkedin = 1;

      this.profileService.saveProfile(this.userProfile).subscribe((data: any) => {
        if (!data.code) {
          this.alertService.alertInfo('Success', 'Saved successfully');
        } else {
          this.alertService.alertInfo('Error', data.msg);
        }
        this.sharingService.showLoading̣̣(false);
      },
        error2 => {
          this.alertService.alertInfo('Error', 'Something went wrong');
          this.sharingService.showLoading̣̣(false);
        });
    }
  }

  closeUploadResume(e) {
    if (e.target.className.includes('modal-overlay upload-file')) {
      this.isUploadResumeSlide = false;
      setTimeout(() => {
        this.isUploadResume = false;
      }, 400);
    }
  }
}
