import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AuthService } from '../../../services';

@Component({
  selector: 'dso-setting-contact',
  templateUrl: './setting-contact.component.html',
  styleUrls: ['./setting-contact.component.scss']
})
export class SettingContactComponent implements OnInit {

  email: string;

  constructor(
    private location: Location,
    private authService: AuthService) {
    this.email = this.authService.getUserInfo().user_name;
  }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }
}
