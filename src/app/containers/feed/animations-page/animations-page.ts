import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './animations-page.html',
  styleUrls: ['./animations-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimationsPageComponent implements OnInit {

  ngOnInit(): void {
  }

}
