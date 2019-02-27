import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef } from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryCardComponent implements OnInit {

  @Input() galleryUrl: string;

  @ViewChild('card') card: ElementRef;

  constructor(private sharingService: SharingService) {
  }

  ngOnInit() {
    const device = this.sharingService.getMyDevice();
    if (device === 'desktop') {
      const element = this.card.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
      element.style.position = 'relative';
    }
  }
}
