import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Post } from '../../../models/post.model';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.article.title === 'cover') {
      this.isCover = true;
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
