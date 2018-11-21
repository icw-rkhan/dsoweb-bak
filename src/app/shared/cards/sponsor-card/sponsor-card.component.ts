import { ChangeDetectionStrategy, Component,
        EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from '../../../models/post.model';
import { Bookmark } from '../../../models/bookmark.model';

import { AuthService } from '../../../services';
import { BookmarkService } from '../../../services/bookmark.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'dso-sponsor-card',
  templateUrl: './sponsor-card.component.html',
  styleUrls: ['./sponsor-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SponsorCardComponent {

  userEmail: string;

  @Input() post: Post;

  @Output() addBookmark = new EventEmitter<Bookmark>();
  @Output() removeBookmark = new EventEmitter<string>();

  constructor(
    private bookmarkService: BookmarkService,
    private authService: AuthService,
    private router: Router) {
  }

  onAddBookmark() {
    this.post.isBookmark = true;

    this.userEmail = this.authService.getUserInfo().user_name;

    this.addBookmark.emit(<Bookmark>{
      email: this.userEmail,
      title: this.post.title,
      postId: this.post.id.toString(),
      categoryId: this.post.categoryId.toString(),
      contentTypeId: this.post.contentTypeId,
      url: 'http://www.dsodentist.com',
    });
  }

  onRemoveBookmark() {
    this.post.isBookmark = false;

    if (!this.post.bookmarkId) {
      const subBookmark = this.bookmarkService.getAllByEmail(this.userEmail).subscribe(b => {
        b.map(item => {
          if (item.postId === this.post.id) {
            this.removeBookmark.emit(item.id);
          }
        });

        subBookmark.unsubscribe();
      });
    } else {
      this.removeBookmark.emit(this.post.bookmarkId);
    }
  }

  onCheckCategoryType(contentTypeId, catId: string) {
    return contentTypeId === catId ? true : false;
  }

  onViewDetail() {
    if (this.post.sponsorId === environment.SPONSOR_ALIGN ||
        this.post.sponsorId === environment.SPONSOR_GSK ||
        this.post.sponsorId === environment.SPONSOR_NOBEL) {
      this.router.navigate([`/detail/sponsor/${this.post.id}`]);
    } else {
      this.router.navigate([`/detail/${this.post.id}`]);
    }
  }
}
