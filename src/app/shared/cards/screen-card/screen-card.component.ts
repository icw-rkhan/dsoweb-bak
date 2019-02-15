import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../../../models/post.model';
import { SharingService } from 'src/app/services/sharing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-screen-card',
  templateUrl: './screen-card.component.html',
  styleUrls: ['./screen-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScreenCardComponent implements OnInit {

  @Input() issueId: string;
  @Input() article: Post;

  isCover: boolean;
  isAD: boolean;

  @ViewChild('card') card: ElementRef;

  constructor(private router: Router, private sharingService: SharingService) {
    this.isAD = false;
    this.isCover = false;
  }

  ngOnInit() {
    const title = this.article.title;

    if (title === 'cover') {
      this.isCover = true;
    } else if (title.length > 2 && title.substr(0, 2) === 'AD') {
      this.isAD = true;
    } else {
      this.isAD = false;
    }

    const device = this.sharingService.getMyDevice();
    if (device === 'desktop') {
      const element = this.card.nativeElement;
      element.style.width = environment.fixedWidth;
      element.style.position = 'relative';
    }
  }

  isNullThumbnail(url: string) {
    if (url) {
      if (url.includes('objectId=null')) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  onDetailUnite(id: string) {
    if (id) {
      this.router.navigate([`/unite/detail/${this.issueId}/${id}`]);
    }
  }

}
