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

  onRemove() {
    this.remove.emit(this.post);
  }
  // post a bookmark by url
  onPostBookmark(postId, sponsorId) {
    if (sponsorId === environment.SPONSOR_GSK ||
        sponsorId === environment.SPONSOR_ALIGN ||
        sponsorId === environment.SPONSOR_NOBEL) {
      this.router.navigate([`/detail/sponsor/${postId}`]);
    } else {
      this.router.navigate([`/detail/${postId}`]);
    }
  }

}
