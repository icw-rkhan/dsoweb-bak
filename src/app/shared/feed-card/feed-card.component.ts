import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { Bookmark } from '../../models/bookmark.model';

@Component({
  selector: 'dso-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedCardComponent {

  @Input() type: string;
  @Input() post: Post;
  @Output() bookmark = new EventEmitter<Bookmark>();

  onBookmark() {
    // TODO: fetch email belongs to the user
    this.bookmark.emit(<Bookmark>{
      email: 'h1078660929@163.com',
      title: this.post.title,
      url: `https://www.google.com`,
    });
  }
}
