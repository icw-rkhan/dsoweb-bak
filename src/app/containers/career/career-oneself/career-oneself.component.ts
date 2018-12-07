import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dso-career-oneself',
  templateUrl: './career-oneself.component.html',
  styleUrls: ['./career-oneself.component.scss']
})
export class CareerOneselfComponent implements OnInit {

  user: any;

  constructor() {
    this.user = {
      name: 'Dr. Stephen Woods'
    };
  }

  ngOnInit() {
  }

}
