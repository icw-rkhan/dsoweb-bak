import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './interviews-page.html',
  styleUrls: ['./interviews-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewsPageComponent implements OnInit {

  ngOnInit(): void {
  }

}
