import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dso-reviews-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  userInfo = {
    url: 'assets/images/Screen_Header_pic.png',
    name: 'Matt Heafy',
    rate: 4,
    date: '3 jul, 2017',
    review: 'A wonderful experience reading up on the new trends of dental heath.'
  }  

  constructor() { }

  ngOnInit() 
  {
  }
}
