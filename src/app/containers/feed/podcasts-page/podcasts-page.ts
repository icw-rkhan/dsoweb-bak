import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './podcasts-page.html',
  styleUrls: ['./podcasts-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PodcastsPageComponent implements OnInit {

  ngOnInit(): void {
  }

}
