import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './videos-page.html',
  styleUrls: ['./videos-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideosPageComponent implements OnInit {

  ngOnInit(): void {
  }

}
