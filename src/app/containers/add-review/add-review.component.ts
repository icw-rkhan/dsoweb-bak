import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {

  stateList = [{state:'nonactive'},{state:'nonactive'},{state:'nonactive'},{state:'nonactive'},{state:'nonactive'}]
  userInfo = {
    url: 'assets/images/Screen_Header_pic.png',
    name: 'Matt Murdock',
    rate: 4
  }

  articleInfo = {
    title: 'Preventing damage to tooth enamel',
    date: 'August 2018'
  }
    
  constructor() { }

  ngOnInit() 
  {
  }
}
