import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Bookmark } from '../../../models/bookmark.model';

@Component({
  selector: 'dso-bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkCardComponent {

  @Input() bookmark: Bookmark;
  @Output() remove = new EventEmitter<Bookmark>();

  onRemove() {
    this.remove.emit(this.bookmark);
  }

}
