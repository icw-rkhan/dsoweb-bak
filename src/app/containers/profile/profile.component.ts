import { Component, OnInit } from '@angular/core';
import { formatNumber, parseNumber } from 'libphonenumber-js';
import * as moment from 'moment';

import { AuthService, ProfileService } from '../../services/index';
import {AlertService} from '../../services/alert.service';
import {SharingService} from '../../services/sharing.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'dso-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  resumeType: string;
  is_student: number;
  userInfo: any;
  userProfile: any;
  baseUrl: String;
  certificate: string;
  resumeFile: any;
  isResumePreview: boolean;
  resumePreviewUrl: string;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private sharingService: SharingService,
    private alertService: AlertService
  ) {
    // this.certificate = 'Certificate, Advanced Periodontology';
    this.certificate = '';
    this.userInfo = this.authService.getUserInfo();
    this.sharingService.showLoading(true);
    this.baseUrl = environment.profileApiUrl;
    this.isResumePreview = false;
    this.resumePreviewUrl = '';
  }

  ngOnInit() {
    this.is_student = +localStorage.getItem('is_student');
    this.fetchProfile(this.userInfo.user_name);
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

  fetchProfile(email: string) {
    this.profileService.findOneByEmail({ email: email }).subscribe(
      (data: any) => {
        this.sharingService.showLoading(false);
        this.userProfile = data.resultMap.data;
        if (this.userProfile && this.userProfile.phone) {
          this.userProfile.phone = formatNumber({country: 'US', phone: this.userProfile.phone}, 'National');
        }
        this.parseData();
        if (this.userProfile.document_library) {
          this.resumeFile = {};
          this.resumeFile.name = this.userProfile.document_library.document_name || '';
          this.userProfile.document_library = null;
        }
      },
      err => {
        this.sharingService.showLoading(false);
      }
    );
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
    let blob: any;
    this.sharingService.showLoading(true);
    const fileType = this.resumeFile.name.split('.').pop();
    this.profileService.getResume(this.userProfile.resume_url).subscribe((res: any) => {
      this.sharingService.showLoading(false);

      this.resumeType = fileType.toString().toUpperCase();
      if (this.resumeType === 'PDF') {
        blob = new Blob([res], {type: 'application/pdf'});
      } else if (this.resumeType === 'DOC') {
        blob = new Blob([res], {type: 'application/msword'});
      } else if (this.resumeType === 'DOCX') {
        blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
      }

      this.resumePreviewUrl = window.URL.createObjectURL(blob);
      this.isResumePreview = true;
    });
  }

  parseData() {
    ['educations', 'experiences', 'profileResidency'].map((key: any) => {
      this.userProfile[key].map((item: any) => {
        item.start_time = moment(item.start_time).format();
        const endTime = moment(item.end_time).format().toString();
        const currentDate = new Date();
        if (key === 'experiences' && endTime.includes(currentDate.getFullYear().toString()) &&
         endTime.includes((currentDate.getMonth() + 1).toString())) {
          item.end_time = null;
        } else {
          item.end_time = moment(item.end_time).format();
        }
      });
    });
  }
}
