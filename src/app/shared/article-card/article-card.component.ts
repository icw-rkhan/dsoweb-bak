import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onUniteDetail(id: string) {
    this.router.navigate([`/unite/detail/${id}`]);
  }

}
