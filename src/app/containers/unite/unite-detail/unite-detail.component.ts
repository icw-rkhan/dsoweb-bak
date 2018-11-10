import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dso-unite-detail',
  templateUrl: './unite-detail.component.html',
  styleUrls: ['./unite-detail.component.scss']
})
export class UniteDetailComponent implements OnInit {

  post: any;

  constructor() {
    this.post = {
      thumbnail: 'assets/images/unite/unite-avatar.png',
      category: 'A Balancing Act',
      title: 'Your Professional Career and Personal Life',
      authorName: 'by Steven Michaels',
      excerpt: '"Achieving a work-life balance is entirely within your reach through the DSOsupported practice."',
      content: 'Many dentists, particularly in private parctice, have adapted to a 10- to 12- hour work day...'
    };
  }

  ngOnInit() {

  }

}
