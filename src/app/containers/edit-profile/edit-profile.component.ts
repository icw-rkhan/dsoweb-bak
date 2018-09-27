import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { formatNumber, ParsedNumber } from 'libphonenumber-js';

import { AuthService, ProfileService } from '../../services/index';
import { Residency } from '../../models/residency.model';
import { Education } from '../../models/education.model';

import {NgForm} from '@angular/forms';
import {SharingService} from '../../services/sharing.service';
import {AlertService} from '../../services/alert.service';
import { environment } from '../../../environments/environment';
import {Specialty} from '../../models/speciality.model';
import {EditProfileService} from './edit-profile.service';
import {isNullOrUndefined} from 'util';
import {json} from 'ngx-custom-validators/src/app/json/validator';

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
  @ViewChild('educationModel') private educationModel: ModalDirective;
  @ViewChild('AddressModal') private addressModal: ModalDirective;
  is_student: number;
  userInfo: any;
  userProfile: any;
  metadata: any;
  isEditSpeciality: boolean;
  isEditExperience: boolean;
  isPracticeAddress: boolean;
  isUploadFile: boolean;
  isUploadFileSlide: boolean;
  resumeFile: any;

  RESIDENCY_AT = 1;
  RESIDENCY_ADD = 2;
  RESIDENCY_EDIT = 3;
  residency_page = 2;
  education_page = 3;
  residency: Residency;
  residencyIndex: number;

  EDIT = 1;
  ADD = 2;
  typeEducation = 1;
  education: Education;
  educationIndex: number;

  RESUME_FILE = 1;
  PHOTO_FILE = 2;
  typeFile: number;
  filteredSpeciality: any;
  speciality: Specialty;

  baseUrl: String;
  constructor(private authService: AuthService,
              private profileService: ProfileService,
              private sharingService: SharingService,
              private alertService: AlertService,
              private editProfileService: EditProfileService) {
    this.sharingService.showLoading̣̣(true);
    this.isEditSpeciality = false;
    this.isEditExperience = false;
    this.isPracticeAddress = false;
    this.isUploadFile = false;
    this.isUploadFileSlide = false;
    this.baseUrl = environment.profileApiUrl;

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
    this.fetchProfile(this.userInfo.user_name);
  }

  onFormatNumber(value) {
    document.getElementById('phone').value = formatNumber({country: 'US', phone: `${value}`}, 'International');
  }

  getMetaData() {
    const specialty = this.userProfile.specialty ? this.userProfile.specialty.id || null : null;
    this.profileService.getMetaData(specialty).subscribe(
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
          this.metadata.practiceDSO = data[4].resultMap.data;
          this.editProfileService.S_practiceDSO.next(data[4].resultMap.data);
        }
        if (data[5]) {
          this.metadata.listResidency = data[5].resultMap.data;
        }
        // if (data[6]) {
        //   this.metadata.listResidency = data[5].resultMap.data;
        // }
      }
    );
  }

  fetchProfile(email: string) {
    this.profileService.findOneByEmail({email: email}).subscribe(
      (data: any) => {
        this.sharingService.showLoading̣̣(false);
        this.userProfile = data.resultMap.data;
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ display user profile ~~~~~~~~~~~~~~~~~~~~~~~~~~');
        console.log(this.userProfile);
        this.editProfileService.S_practiceAddress = JSON.parse(JSON.stringify(this.userProfile.practiceAddress));
        this.userProfile.educations = this.userProfile.educations || [];
        this.getMetaData();
        this.speciality = this.userProfile.specialty ? this.userProfile.specialty : {};
        this.userProfile['is_student'] = this.is_student;
        this.parseData();
      }
    );
  }

  parseData() {
    ['experiences'].map((key: any) => {
      this.userProfile[key].map((item: any) => {
        item.start_time = moment(item.start_time);
        item.end_time = moment(item.end_time);
      });
    });

    this.userProfile['educations'].map((item: any) => {
      item.start_time = moment(item.start_time).format();
      item.end_time = moment(item.end_time).format();
    });
    this.userProfile['profileResidency'].map((item: any) => {
      item.start_time = moment(item.start_time).format();
      item.end_time = moment(item.end_time).format();
    });
  }

  setPracticeAddress(address: any) {
    this.userProfile.practiceAddress = address;
    this.editProfileService.S_practiceAddress = address;
  }

  closeAddressModal() {
    this.editProfileService.S_practiceAddress = JSON.parse(JSON.stringify(this.userProfile.practiceAddress));
    this.isPracticeAddress = false;
    this.addressModal.hide();
  }

  setSpeciality(speciality: any) {
    this.speciality = speciality;
    this.userProfile.specialty = {id: this.speciality.id, name: this.speciality.name};
    this.closeSpecialityModal();
  }

  closeSpecialityModal() {
    this.specialityModal.hide();
    this.isEditSpeciality = false;
  }

  addExperience(ex) {
    this.userProfile.experiences.push(ex);
    this.editProfileService.S_experience = {};
    this.editProfileService.S_experienceEdit = undefined;
    this.isEditExperience = false;
  }

  editExperience(ex) {
    this.userProfile.experiences[this.editProfileService.S_editIndex] = ex;
    this.editProfileService.S_experience = {};
    this.editProfileService.S_experienceEdit = undefined;
    this.isEditExperience = false;
  }

  EditExperienceMode(item, index) {
    this.editProfileService.S_experienceEdit = item;
    this.editProfileService.S_editIndex = index;
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

      console.log('~~~~~~~~~~~~ save user-profile ~~~~~~~~~~~~~~~~~');
      console.log(this.userProfile);

      this.profileService.saveProfile(this.userProfile).subscribe((data: any) => {
        if (!data.code) {
          this.fetchProfile(this.userInfo.user_name);
          this.alertService.successAlert('Saved successfully');
        } else {
          this.alertService.errorAlert(data.msg);
        }
        this.sharingService.showLoading̣̣(false);
      },
        error2 => {
          this.alertService.errorAlert('Something went wrong');
          this.sharingService.showLoading̣̣(false);
        });
    }
  }

  onChange(e) {
    console.log(e);
  }

  closeUploadResume(e) {
    if (e.target.className.includes('modal-overlay upload-file')) {
      this.isUploadFileSlide = false;
      setTimeout(() => {
        this.isUploadFile = false;
      }, 400);
    }
  }

  selectFile(file) {
    this.sharingService.showLoading̣̣(true);
    if (this.typeFile == this.RESUME_FILE) {
      this.profileService.uploadResume(file.srcElement.files[0]).subscribe((res) => {
        this.sharingService.showLoading̣̣(false);
        this.isUploadFile = false;
        if (res['code'] == 0) {
          this.userProfile.document_library = {
            document_name: res['resultMap']['resumeName']
          };
          this.resumeFile = file.target.files[0];
          this.alertService.successAlert('Uploaded successfully');
        } else {
          this.alertService.errorAlert('Upload Failed');
        }
      }, (err) => {
        this.sharingService.showLoading̣̣(false);
        this.isUploadFile = false;
        this.alertService.errorAlert('Upload Failed');
      });
    } else {
      this.profileService.uploadAvatar(file.srcElement.files[0]).subscribe((res) => {
        this.sharingService.showLoading̣̣(false);
        this.isUploadFile = false;
        if (res['code'] == 0) {
          this.userProfile.photo_album = {
            photo_name: res['resultMap']['photoName']
          };
          this.alertService.successAlert('Uploaded successfully');
        } else {
          this.alertService.errorAlert('Upload Failed');
        }
      }, (err) => {
        this.sharingService.showLoading̣̣(false);
        this.isUploadFile = false;
        this.alertService.errorAlert('Upload Failed');
      });
    }
  }

  selectEducation() {
    this.education_page = this.RESIDENCY_AT;
  }

  selectedEducation(e: Education) {
    this.education = e;
    this.education_page = this.RESIDENCY_EDIT;
  }

  editEducation(i) {
    this.educationIndex = i;
    const dt = {
      id: this.userProfile.educations[i].types === 1 &&
        this.userProfile.educations[i]['dental_school'] ?
        this.userProfile.educations[i]['dental_school']['id'] : this.userProfile.educations[i].id,
      name: this.userProfile.educations[i].types === 1 &&
       this.userProfile.educations[i]['dental_school'] ? this.userProfile.educations[i]['dental_school']['name'] :
       this.userProfile.educations[i].school_name,
      year: this.userProfile.educations[i].end_time.split('-')[0],
      types: parseInt(this.userProfile.educations[i].types)
    };
    this.education = new Education().deserialize(dt);
    this.education_page = this.RESIDENCY_EDIT;
    this.typeEducation = this.EDIT;
    this.educationModel.show();
  }

  onDeleteEducation() {
    if (this.typeEducation == this.EDIT && this.educationIndex > -1) {
      if (this.userProfile.educations[this.educationIndex]) {
        (<any[]>this.userProfile.educations).splice(this.educationIndex, 1);
        this.education = null;
      }
    }
    this.educationModel.hide();
  }

  saveEducation(e: Education) {
    console.log(e);
    const educationInfo = {
      id: `${(this.userProfile.educations.length + 1)}`,
      email: this.userInfo.user_name,
      start_time: (e.year - 1) + '-01-01T00:00:00.000Z',
      end_time: e.year + '-01-01T00:00:00.000Z',
      major: isNullOrUndefined(this.speciality) ? '' : this.speciality.name,
      dental_school: {id: '1', name: ''},
      school_name: 'default',
      types: `${e.types}`
    };
    // check type of the education is dental school
    if (e.types === 1) {
      educationInfo.dental_school = {
        id: e.id.toString() || null,
        name: e.name || ''
      };
    } else {
      educationInfo.school_name = e.name;
    }

    if (this.typeEducation === this.ADD) {
      this.userProfile.educations.push(educationInfo);
      this.educationModel.hide();
    } else {
      educationInfo.id = `${e.id}`;
      this.userProfile.educations[this.educationIndex] = Object.assign(this.userProfile.educations[this.educationIndex], educationInfo);
      this.educationModel.hide();
    }
  }
}
