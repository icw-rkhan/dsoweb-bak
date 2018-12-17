import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

import { environment } from '../../../../environments/environment';
import { ProfileService, AuthService } from '../../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-career-oneself',
  templateUrl: './career-oneself.component.html',
  styleUrls: ['./career-oneself.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerOneselfComponent implements OnInit, OnDestroy {

  userName: string;
  userUrl: string;
  email: string;

  constructor(
    private router: Router,
    private progress: NgProgress,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private profileService: ProfileService) {
      this.userUrl = 'assets/images/career/user-avatar.png';
      this.email = this.authService.getUserInfo().user_name;
  }

  ngOnInit() {
    const request = {
      'email' : this.email
    };

    this.progress.start();
    this.profileService.findOneByEmail(request).subscribe(res => {
      this.progress.complete();

      this.userName = res.resultMap.data.full_name ? res.resultMap.data.full_name : '';

      if (res.resultMap.data.photo_url) {
        this.userUrl = `${environment.profileApiUrl}/photoDownload?${res.resultMap.data.photo_url}`;
      }

      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    this.progress.complete();
  }

  onGoToProfile() {
    this.router.navigate(['/profile']);
  }
}
