import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../../../services';
import { NgProgress } from '@ngx-progressbar/core';
import { SettingService } from '../../../services/setting.service';

@Component({
  selector: 'dso-setting-contact',
  templateUrl: './setting-contact.component.html',
  styleUrls: ['./setting-contact.component.scss']
})
export class SettingContactComponent implements OnInit {

  email: string;
  content: string;
  fileName: string;
  attachedFile: File;
  isUploadFileSlide: boolean;

  constructor(
    private location: Location,
    private progress: NgProgress,
    private authService: AuthService,
    private settingService: SettingService) {
      this.isUploadFileSlide = false;
      this.email = this.authService.getUserInfo().user_name;
  }

  ngOnInit() {
  }

  // upload file
  selectFile(file) {
    this.attachedFile = file.srcElement.files[0];
    this.fileName = this.attachedFile.name;

    const fr = new FileReader();
    fr.onload = function() {
      let element: any;
      element = document.getElementById('attachedFile');
      element.src = fr.result;
    };

    fr.readAsDataURL(this.attachedFile);

    this.isUploadFileSlide = true;
  }

  onContact() {
    this.progress.start();

    let originalId: string;
    this.settingService.uploadFile(this.attachedFile).subscribe(res => {
      if (res.code === 0) {
        originalId = res.resultMap.originalFigureId;

        const body = {
          feedbackContent: this.content,
          contactEmail: this.email,
          attachments: originalId
        };

        const subContact = this.settingService.contact(body).subscribe(res2 => {
          this.progress.complete();

          this.clear();
          subContact.unsubscribe();
        },
        err => {
          this.progress.complete();
        });
      }
    },
    err => {
      this.progress.complete();
    });
  }

  onBack() {
    this.location.back();
  }

  clear() {
    this.content = '';
    this.attachedFile = null;
  }
}
