import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dso-unite-thumbnail',
  templateUrl: './unite-thumbnail.component.html',
  styleUrls: ['./unite-thumbnail.component.scss']
})
export class UniteThumbnailComponent implements OnInit {

  articles: any[] = [];

  constructor() {
    const article = {
      id: '1',
      date: 'June/July 2018',
      details: 'Vol 2 Issue 5',
      thumbnail: 'assets/images/unite/unite-avatar.png',
      categoryName: 'A Balancing Act',
      title: 'Your Professional Career and Personal Life',
      authorName: 'by Steven Michaels',
      excerpt: '"Achieving a work-life balance is entirely within your reach through the DSOsupported..."'
    };

    this.articles.push(article);
    this.articles.push(article);
    this.articles.push(article);
    this.articles.push(article);
    this.articles.push(article);
   }

  ngOnInit() {
  }

}
