import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { formatNumber, parseNumber } from 'libphonenumber-js';

import { AuthService, ProfileService } from '../../services/index';
import { Residency } from '../../models/residency.model';
import { Education } from '../../models/education.model';
import { Address } from '../../models/address.model';

import {NgForm} from '@angular/forms';
import {SharingService} from '../../services/sharing.service';
import {AlertService} from '../../services/alert.service';
import { environment } from '../../../environments/environment';
import {Specialty} from '../../models/speciality.model';
import {EditProfileService} from './edit-profile.service';
import {isNullOrUndefined} from 'util';

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
  isResumeUploading: boolean;
  isResumePreview: boolean;
  resumePreviewUrl: string;
  resumeFile: any;
  certificate: string;
  croppedImageFile: any;
  fileName: string;
  imageChangedEvent: any;
  croppedImage: any;

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
  constructor(private router: Router,
              private authService: AuthService,
              private profileService: ProfileService,
              private sharingService: SharingService,
              private alertService: AlertService,
              private editProfileService: EditProfileService) {
    this.sharingService.showLoading(true);
    this.isEditSpeciality = false;
    this.isEditExperience = false;
    this.isPracticeAddress = false;
    this.isUploadFile = false;
    this.isUploadFileSlide = false;
    this.isResumeUploading = false;
    this.isResumePreview = false;
    this.resumePreviewUrl = '';
    // this.certificate = 'Certificate, Advanced Periodontology';
    this.certificate = '';
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

  getMetaData() {
    const specialty = this.userProfile.specialty ? this.userProfile.specialty.id || null : null;
    const subProfile = this.profileService.getMetaData(specialty).subscribe(
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

        subProfile.unsubscribe();
      }
    );
  }

  fetchProfile(email: string) {
    const subService = this.profileService.findOneByEmail({email: email}).subscribe(
      (data: any) => {
        this.sharingService.showLoading(false);
        this.userProfile = data.resultMap.data;
        if (this.userProfile && this.userProfile.phone) {
          this.userProfile.phone = formatNumber({country: 'US', phone: this.userProfile.phone}, 'National');
        }
        this.editProfileService.S_practiceAddress = JSON.parse(JSON.stringify(this.userProfile.practiceAddress));
        this.userProfile.educations = this.userProfile.educations || [];
        this.getMetaData();
        this.speciality = this.userProfile.specialty ? this.userProfile.specialty : {};
        this.userProfile['is_student'] = this.is_student;
        this.parseData();
        if (this.userProfile.document_library) {
          this.resumeFile = {};
          this.resumeFile.name = this.userProfile.document_library.document_name || '';
          this.userProfile.document_library = null;
        }

        subService.unsubscribe();
      },
      err => {
        this.sharingService.showLoading(false);
        subService.unsubscribe();
      }
    );
  }

  parseData() {
    ['experiences'].map((key: any) => {
      this.userProfile[key].map((item: any) => {
        item.start_time = moment(item.start_time).format();
        const endTime = moment(item.end_time).format().toString();
        const currentDate = new Date();
        if (endTime.includes(currentDate.getFullYear().toString()) &&
         endTime.includes((currentDate.getMonth() + 1).toString())) {
          item.end_time = null;
        } else {
          item.end_time = moment(item.end_time).format();
        }
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

  setPracticeAddress(address: Address) {
    this.userProfile.practiceAddress = address;
  }

  getPracticeAddress() {
    const address = this.userProfile.practiceAddress || {};
    const address1 = address.address1 || '';
    const address2 = address.address2 || '';
    const zipCode = address.zipCode || '';
    const city = address.city || '';
    const states = address.states || '';
    return `${address1} ${address2} ${zipCode}, ${city}, ${states}`;
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

  deleteExperience(ex) {
    if (this.editProfileService.S_editIndex >= 0) {
      if (this.userProfile.experiences[this.editProfileService.S_editIndex]) {
        (<any[]>this.userProfile.experiences).splice(this.editProfileService.S_editIndex, 1);
      }
    }
    this.editProfileService.S_editIndex = -1;
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
      year: moment(this.userProfile.profileResidency[i].end_time).utcOffset(0).year()
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
      this.sharingService.showLoading(true);

      (this.userProfile.is_linkedin !== 1) ? this.userProfile.is_linkedin = 0 : this.userProfile.is_linkedin = 1;

      if (this.userProfile.phone) {
        this.userProfile.phone = parseNumber(`Phone: ${this.userProfile.phone}`, 'US') ?
        parseNumber(`Phone: ${this.userProfile.phone}`, 'US').phone : '';
      }

      ['experiences'].map((key: any) => {
        this.userProfile[key].map((item: any) => {
          if (item.end_time == null) {
            item.end_time = new Date();
          }
        });
      });

      this.profileService.saveProfile(this.userProfile).subscribe((data: any) => {
        if (!data.code) {
          this.fetchProfile(this.userInfo.user_name);
          this.alertService.successAlert('Saved successfully').then((result) => {
            this.router.navigate(['/profile']);
          });
        } else {
          this.alertService.errorAlert(data.msg);
        }
        this.sharingService.showLoading(false);
      },
      error2 => {
        this.alertService.errorAlert('Something went wrong');
        this.sharingService.showLoading(false);
      });
    }
  }

  onChange(e) {
  }

  closeUploadResume(e) {
    if (e.target.className.includes('modal-overlay upload-file')) {
      this.isUploadFileSlide = false;
      setTimeout(() => {
        this.isUploadFile = false;
      }, 400);
    }
  }

  // upload file
  selectFile(file) {
    if (this.typeFile === this.RESUME_FILE) {
      this.isResumeUploading = true;
      this.isUploadFile = false;
      this.resumeFile = file.target.files[0];
      this.resumeFile.progress = 0;
      this.profileService.uploadResume(file.srcElement.files[0]).subscribe(event => {
        if (event['type'] === HttpEventType.UploadProgress) {
          this.resumeFile.progress = Math.round(100 * event['loaded'] / event['total']);
        } else if (event instanceof HttpResponse) {
          this.isResumeUploading = false;
          const res = event.body;
          if (res['code'] === 0) {
            this.userProfile.document_library = {
              document_name: res['resultMap']['resumeName']
            };
            this.alertService.successAlert('Uploaded successfully');
          } else {
            this.alertService.errorAlert('Upload Failed');
          }
        }
      }, (err) => {
        this.isResumeUploading = false;
        this.alertService.errorAlert('Upload Failed');
      });
    } else {
      this.sharingService.showLoading(true);
      this.isUploadFile = true;
      this.sharingService.showLoading(false);

      const size = file.srcElement.files[0].size / 1024 / 1024;
      console.log(size);

      this.imageChangedEvent = file;
      if (file.srcElement && file.srcElement.files[0]) {
        this.fileName = file.srcElement.files[0].name;
      }
    }
  }

  removeResumeFile() {
    this.alertService.confirmAlert('Are you sure?', 'Do you really want to remove resume?')
      .then((res: any) => {
        if (res.value) {
          this.profileService.deleteDocumentLibraryByEmail(this.userInfo.user_name).subscribe((response: any) => {
            if (response['code'] === 0) {
              this.resumeFile = null;
              this.userProfile.document_library = null;
              this.alertService.successAlert('Resume delete successfully');
            } else {
              this.alertService.errorAlert('Delete failed');
            }
          });
        }
      });
  }

  previewResume() {
    this.sharingService.showLoading(true);
    const fileType = this.resumeFile.name.split('.').pop();
    this.profileService.getResume(this.userProfile.resume_url).subscribe((res: any) => {
      this.sharingService.showLoading(false);
      if (fileType && fileType.toString().toUpperCase() === 'PDF') {
        const blob = new Blob([res], {type: 'application/pdf'}),
            url = window.URL.createObjectURL(blob);
        this.resumePreviewUrl = url;
        this.isResumePreview = true;
      } else {
        const blob = new Blob([res], {type: 'octet/stream'}),
            url = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = this.resumeFile.name;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    },
    err => {
      this.sharingService.showLoading(false);
    });
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  imageCroppedFile(file: any) {
    const f = new File([file], this.fileName);

    // upload avatar
    this.profileService.uploadAvatar(f).subscribe((res) => {
      if (res['code'] === 0) {
        this.userProfile.photo_album = {
          photo_name: res['resultMap']['photoName']
        };
      }
    });
  }

  imageLoaded() {
      // show cropper
  }

  loadImageFailed() {
      // show message
  }

  // finish to edit
  finishToEdit(e) {
    this.isUploadFile = false;
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
      name: this.userProfile.educations[i].types === '1' &&
       this.userProfile.educations[i]['dental_school'] ? this.userProfile.educations[i]['dental_school']['name'] :
       this.userProfile.educations[i].school_name,
      year: moment(this.userProfile.educations[i].end_time).utcOffset(0).year(),
      types: this.userProfile.educations[i].types
    };
    this.education = new Education().deserialize(dt);
    this.education_page = this.RESIDENCY_EDIT;
    this.typeEducation = this.EDIT;
    this.educationModel.show();
  }

  onDeleteEducation() {
    if (this.typeEducation === this.EDIT && this.educationIndex > -1) {
      if (this.userProfile.educations[this.educationIndex]) {
        (<any[]>this.userProfile.educations).splice(this.educationIndex, 1);
        this.education = null;
      }
    }
    this.educationModel.hide();
  }

  onCancelEducation() {
    this.education = null;
    this.educationModel.hide();
  }

  saveEducation(e: Education) {
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
