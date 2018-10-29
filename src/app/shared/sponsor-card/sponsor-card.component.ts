import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { Bookmark } from '../../models/bookmark.model';
import { AuthService } from '../../services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'dso-sponsor-card',
  templateUrl: './sponsor-card.component.html',
  styleUrls: ['./sponsor-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SponsorCardComponent {

  @Input() post: Post;

  @Output() addBookmark = new EventEmitter<Bookmark>();
  @Output() removeBookmark = new EventEmitter<string>();

  constructor(private authService: AuthService, private router: Router) {
  }

  onAddBookmark() {
    this.post.isBookmark = true;
    const email = this.authService.getUserInfo().user_name;
    this.addBookmark.emit(<Bookmark>{
      email: email,
      title: this.post.title,
      postId: this.post.id.toString(),
      url: 'http://www.dsodentist.com',
    });
  }

  onRemoveBookmark() {
    this.post.isBookmark = false;
    this.removeBookmark.emit(this.post.bookmarkId);
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
