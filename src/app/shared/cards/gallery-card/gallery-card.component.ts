import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryCardComponent implements OnInit {

  contentUrl: string;
  isLandscape: boolean;

  @Input() index: number;
  @Input() count: number;
  @Input() gallery: any;

  @ViewChild('card') card: ElementRef;

  constructor(
    private cdr: ChangeDetectorRef,
    private sharingService: SharingService,
    private breakpointObserver: BreakpointObserver) {
    this.contentUrl = environment.cmsAPIUrl;
  }

  ngOnInit() {
    const device = this.sharingService.getMyDevice();
    const element = this.card.nativeElement;
    if (device === 'desktop') {
      element.style.width = environment.fixedWidth;
    } else {
      this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isLandscape = false;
        } else {
          this.isLandscape = true;
        }

        this.cdr.markForCheck();
      });
    }
  }

  returnID() {
    if (this.count) {
      return this.gallery.original ? this.gallery.original : this.gallery.thumbnail;
    } else {
      return this.gallery.originalID ? this.gallery.originalID : this.gallery.thumbnailID;
    }
  }
}
