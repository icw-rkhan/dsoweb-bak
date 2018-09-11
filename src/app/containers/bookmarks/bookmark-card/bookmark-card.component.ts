import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dso-bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookmarkCardComponent implements OnInit {

  ngOnInit(): void {
  }

}
