import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'dso-reviews-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

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
    
  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit() 
  {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape
    ]).subscribe(result=> {
      if(result.matches) {
        document.getElementById('contents').style.height = "36.5vh";
      }else {
        document.getElementById('contents').style.height = "calc(100vh - 422px)";
      }
    })    
  }

  activateHandsetLayout() {
    
  }
}
