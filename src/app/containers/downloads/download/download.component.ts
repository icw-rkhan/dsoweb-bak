import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'dso-downloads-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit() 
  {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape
    ]).subscribe(result=> {
      if(result.matches) {
        document.getElementById('message').style.marginTop = "50px";
      }else {
        document.getElementById('message').style.marginTop = "124px";
      }
    })
  }
}
