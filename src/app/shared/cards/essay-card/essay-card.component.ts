import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-essay-card',
  templateUrl: './essay-card.component.html',
  styleUrls: ['./essay-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EssayCardComponent implements OnInit {

  contentUrl: string;

  @Input() essay: any;

  @ViewChild('card') card: ElementRef;

  constructor(
    private sharingService: SharingService,
    private breakpointObserver: BreakpointObserver) {
    this.contentUrl = environment.cmsAPIUrl;
  }

  ngOnInit() {
    const device = this.sharingService.getMyDevice();
    const element = this.card.nativeElement;
    if (device === 'desktop') {
      element.style.width = parseInt(environment.fixedWidth, 10) - 210 + 'px';
      element.style.height = '375px';
    }

    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.card.nativeElement.style.height = '200px';
        } else {
          this.card.nativeElement.style.height = '100vh';
        }
      });
  }

  returnID() {
    return this.essay.originalID ? this.essay.originalID : this.essay.thumbnailID;
  }
}
