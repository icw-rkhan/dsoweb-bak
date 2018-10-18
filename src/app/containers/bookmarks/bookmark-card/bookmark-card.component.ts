import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../../models/post.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'dso-bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkCardComponent {

  @Input() post: Post;
  @Output() remove = new EventEmitter<Post>();

  constructor(private router: Router) {

  }

  // filter categories
  filterCategories(categories) {
    if (categories && categories.length > 1) {
      return categories[1].name;
    } else if (categories && categories.length === 1) {
      return categories[0].name;
    }

    return '';
  }

  onRemove() {
    this.remove.emit(this.post);
  }
  // post a bookmark by url
  onPostBookmark(postId, tags) {
    if (tags.includes(environment.SPONSOR_GSK) ||
        tags.includes(environment.SPONSOR_ALIGN) ||
        tags.includes(environment.SPONSOR_NOBEL)) {
      this.router.navigate([`/detail/sponsor/${postId}`]);
    } else {
      this.router.navigate([`/detail/${postId}`]);
    }
  }

}
