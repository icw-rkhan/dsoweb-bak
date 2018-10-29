import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { Bookmark } from '../../models/bookmark.model';
import { AuthService } from '../../services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'dso-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedCardComponent {
  public isViewMore: boolean;
  @Input() post: Post;
  @Input() no: number;

  @Output() addBookmark = new EventEmitter<Bookmark>();
  @Output() removeBookmark = new EventEmitter<string>();

  constructor(private authService: AuthService, private router: Router) {
    this.isViewMore = false;
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

  onCheckCategoryType(categories, catId: number) {
    return categories.filter(category => category.id === catId).length > 0;
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
    const parentTag = document.getElementById(`contents${this.no}`);
    const tag = parentTag.getElementsByTagName('p');

    if (tag && tag.length > 0) {
      let authorTag;
      if (tag[0].innerHTML.includes('(')) {
        authorTag = tag[0].innerHTML;
      } else {
        return;
      }

      if (authorTag.includes('strong')) {
        authorTag = authorTag.replace('<strong>', '');
        authorTag = authorTag.replace('</strong>', '');
      }

      const authorArr = authorTag.split('<br>');
      let authorName = authorArr.length > 0 ? authorArr[0] : null;

      if (authorName.includes('(') && authorName.includes(')')) {
        if (authorName.includes('By')) {
          authorName = authorName.replace('By', '');
        }

        authorName = authorName.replace('(', '');
        authorName = authorName.replace(')', '');

        this.removeAuthorInfo();

        if (tag.length > 1) {
          tag[0].innerHTML = `<span style="color:#616161;font-size:15px;font-weight:700;line-height:35px">${authorName}</span>`;
          tag[1].classList.add('first-big');
        }
      }
    }
  }

  // remove author's info
  removeAuthorInfo() {
    const parentTag = document.getElementById(`contents${this.no}`);
    const tag = parentTag.getElementsByTagName('p');

    if (tag && tag.length > 0) {
      if (tag[0].innerHTML.includes('(') && tag.length > 1) {

        tag[0].innerHTML = '';
        tag[0].style.margin = '0';
      }
    }
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
