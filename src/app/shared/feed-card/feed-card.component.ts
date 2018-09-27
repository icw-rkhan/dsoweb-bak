import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { Bookmark } from '../../models/bookmark.model';
import { AuthService } from '../../services';

@Component({
  selector: 'dso-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedCardComponent {
  public isViewMore: boolean;
  @Input() post: Post;

  @Output() addBookmark = new EventEmitter<Bookmark>();
  @Output() removeBookmark = new EventEmitter<string>();

  constructor(private authService: AuthService, private router: Router) {
    this.isViewMore = false;
  }

  onAddBookmark() {
    this.post.bookmarked = true;
    const email = this.authService.getUserInfo().user_name;
    this.addBookmark.emit(<Bookmark>{
      email: email,
      title: this.post.title,
      postId: this.post.id.toString(),
      url: 'http://www.dsodentist.com',
    });
  }

  onRemoveBookmark() {
    this.post.bookmarked = false;
    this.removeBookmark.emit(this.post.bookmarkId);
  }

  onViewDetail() {
    if (this.post.tags.includes(197) || this.post.tags.includes(260) || this.post.tags.includes(259)) {
      this.router.navigate([`/detail/sponsor/${this.post.id}`]);
    } else {
      this.router.navigate([`/detail/${this.post.id}`]);
    }
  }

  onCheckSponsorType(tags, sponsorId: number) {
    return tags.includes(sponsorId);
  }

  onViewMore(e) {
    console.log(e);
    this.isViewMore = !this.isViewMore;

    if (this.isViewMore) {
      e.target.innerText = 'Less';
    } else {
      e.target.innerText = '... More';
    }
    e.stopPropagation();
  }
  // post sponsor article by postId
  onPostSponsor(type) {
    let sponsorId: number;
    if (type === 'gsk') {
      sponsorId = 197;
    } else if (type === 'align') {
      sponsorId = 260;
    } else if (type === 'nobel') {
      sponsorId = 259;
    }
    this.router.navigate([`/posts/sponsor/${sponsorId}`]);
  }
  // check gsk tag
  isGsk(tags): boolean {
    if (tags && tags.includes(197)) {
      return true;
    }
    return false;
  }
  // check align tag
  isAlign(tags): boolean {
    console.log(tags);
    if (tags && tags.includes(260)) {
      return true;
    }
    return false;
  }
  // check nobel tag
  isNobel(tags): boolean {
    if (tags && tags.includes(259)) {
      return true;
    }
    return false;
  }
}
