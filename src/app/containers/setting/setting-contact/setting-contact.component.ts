import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgProgress } from '@ngx-progressbar/core';
import { Location } from '@angular/common';

import { AuthService } from '../../../services';
import { SharingService } from 'src/app/services/sharing.service';
import { SettingService } from '../../../services/setting.service';

import { environment } from 'src/environments/environment';

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

  @ViewChild('contactContainer') contactContainer: ElementRef;

  constructor(
    private location: Location,
    private progress: NgProgress,
    private authService: AuthService,
    private sharingService: SharingService,
    private settingService: SettingService) {
      this.isUploadFileSlide = false;
      this.email = this.authService.getUserInfo().user_name;
  }

  ngOnInit() {
    const device = this.sharingService.getMyDevice();

    if (device === 'desktop') {
      const element = this.contactContainer.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
      element.style.position = 'relative';
      element.style.margin = 'auto';
    }
  }

  // upload a file
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
      if (res instanceof HttpResponse) {
        if (res.body['code'] === 0) {
          originalId = res.body['resultMap']['originalFigureId'];

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
    this.isUploadFileSlide = false;
  }
}
