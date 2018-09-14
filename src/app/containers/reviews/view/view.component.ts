import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'dso-reviews-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  stateList = [{state:'nonactive'},{state:'nonactive'},{state:'nonactive'},{state:'nonactive'},{state:'nonactive'}]

  userInfoList = [
    {
    url: 'assets/images/user-avatar.png',
    name: 'Matt Heafy',
    rate: 4,
    date: '3 jul, 2017',
    review: 'A wonderful experience reading up on the new trends of dental heath.'
    },
    {
      url: 'assets/images/user-avatar.png',
      name: 'Matt Heafy',
      rate: 4,
      date: '3 jul, 2017',
      review: 'A wonderful experience reading up on the new trends of dental heath.'
    },
  ]  

  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit() 
  {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape
    ]).subscribe(result=> {
      if(result.matches) {
      }
    })  
  }
}
