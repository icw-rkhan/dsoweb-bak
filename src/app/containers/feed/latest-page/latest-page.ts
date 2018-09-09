import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './latest-page.html',
  styleUrls: ['./latest-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestPageComponent implements OnInit {

  ngOnInit(): void {
  }

}
