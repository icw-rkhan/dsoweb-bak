import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './tech-guides-page.html',
  styleUrls: ['./tech-guides-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechGuidesPageComponent implements OnInit {

  ngOnInit(): void {
  }

}
