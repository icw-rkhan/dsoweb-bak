import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './articles-page.html',
  styleUrls: ['./articles-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesPageComponent implements OnInit {

  ngOnInit(): void {
  }

}
