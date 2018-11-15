import { ChangeDetectionStrategy, Component,
        EventEmitter, Input, Output, OnInit} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Post } from '../../models/post.model';
import { Bookmark } from '../../models/bookmark.model';

import { AuthService } from '../../services';
import { BookmarkService } from '../../services/bookmark.service';

import { environment } from '../../../environments/environment';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'dso-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedCardComponent implements OnInit {

  isViewMore: boolean;

  postSafeContent: SafeHtml;

  @Input() post: Post;
  @Input() no: number;

  @Output() addBookmark = new EventEmitter<Bookmark>();
  @Output() removeBookmark = new EventEmitter<string>();

  constructor(
    private bookmarkService: BookmarkService,
    private sharingService: SharingService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private router: Router) {
    this.isViewMore = false;
  }

  ngOnInit() {
    this.fetchAuthorInfo();
  }

  onAddBookmark() {
    const userEmail = this.authService.getUserInfo().user_name;

    this.addBookmark.emit(<Bookmark>{
      email: userEmail,
      title: this.post.title,
      postId: this.post.id.toString(),
      categoryId: this.post.categoryId.toString(),
      contentTypeId: this.post.contentTypeId,
      url: 'http://www.dsodentist.com',
      status: '1'
    });

    setTimeout(() => {
      this.post.isBookmark = this.sharingService.isBookmark;
    }, 500);
  }

  onRemoveBookmark() {
    const userEmail = this.authService.getUserInfo().user_name;

    if (!this.post.bookmarkId) {
      const subBookmark = this.bookmarkService.getAllByEmail(userEmail).subscribe(b => {
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

    setTimeout(() => {
      this.post.isBookmark = this.sharingService.isBookmark;
    }, 500);
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

  onCheckCategoryType(contentTypeId, catId: string) {
    return contentTypeId === catId ? true : false;
  }

  onViewMore(e) {
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
    let sponsorId;
    if (type === 'gsk') {
      sponsorId = environment.SPONSOR_GSK;
    } else if (type === 'align') {
      sponsorId = environment.SPONSOR_ALIGN;
    } else if (type === 'nobel') {
      sponsorId = environment.SPONSOR_NOBEL;
    }
    this.router.navigate([`/posts/sponsor/${sponsorId}`]);
  }

  // fetch an author/speaker's name
  fetchAuthorInfo() {
    const excerpt = this.post.excerpt.replace(/(<p[^>]*>\(.*?\).*?<\/p>)/gs, '');

    let updatedContent = `<div class="first-big">${excerpt}</div>`;

    if (this.post.authorName) {
      const authorTag = `<p style="margin: 0px"><span style="color:#616161;font-size:15px;font-weight:700;
                        line-height:35px">${this.post.authorName}</span></p>`;

      updatedContent = authorTag + updatedContent;
    } else {
      updatedContent = updatedContent.replace('<p class="first-big">', '<p class="first-big" style="margin-top:16px">');
    }

    this.postSafeContent = this.sanitizer.bypassSecurityTrustHtml(updatedContent);
  }

  // check gsk tag
  isGsk(sponsorId): boolean {
    if (sponsorId === environment.SPONSOR_GSK) {
    return true;
    }
    return false;
  }

  // check align tag
  isAlign(sponsorId): boolean {
      if (sponsorId === environment.SPONSOR_ALIGN) {
      return true;
      }
      return false;
  }

  // check nobel tag
  isNobel(sponsorId): boolean {
      if (sponsorId === environment.SPONSOR_NOBEL) {
      return true;
      }
      return false;
  }
}
